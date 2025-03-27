"use server";

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

export async function sessionValidateToken(
  token: string
): Promise<SessionValidationResult> {
  const sessionID = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  try {
    const session = await fetchAPI("GET", "/sessions/sessions/" + sessionID);
    const user = await fetchAPI("GET", "/users/sessions/" + sessionID);
    if (Date.now() >= session.expiresAt.getTime()) {
      await fetchAPI("DELETE", "/sessions/session/" + sessionID);
      return { session: null, user: null };
    } else if (
      Date.now() >=
      session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15
    ) {
      const updateSessionRequestBody = JSON.stringify({
        userID: session.userID,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      });
      const updateSessionResponse = await fetchAPI(
        "PUT",
        "/sessions/session/" + sessionID,
        updateSessionRequestBody
      );
      return { session: updateSessionResponse, user };
    } else {
      return { session, user };
    }
  } catch (error) {
    return { session: null, user: null };
  }
}

export async function sessionInvalidate(sessionID: string): Promise<void> {
  await fetchAPI("DELETE", "/sessions/sessions/" + sessionID);
}

export async function sessionInvalidateAll(userID: number): Promise<void> {
  await fetchAPI("DELETE", "/sessions/users/" + userID);
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };
