import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { sanitize } from "@/app/api/sanitize";
import { Pronoun, PronounSchema } from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const pronoun = await prisma.pronoun.findFirstOrThrow({
      where: {
        id,
      },
    });
    return NextResponse.json({ pronoun }, { status: 200 });
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
    const requestData: Pronoun = PronounSchema.parse(response);
    const responseData: Pronoun | null = sanitize(requestData);
    if (responseData != null) {
      try {
        const duplicateData = await prisma.pronoun.findFirstOrThrow({
          where: {
            name: responseData.name,
          },
        });
        return NextResponse.json(
          { message: "Pronoun with this name already exists." },
          { status: 400 }
        );
      } catch (error) {
        if (Array.isArray(responseData.cases)) {
          const pronoun = await prisma.pronoun.update({
            data: {
              name: responseData.name,
              nom: responseData.cases[0],
              obj: responseData.cases[1],
              det: responseData.cases[2],
              pos: responseData.cases[3],
              ref: responseData.cases[4],
            },
            where: {
              id,
            },
          });
          return NextResponse.json({ pronoun }, { status: 200 });
        } else {
          const pronoun = await prisma.pronoun.update({
            data: {
              name: responseData.name,
              nom: responseData.cases.nom,
              obj: responseData.cases.obj,
              det: responseData.cases.det,
              pos: responseData.cases.pos,
              ref: responseData.cases.ref,
            },
            where: {
              id,
            },
          });
          return NextResponse.json({ pronoun }, { status: 200 });
        }
      }
    } else {
      return NextResponse.json(
        { message: "Invalid Input: Pronoun Data" },
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
    const pronoun = await prisma.pronoun.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ pronoun }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
