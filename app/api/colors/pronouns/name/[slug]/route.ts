import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { ModelName } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const name = (await params).slug[0].toUpperCase();
    const pronoun = await prisma.pronoun.findFirstOrThrow({
      where: {
        name,
      },
    });
    const origin = ModelName.PRONOUN;
    const originID = pronoun.id;
    const colors = await prisma.color.findMany({
      where: {
        origin,
        originID,
      },
    });
    return NextResponse.json({ colors }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const name = (await params).slug[0].toUpperCase();
    const pronoun = await prisma.pronoun.findFirstOrThrow({
      where: {
        name,
      },
    });
    const origin = ModelName.PRONOUN;
    const originID = pronoun.id;
    const colors = await prisma.color.deleteMany({
      where: {
        origin,
        originID,
      },
    });
    return NextResponse.json({ colors }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
