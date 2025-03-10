import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { sanitize } from "../sanitize";
import { Move, MoveSchema } from "@/app/lib/definitions";

export async function GET(request: NextRequest) {
  try {
    const moves = await prisma.move.findMany();
    return NextResponse.json({ moves }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const data = MoveSchema.parse(response);
    return NextResponse.json({ data }, { status: 200 });
    try {
      // find non unique move
    } catch (error) {
      // create move
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const moves = await prisma.move.deleteMany();
    return NextResponse.json({ moves }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
