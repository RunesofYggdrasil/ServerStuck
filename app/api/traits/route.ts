import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { sanitize } from "@/app/api/sanitize";
import { Trait, TraitSchema } from "@/app/lib/prisma-definitions";

export async function GET(request: NextRequest) {
  try {
    const traits = await prisma.trait.findMany();
    return NextResponse.json({ traits }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const requestData: Trait = TraitSchema.parse(response);
    const responseData: Trait | null = sanitize(requestData);
    if (responseData != null) {
      try {
        const duplicateData = await prisma.trait.findFirstOrThrow({
          where: {
            name: responseData.name,
          },
        });
        return NextResponse.json(
          { message: "Trait with this name already exists." },
          { status: 400 }
        );
      } catch (error) {
        const trait = await prisma.trait.create({
          data: {
            name: responseData.name,
            desc: responseData.desc,
            type: responseData.type,
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

export async function DELETE(request: NextRequest) {
  try {
    const traits = await prisma.trait.deleteMany();
    return NextResponse.json({ traits }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
