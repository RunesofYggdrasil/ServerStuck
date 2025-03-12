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
    const move = await prisma.move.findFirstOrThrow({
      where: {
        name,
      },
    });
    const moveID = move.id;
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
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const response = await request.json();
    const requestData: MovesOnTraits = MovesOnTraitsSchema.parse(response);
    const responseData: MovesOnTraits | null = sanitize(requestData);
    if (responseData != null) {
      try {
        const name = (await params).slug[0].toUpperCase();
        const move = await prisma.move.findFirstOrThrow({
          where: {
            name,
          },
        });
        const moveID = move.id;
        const movesOnTraits = await prisma.movesOnTraits.create({
          data: {
            type: responseData.type,
            moveID: moveID,
            traitID: requestData.traitID,
          },
        });
        return NextResponse.json({ movesOnTraits }, { status: 200 });
      } catch (error) {
        const movesOnTraits = await prisma.movesOnTraits.create({
          data: {
            type: responseData.type,
            moveID: responseData.moveID,
            traitID: responseData.traitID,
          },
        });
        return NextResponse.json({ movesOnTraits }, { status: 200 });
      }
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
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const name = (await params).slug[0].toUpperCase();
    const move = await prisma.move.findFirstOrThrow({
      where: {
        name,
      },
    });
    const moveID = move.id;
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
