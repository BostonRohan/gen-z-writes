import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const { password, forgotPassword } = await request.json();

  if (password && forgotPassword) {
    try {
      await prisma.user.update({
        where: { forgotPassword },
        data: {
          password: await bcrypt.hash(password, 10),
          forgotPassword: null,
        },
      });
      return NextResponse.json({});
    } catch (err) {
      console.error("there was an error updating the users password", err);
      return NextResponse.json({}, { status: 500 });
    }
  } else {
    return NextResponse.json({}, { status: 401 });
  }
}
