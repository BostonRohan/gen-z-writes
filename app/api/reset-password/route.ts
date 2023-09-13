import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const { password, forgotPassword } = await request.json();

  if (password && forgotPassword) {
    try {
      bcrypt.hash(password, 10, async function (err, hash) {
        if (err) throw err;
        await prisma.user.update({
          where: { forgotPassword },
          data: {
            password: hash,
            forgotPassword: null,
          },
        });
      });
      return NextResponse.json({});
    } catch (err) {
      console.error(err);
      return NextResponse.json({}, { status: 500 });
    }
  } else {
    return NextResponse.json({}, { status: 401 });
  }
}
