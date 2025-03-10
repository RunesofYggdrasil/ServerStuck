import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { sanitize } from "@/app/api/sanitize";
import { Trait, TraitSchema, toTraitName } from "@/app/lib/definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  try {
    const type = toTraitName(params.slug[0].toUpperCase());
    const trait = await prisma.trait.findMany({
      where: {
        type,
      },
    });
    return NextResponse.json({ trait }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  try {
    const type = toTraitName(params.slug[0].toUpperCase());
    const trait = await prisma.trait.deleteMany({
      where: {
        type,
      },
    });
    return NextResponse.json({ trait }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
