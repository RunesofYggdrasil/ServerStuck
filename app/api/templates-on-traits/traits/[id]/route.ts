import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { sanitize } from "@/app/api/sanitize";
import {
  TemplatesOnTraits,
  TemplatesOnTraitsSchema,
} from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const traitID = Number.parseInt((await params).id);
    const templatesOnTraits = await prisma.templatesOnTraits.findMany({
      where: {
        traitID,
      },
    });
    return NextResponse.json({ templatesOnTraits }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const traitID = Number.parseInt((await params).id);
    const response = await request.json();
    const requestData: TemplatesOnTraits =
      TemplatesOnTraitsSchema.parse(response);
    const responseData: TemplatesOnTraits | null = sanitize(requestData);
    if (responseData != null) {
      const templatesOnTraits = await prisma.templatesOnTraits.create({
        data: {
          type: responseData.type,
          templateID: responseData.templateID,
          traitID: traitID,
        },
      });
      return NextResponse.json({ templatesOnTraits }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Invalid Input: TemplatesOnTraits Data" },
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
    const traitID = Number.parseInt((await params).id);
    const templatesOnTraits = await prisma.templatesOnTraits.deleteMany({
      where: {
        traitID,
      },
    });
    return NextResponse.json({ templatesOnTraits }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
