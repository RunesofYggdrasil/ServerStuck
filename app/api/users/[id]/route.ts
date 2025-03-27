import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { User, UserSchema } from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id,
      },
    });
    return NextResponse.json({ user }, { status: 200 });
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
    const requestData: User = UserSchema.parse(response);
    if (requestData != null) {
      try {
        const duplicateData = await prisma.user.findFirstOrThrow({
          where: {
            NOT: {
              id,
            },
            username: requestData.username,
          },
        });
        return NextResponse.json(
          { message: "User with this username already exists." },
          { status: 400 }
        );
      } catch (error) {
        // Password is Hashed in UserSchema Already
        const user = await prisma.user.update({
          data: {
            username: requestData.username,
            password: requestData.password,
            permission: requestData.permission,
          },
          where: {
            id,
          },
        });
        return NextResponse.json({ user }, { status: 200 });
      }
    } else {
      return NextResponse.json(
        { message: "Invalid Input: User Data" },
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
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
