import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { sanitize } from "@/app/api/sanitize";
import { Color, ColorSchema } from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const color = await prisma.color.findFirstOrThrow({
      where: {
        id,
      },
    });
    return NextResponse.json({ color }, { status: 200 });
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
    const requestData: Color = ColorSchema.parse(response);
    const responseData: Color | null = sanitize(requestData);
    if (responseData != null) {
      const color = await prisma.color.update({
        data: {
          hex: responseData.hex,
          origin: responseData.origin,
          originID: responseData.originID,
        },
        where: {
          id,
        },
      });
      return NextResponse.json({ color }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Invalid Input: Color Data" },
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
    const color = await prisma.color.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ color }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
