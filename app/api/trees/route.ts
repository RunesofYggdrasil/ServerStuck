import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { sanitize } from "@/app/api/sanitize";
import { Tree, TreeSchema } from "@/app/lib/prisma-definitions";

export async function GET(request: NextRequest) {
  try {
    const trees = await prisma.tree.findMany();
    return NextResponse.json({ trees }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const requestData: Tree = TreeSchema.parse(response);
    const responseData: Tree | null = sanitize(requestData);
    if (responseData != null) {
      try {
        const duplicateData = await prisma.tree.findFirstOrThrow({
          where: {
            name: responseData.name,
          },
        });
        return NextResponse.json(
          { message: "Tree with this name already exists." },
          { status: 400 }
        );
      } catch (error) {
        const tree = await prisma.tree.create({
          data: {
            name: responseData.name,
            desc: responseData.desc,
            type: responseData.type,
            sourceID: responseData.sourceID,
            expression: responseData.expression,
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

export async function DELETE(request: NextRequest) {
  try {
    const trees = await prisma.tree.deleteMany();
    return NextResponse.json({ trees }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
