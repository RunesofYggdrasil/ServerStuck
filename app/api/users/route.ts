import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { User, UserSchema } from "@/app/lib/prisma-definitions";

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const requestData: User = UserSchema.parse(response);
    if (requestData != null) {
      try {
        const duplicateData = await prisma.user.findFirstOrThrow({
          where: {
            username: requestData.username,
          },
        });
        return NextResponse.json(
          { message: "User with this username already exists." },
          { status: 400 }
        );
      } catch (error) {
        // Password is Hashed in UserSchema Already
        const user = await prisma.user.create({
          data: {
            username: requestData.username,
            password: requestData.password,
            permission: requestData.permission,
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

export async function DELETE(request: NextRequest) {
  try {
    const users = await prisma.user.deleteMany();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
