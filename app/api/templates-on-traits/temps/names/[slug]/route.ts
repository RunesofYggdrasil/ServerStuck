import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { sanitize } from "@/app/api/sanitize";
import {
  TemplatesOnTraits,
  TemplatesOnTraitsSchema,
} from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const name = (await params).slug[0].toUpperCase();
    const template = await prisma.template.findFirstOrThrow({
      where: {
        name,
      },
    });
    const templateID = template.id;
    const templatesOnTraits = await prisma.templatesOnTraits.findMany({
      where: {
        templateID,
      },
    });
    return NextResponse.json({ templatesOnTraits }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const response = await request.json();
    const requestData: TemplatesOnTraits =
      TemplatesOnTraitsSchema.parse(response);
    const responseData: TemplatesOnTraits | null = sanitize(requestData);
    if (responseData != null) {
      try {
        const name = (await params).slug[0].toUpperCase();
        const template = await prisma.template.findFirstOrThrow({
          where: {
            name,
          },
        });
        const templateID = template.id;
        const templatesOnTraits = await prisma.templatesOnTraits.create({
          data: {
            type: responseData.type,
            templateID: templateID,
            traitID: requestData.traitID,
          },
        });
        return NextResponse.json({ templatesOnTraits }, { status: 200 });
      } catch (error) {
        const templatesOnTraits = await prisma.templatesOnTraits.create({
          data: {
            type: responseData.type,
            templateID: responseData.templateID,
            traitID: responseData.traitID,
          },
        });
        return NextResponse.json({ templatesOnTraits }, { status: 200 });
      }
    } else {
      return NextResponse.json(
        { message: "Invalid Input: TemplatesOnTraits Data" },
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
    const template = await prisma.template.findFirstOrThrow({
      where: {
        name,
      },
    });
    const templateID = template.id;
    const templatesOnTraits = await prisma.templatesOnTraits.deleteMany({
      where: {
        templateID,
      },
    });
    return NextResponse.json({ templatesOnTraits }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
