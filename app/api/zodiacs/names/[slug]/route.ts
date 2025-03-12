import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { sanitize } from "@/app/api/sanitize";
import { Zodiac, ZodiacSchema } from "@/app/lib/definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const name = (await params).slug[0].toUpperCase();
    const zodiac = await prisma.zodiac.findFirstOrThrow({
      where: {
        name,
      },
    });
    return NextResponse.json({ zodiac }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const name = (await params).slug[0].toUpperCase();
    const response = await request.json();
    const requestData: Zodiac = ZodiacSchema.parse(response);
    const responseData: Zodiac | null = sanitize(requestData);
    if (responseData != null) {
      try {
        const duplicateData = await prisma.zodiac.findFirstOrThrow({
          where: {
            NOT: {
              name: name,
            },
            name: responseData.name,
          },
        });
        return NextResponse.json(
          { message: "Zodiac with this name already exists." },
          { status: 400 }
        );
      } catch (error) {
        const zodiac = await prisma.zodiac.update({
          data: {
            name: responseData.name,
            title: responseData.title,
            casteID: responseData.casteID,
            swayID: responseData.swayID,
            aspectID: responseData.aspectID,
          },
          where: {
            name,
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const name = (await params).slug[0].toUpperCase();
    const zodiac = await prisma.zodiac.delete({
      where: {
        name,
      },
    });
    return NextResponse.json({ zodiac }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
