import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { sanitize } from "@/app/api/sanitize";
import {
  ExpressionBuilder,
  ExpressionBuilderSchema,
} from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const name = (await params).slug[0].toUpperCase();
    const expressionBuilder = await prisma.expressionBuilder.findFirstOrThrow({
      where: {
        name,
      },
    });
    return NextResponse.json({ expressionBuilder }, { status: 200 });
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
    const requestData: ExpressionBuilder =
      ExpressionBuilderSchema.parse(response);
    const responseData: ExpressionBuilder | null = sanitize(requestData);
    if (responseData != null) {
      try {
        const duplicateData = await prisma.expressionBuilder.findFirstOrThrow({
          where: {
            NOT: {
              name: name,
            },
            name: responseData.name,
          },
        });
        return NextResponse.json(
          { message: "ExpressionBuilder with this name already exists." },
          { status: 400 }
        );
      } catch (error) {
        const expressionBuilder = await prisma.expressionBuilder.update({
          data: {
            name: responseData.name,
            public: responseData.public,
            type: responseData.type,
            moveID: responseData.moveID,
            expressionID: responseData.expressionID,
          },
          where: {
            name,
          },
        });
        return NextResponse.json({ expressionBuilder }, { status: 200 });
      }
    } else {
      return NextResponse.json(
        { message: "Invalid Input: ExpressionBuilder Data" },
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
    const expressionBuilder = await prisma.expressionBuilder.delete({
      where: {
        name,
      },
    });
    return NextResponse.json({ expressionBuilder }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
