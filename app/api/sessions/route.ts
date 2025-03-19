import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { Session, SessionSchema } from "@/app/lib/prisma-definitions";

export async function GET(request: NextRequest) {
  try {
    const sessions = await prisma.session.findMany();
    return NextResponse.json({ sessions }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const requestData: Session = SessionSchema.parse(response);
    if (requestData != null) {
      const session = await prisma.session.create({
        data: {
          id: requestData.id,
          userID: requestData.userID,
          expiresAt: requestData.expiresAt,
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

export async function DELETE(request: NextRequest) {
  try {
    const sessions = await prisma.session.deleteMany();
    return NextResponse.json({ sessions }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
