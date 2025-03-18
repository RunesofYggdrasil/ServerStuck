import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { toMessageType } from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const type = toMessageType((await params).slug[0].toUpperCase());
    const messages = await prisma.message.findFirstOrThrow({
      where: {
        type,
      },
    });
    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
