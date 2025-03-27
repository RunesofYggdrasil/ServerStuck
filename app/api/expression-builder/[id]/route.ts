import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { sanitize } from "@/app/api/sanitize";
import {
  ExpressionBuilder,
  ExpressionBuilderSchema,
} from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const expressionBuilder = await prisma.expressionBuilder.findFirstOrThrow({
      where: {
        id,
      },
    });
    return NextResponse.json({ expressionBuilder }, { status: 200 });
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
    const requestData: ExpressionBuilder =
      ExpressionBuilderSchema.parse(response);
    const responseData: ExpressionBuilder | null = sanitize(requestData);
    if (responseData != null) {
      try {
        const duplicateData = await prisma.expressionBuilder.findFirstOrThrow({
          where: {
            NOT: {
              id,
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
            origin: responseData.origin,
            originID: responseData.originID,
            expressionID: responseData.expressionID,
          },
          where: {
            id,
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const expressionBuilder = await prisma.expressionBuilder.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ expressionBuilder }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
