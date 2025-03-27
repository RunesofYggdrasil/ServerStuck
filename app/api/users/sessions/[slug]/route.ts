import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

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
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id: session.userID,
      },
    });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
