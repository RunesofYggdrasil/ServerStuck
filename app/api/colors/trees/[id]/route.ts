import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { ModelName } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const origin = ModelName.TREE;
    const originID = Number.parseInt((await params).id);
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const origin = ModelName.TREE;
    const originID = Number.parseInt((await params).id);
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
