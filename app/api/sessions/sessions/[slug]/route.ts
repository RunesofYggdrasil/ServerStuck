import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { Session, SessionSchema } from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const id = (await params).slug[0];
    const session = await prisma.session.findFirstOrThrow({
      where: {
        id,
      },
    });
    return NextResponse.json({ session }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const id = (await params).slug[0];
    const response = await request.json();
    const requestData: Session = SessionSchema.parse(response);
    if (requestData != null) {
      const session = await prisma.session.update({
        data: {
          expiresAt: requestData.expiresAt,
        },
        where: {
          id,
        },
      });
      return NextResponse.json({ session }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Invalid Input: Session Data" },
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
    const id = (await params).slug[0];
    const session = await prisma.session.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ session }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
