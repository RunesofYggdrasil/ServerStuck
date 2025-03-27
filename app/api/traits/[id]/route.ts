import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { sanitize } from "@/app/api/sanitize";
import { Trait, TraitSchema } from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const trait = await prisma.trait.findFirstOrThrow({
      where: {
        id,
      },
    });
    return NextResponse.json({ trait }, { status: 200 });
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
    const requestData: Trait = TraitSchema.parse(response);
    const responseData: Trait | null = sanitize(requestData);
    if (responseData != null) {
      try {
        const duplicateData = await prisma.trait.findFirstOrThrow({
          where: {
            NOT: {
              id,
            },
            name: responseData.name,
          },
        });
        return NextResponse.json(
          { message: "Trait with this name already exists." },
          { status: 400 }
        );
      } catch (error) {
        const trait = await prisma.trait.update({
          data: {
            name: responseData.name,
            desc: responseData.desc,
            type: responseData.type,
            expression: responseData.expression,
          },
          where: {
            id,
          },
        });
        return NextResponse.json({ trait }, { status: 200 });
      }
    } else {
      return NextResponse.json(
        { message: "Invalid Input: Trait Data" },
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
    const trait = await prisma.trait.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ trait }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
