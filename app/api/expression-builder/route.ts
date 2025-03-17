import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { sanitize } from "@/app/api/sanitize";
import {
  ExpressionBuilder,
  ExpressionBuilderSchema,
} from "@/app/lib/prisma-definitions";

export async function GET(request: NextRequest) {
  try {
    const expressionBuilders = await prisma.expressionBuilder.findMany();
    return NextResponse.json({ expressionBuilders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const requestData: ExpressionBuilder =
      ExpressionBuilderSchema.parse(response);
    const responseData: ExpressionBuilder | null = sanitize(requestData);
    if (responseData != null) {
      try {
        const duplicateData = await prisma.expressionBuilder.findFirstOrThrow({
          where: {
            name: responseData.name,
          },
        });
        return NextResponse.json(
          { message: "ExpressionBuilder with this name already exists." },
          { status: 400 }
        );
      } catch (error) {
        const expressionBuilder = await prisma.expressionBuilder.create({
          data: {
            name: responseData.name,
            public: responseData.public,
            type: responseData.type,
            moveID: responseData.moveID,
            expressionID: responseData.expressionID,
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

export async function DELETE(request: NextRequest) {
  try {
    const expressionBuilders = await prisma.expressionBuilder.deleteMany();
    return NextResponse.json({ expressionBuilders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
