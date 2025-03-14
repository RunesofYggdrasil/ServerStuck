import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { TreeName } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const origin = TreeName.GENERICS;
    const moves = await prisma.move.findMany({
      where: {
        origin,
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
    const origin = TreeName.GENERICS;
    const moves = await prisma.move.deleteMany({
      where: {
        origin,
      },
    });
    return NextResponse.json({ moves }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
