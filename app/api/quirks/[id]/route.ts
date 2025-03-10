import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { sanitize } from "@/app/api/sanitize";
import { Quirk, QuirkSchema } from "@/app/lib/definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number.parseInt(params.id);
    const quirk = await prisma.quirk.findFirstOrThrow({
      where: {
        id,
      },
    });
    return NextResponse.json({ quirk }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number.parseInt(params.id);
    const response = await request.json();
    const requestData: Quirk = QuirkSchema.parse(response);
    const responseData: Quirk | null = sanitize(requestData);
    if (responseData != null) {
      try {
        const duplicateData = await prisma.quirk.findFirstOrThrow({
          where: {
            name: responseData.name,
          },
        });
        return NextResponse.json(
          { message: "Quirk with this name already exists." },
          { status: 400 }
        );
      } catch (error) {
        const quirk = await prisma.quirk.update({
          data: {
            name: responseData.name,
            desc: responseData.desc,
            match: responseData.match,
            replace: responseData.replace,
          },
          where: {
            id,
          },
        });
        return NextResponse.json({ quirk }, { status: 200 });
      }
    } else {
      return NextResponse.json(
        { message: "Invalid Input: Quirk Data" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number.parseInt(params.id);
    const quirk = await prisma.quirk.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ quirk }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
