import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { sanitize } from "@/app/api/sanitize";
import { Move, MoveSchema } from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const move = await prisma.move.findFirstOrThrow({
      where: {
        id,
      },
    });
    return NextResponse.json({ move }, { status: 200 });
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
    const requestData: Move = MoveSchema.parse(response);
    const responseData: Move | null = sanitize(requestData);
    if (responseData != null) {
      try {
        const duplicateData = await prisma.move.findFirstOrThrow({
          where: {
            NOT: {
              id,
            },
            name: responseData.name,
          },
        });
        return NextResponse.json(
          { message: "Move with this name already exists." },
          { status: 400 }
        );
      } catch (error) {
        const move = await prisma.move.update({
          data: {
            name: responseData.name,
            desc: responseData.desc,
            origin: responseData.origin,
            originID: responseData.originID,
            expression: responseData.expression,
          },
          where: {
            id,
          },
        });
        return NextResponse.json({ move }, { status: 200 });
      }
    } else {
      return NextResponse.json(
        { message: "Invalid Input: Move Data" },
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
    const move = await prisma.move.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ move }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
