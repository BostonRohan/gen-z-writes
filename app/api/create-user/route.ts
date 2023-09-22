import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({}, { status: 401 });
  }
  try {
    await prisma.user.create({
      data: { email, password: await bcrypt.hash(password, 10) },
    });
    return NextResponse.json({});
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return NextResponse.json(
          {
            data: "Existing user",
          },
          { status: 401, headers: { "content-type": "text/html" } }
        );
      }
    }
    console.error(err);
    return NextResponse.json({}, { status: 500 });
  }
}
