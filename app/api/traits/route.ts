import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { sanitize } from "../sanitize";
import { Trait, TraitSchema } from "@/app/lib/definitions";

export async function GET(request: NextRequest) {
  try {
    const traits = await prisma.trait.findMany();
    return NextResponse.json({ traits }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const requestData: Trait = TraitSchema.parse(response);
    const responseData: Trait | null = sanitize(requestData);
    return NextResponse.json({ responseData }, { status: 200 });
    try {
      // find non unique trait
    } catch (error) {
      // create trait
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const traits = await prisma.trait.deleteMany();
    return NextResponse.json({ traits }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
