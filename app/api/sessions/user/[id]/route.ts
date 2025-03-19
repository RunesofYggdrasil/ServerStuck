import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userID = Number.parseInt((await params).id);
    const sessions = await prisma.session.findMany({
      where: {
        userID,
      },
    });
    return NextResponse.json({ sessions }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userID = Number.parseInt((await params).id);
    const sessions = await prisma.session.deleteMany({
      where: {
        userID,
      },
    });
    return NextResponse.json({ sessions }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
