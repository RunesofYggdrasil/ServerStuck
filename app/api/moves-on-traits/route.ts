import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { sanitize } from "@/app/api/sanitize";
import {
  MovesOnTraits,
  MovesOnTraitsSchema,
} from "@/app/lib/prisma-definitions";

export async function GET(request: NextRequest) {
  try {
    const movesOnTraits = await prisma.movesOnTraits.findMany();
    return NextResponse.json({ movesOnTraits }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const requestData: MovesOnTraits = MovesOnTraitsSchema.parse(response);
    const responseData: MovesOnTraits | null = sanitize(requestData);
    if (responseData != null) {
      const movesOnTraits = await prisma.movesOnTraits.create({
        data: {
          moveID: responseData.moveID,
          traitID: responseData.traitID,
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

export async function DELETE(request: NextRequest) {
  try {
    const movesOnTraits = await prisma.movesOnTraits.deleteMany();
    return NextResponse.json({ movesOnTraits }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
