import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { sanitize } from "@/app/api/sanitize";
import { Tree, TreeSchema } from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const name = (await params).slug[0].toUpperCase();
    const tree = await prisma.tree.findFirstOrThrow({
      where: {
        name,
      },
    });
    return NextResponse.json({ tree }, { status: 200 });
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
    const requestData: Tree = TreeSchema.parse(response);
    const responseData: Tree | null = sanitize(requestData);
    if (responseData != null) {
      try {
        const duplicateData = await prisma.tree.findFirstOrThrow({
          where: {
            NOT: {
              name: name,
            },
            name: responseData.name,
          },
        });
        return NextResponse.json(
          { message: "Tree with this name already exists." },
          { status: 400 }
        );
      } catch (error) {
        const tree = await prisma.tree.update({
          data: {
            name: responseData.name,
            desc: responseData.desc,
            type: responseData.type,
            sourceID: responseData.sourceID,
            expression: responseData.expression,
          },
          where: {
            name,
          },
        });
        return NextResponse.json({ tree }, { status: 200 });
      }
    } else {
      return NextResponse.json(
        { message: "Invalid Input: Tree Data" },
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
    const tree = await prisma.tree.delete({
      where: {
        name,
      },
    });
    return NextResponse.json({ tree }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
