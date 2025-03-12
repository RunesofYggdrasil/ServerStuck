import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const originID = Number.parseInt((await params).id);
    const moves = await prisma.move.findMany({
      where: {
        originID,
      },
    });
    return NextResponse.json({ moves }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const originID = Number.parseInt((await params).id);
    const moves = await prisma.move.deleteMany({
      where: {
        originID,
      },
    });
    return NextResponse.json({ moves }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
