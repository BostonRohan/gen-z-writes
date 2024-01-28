import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const { password, id } = await request.json();

  if (password && id) {
    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: { id },
      });

      if (!user.password) throw "no password";

      const match = await bcrypt.compare(password, user?.password);

      if (!match) {
        return NextResponse.json(
          { message: "This password is incorrect, try again." },
          { status: 401 }
        );
      }

      return NextResponse.json({});
    } catch (err) {
      console.error("there was an error verifying the users password", err);
      return NextResponse.json({}, { status: 500 });
    }
  } else {
    return NextResponse.json({}, { status: 401 });
  }
}
