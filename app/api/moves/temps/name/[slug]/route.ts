import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { sanitize } from "@/app/api/sanitize";
import { MovesOnTraits, MovesOnTraitsSchema } from "@/app/lib/definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const name = (await params).slug[0].toUpperCase();
    const template = await prisma.template.findFirstOrThrow({
      where: {
        name,
      },
    });
    const originID = template.id;
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
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const name = (await params).slug[0].toUpperCase();
    const template = await prisma.template.findFirstOrThrow({
      where: {
        name,
      },
    });
    const originID = template.id;
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
