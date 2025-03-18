import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { toMessageType } from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const type = toMessageType((await params).slug[0].toUpperCase());
    const messages = await prisma.message.findMany({
      where: {
        type,
      },
    });
    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const type = toMessageType((await params).slug[0].toUpperCase());
    const messages = await prisma.message.deleteMany({
      where: {
        type,
      },
    });
    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
