import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { sanitize } from "@/app/api/sanitize";
import { MovesOnTraits, MovesOnTraitsSchema } from "@/app/lib/definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const movesOnTraits = await prisma.movesOnTraits.findFirstOrThrow({
      where: {
        id,
      },
    });
    return NextResponse.json({ movesOnTraits }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const response = await request.json();
    const requestData: MovesOnTraits = MovesOnTraitsSchema.parse(response);
    const responseData: MovesOnTraits | null = sanitize(requestData);
    if (responseData != null) {
      const movesOnTraits = await prisma.movesOnTraits.update({
        data: {
          type: responseData.type,
          moveID: responseData.moveID,
          traitID: responseData.traitID,
        },
        where: {
          id,
        },
      });
      return NextResponse.json({ movesOnTraits }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Invalid Input: MovesOnTraits Data" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const movesOnTraits = await prisma.movesOnTraits.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ movesOnTraits }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
