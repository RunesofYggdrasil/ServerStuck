import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function GET(request: NextRequest) {
  try {
    const expressionBuilders = await prisma.expressionBuilder.findMany({
      where: {
        public: false,
      },
    });
    return NextResponse.json({ expressionBuilders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const expressionBuilders = await prisma.expressionBuilder.deleteMany({
      where: {
        public: false,
      },
    });
    return NextResponse.json({ expressionBuilders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
