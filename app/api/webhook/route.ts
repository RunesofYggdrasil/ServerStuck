import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

export async function POST(request: NextRequest) {
  try {
    const headerList = request.headers;
    const headerSignature = headerList.get("X-Hub-Signature-256");
    if (headerSignature) {
      const headerSecret = Buffer.from(headerSignature.split("=")[1], "utf-8");
      const processSignature = process.env.WEBHOOK_SECRET;
      if (processSignature) {
        const processSecret = Buffer.from(processSignature, "utf-8");
        const matchingSecrets = crypto.timingSafeEqual(
          headerSecret,
          processSecret
        );
        if (matchingSecrets) {
          return NextResponse.json({ message: "Success" }, { status: 200 });
        } else {
          return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
          );
        }
      } else {
        return NextResponse.json({ message: "Error" }, { status: 400 });
      }
    } else {
      return NextResponse.json({ message: "Error" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
