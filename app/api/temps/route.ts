import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { sanitize } from "@/app/api/sanitize";
import { Template, TemplateSchema } from "@/app/lib/definitions";

export async function GET(request: NextRequest) {
  try {
    const templates = await prisma.template.findMany();
    return NextResponse.json({ templates }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const requestData: Template = TemplateSchema.parse(response);
    const responseData: Template | null = sanitize(requestData);
    if (responseData != null) {
      try {
        const duplicateData = await prisma.template.findFirstOrThrow({
          where: {
            name: responseData.name,
          },
        });
        return NextResponse.json(
          { message: "Template with this name already exists." },
          { status: 400 }
        );
      } catch (error) {
        const template = await prisma.template.create({
          data: {
            name: responseData.name,
            desc: responseData.desc,
          },
        });
        return NextResponse.json({ template }, { status: 200 });
      }
    } else {
      return NextResponse.json(
        { message: "Invalid Input: Template Data" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const templates = await prisma.template.deleteMany();
    return NextResponse.json({ templates }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
