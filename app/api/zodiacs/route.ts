import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { sanitize } from "@/app/api/sanitize";
import { Zodiac, ZodiacSchema } from "@/app/lib/prisma-definitions";

export async function GET(request: NextRequest) {
  try {
    const zodiacs = await prisma.zodiac.findMany();
    return NextResponse.json({ zodiacs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const requestData: Zodiac = ZodiacSchema.parse(response);
    const responseData: Zodiac | null = sanitize(requestData);
    if (responseData != null) {
      try {
        const duplicateData = await prisma.zodiac.findFirstOrThrow({
          where: {
            name: responseData.name,
          },
        });
        return NextResponse.json(
          { message: "Zodiac with this name already exists." },
          { status: 400 }
        );
      } catch (error) {
        const zodiac = await prisma.zodiac.create({
          data: {
            name: responseData.name,
            title: responseData.title,
            casteID: responseData.casteID,
            swayID: responseData.swayID,
            aspectID: responseData.aspectID,
          },
        });
        return NextResponse.json({ zodiac }, { status: 200 });
      }
    } else {
      return NextResponse.json(
        { message: "Invalid Input: Zodiac Data" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const zodiacs = await prisma.zodiac.deleteMany();
    return NextResponse.json({ zodiacs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
