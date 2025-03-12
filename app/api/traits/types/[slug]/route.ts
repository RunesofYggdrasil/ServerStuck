import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { toTraitName } from "@/app/lib/definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const type = toTraitName((await params).slug[0].toUpperCase());
    const traits = await prisma.trait.findMany({
      where: {
        type,
      },
    });
    return NextResponse.json({ traits }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const type = toTraitName((await params).slug[0].toUpperCase());
    const traits = await prisma.trait.deleteMany({
      where: {
        type,
      },
    });
    return NextResponse.json({ traits }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
