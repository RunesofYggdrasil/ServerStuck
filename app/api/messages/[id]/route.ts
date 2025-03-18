import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { sanitize } from "@/app/api/sanitize";
import { Message, MessageSchema } from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const message = await prisma.message.findFirstOrThrow({
      where: {
        id,
      },
    });
    return NextResponse.json({ message }, { status: 200 });
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
    const requestData: Message = MessageSchema.parse(response);
    const responseData: Message | null = sanitize(requestData);
    if (responseData != null) {
      const message = await prisma.message.update({
        data: {
          type: responseData.type,
          message: responseData.message,
        },
        where: {
          id,
        },
      });
      return NextResponse.json({ message }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Invalid Input: Message Data" },
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
    const message = await prisma.message.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ message }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
