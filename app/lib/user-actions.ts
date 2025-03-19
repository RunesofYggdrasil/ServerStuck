"use server";

import prisma from "@/prisma/prisma";
import { Session, User } from "./prisma-definitions";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import fetchAPI from "../api/fetch";

export function sessionGenerateToken(): string {
  const sessionBytes = new Uint8Array(20);
  crypto.getRandomValues(sessionBytes);
  const sessionToken = encodeBase32LowerCaseNoPadding(sessionBytes);
  return sessionToken;
}

export async function sessionCreate(
  sessionToken: string,
  sessionUserID: number
): Promise<Session> {
  const sessionID = encodeHexLowerCase(
    sha256(new TextEncoder().encode(sessionToken))
  );
  const postSessionRequestBody = JSON.stringify({
    id: sessionID,
    userID: sessionUserID,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  });
  const postSessionRequest = await fetchAPI(
    "POST",
    "/sessions",
    postSessionRequestBody
  );
  return postSessionRequest.session;
}

// NOTE: FIX LATER
export async function sessionValidateToken(
  token: string
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  });
  if (result === null) {
    return { session: null, user: null };
  }
  const { user, ...session } = result;
  if (Date.now() >= session.expiresAt.getTime()) {
    await prisma.session.delete({ where: { id: sessionId } });
    return { session: null, user: null };
  }
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await prisma.session.update({
      where: {
        id: session.id,
      },
      data: {
        expiresAt: session.expiresAt,
      },
    });
  }
  return { session, user };
}

export async function sessionInvalidate(sessionID: string): Promise<void> {
  await prisma.session.delete({ where: { id: sessionID } });
}

export async function sessionInvalidateAll(userID: number): Promise<void> {
  await prisma.session.deleteMany({
    where: {
      userID,
    },
  });
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };
