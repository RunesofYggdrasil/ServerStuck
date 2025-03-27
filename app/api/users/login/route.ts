import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { Login, LoginSchema } from "@/app/lib/prisma-definitions";
import { sessionGenerateToken, sessionCreate } from "@/app/lib/user-actions";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const requestData: Login = LoginSchema.parse(response);
    if (requestData != null) {
      const user = await prisma.user.findFirstOrThrow({
        where: {
          username: requestData.username,
        },
      });
      const password = await bcrypt.compare(
        requestData.password,
        user.password
      );
      if (password) {
        const token = sessionGenerateToken();
        const session = sessionCreate(token, user.id);
        return NextResponse.json(
          { message: "Login Successful: Valid Password" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "Login Unsuccessful: Invalid Password" },
          { status: 400 }
        );
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
