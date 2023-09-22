import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { getSession } from "next-auth/react";
import { Session, getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  const { username, email, password, id, name } = await request.json();

  if (!id) {
    return NextResponse.json({}, { status: 401 });
  }

  try {
    await prisma.user.update({
      where: { id },
      data: {
        ...(username && { username }),
        ...(name && { name }),
        ...(email && { email }),
        ...(password && { password: await bcrypt.hash(password, 10) }),
      },
    });

    return NextResponse.json({});
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return NextResponse.json(
          {
            data: "Existing user",
          },
          { status: 401 }
        );
      }
    }
    console.error(err);
    return NextResponse.json({}, { status: 500 });
  }
}
