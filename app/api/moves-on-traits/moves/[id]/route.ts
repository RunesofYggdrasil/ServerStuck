import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { sanitize } from "@/app/api/sanitize";
import {
  MovesOnTraits,
  MovesOnTraitsSchema,
} from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const moveID = Number.parseInt((await params).id);
    const movesOnTraits = await prisma.movesOnTraits.findMany({
      where: {
        moveID,
      },
    });
    return NextResponse.json({ movesOnTraits }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const moveID = Number.parseInt((await params).id);
    const response = await request.json();
    const requestData: MovesOnTraits = MovesOnTraitsSchema.parse(response);
    const responseData: MovesOnTraits | null = sanitize(requestData);
    if (responseData != null) {
      const movesOnTraits = await prisma.movesOnTraits.create({
        data: {
          type: responseData.type,
          moveID: moveID,
          traitID: requestData.traitID,
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
    const moveID = Number.parseInt((await params).id);
    const movesOnTraits = await prisma.movesOnTraits.deleteMany({
      where: {
        moveID,
      },
    });
    return NextResponse.json({ movesOnTraits }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
