import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { sanitize } from "@/app/api/sanitize";
import { Message, MessageSchema } from "@/app/lib/prisma-definitions";

export async function GET(request: NextRequest) {
  try {
    const messages = await prisma.message.findMany();
    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const requestData: Message = MessageSchema.parse(response);
    const responseData: Message | null = sanitize(requestData);
    if (responseData != null) {
      const message = await prisma.message.create({
        data: {
          type: responseData.type,
          message: responseData.message,
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

export async function DELETE(request: NextRequest) {
  try {
    const messages = await prisma.message.deleteMany();
    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
