import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

export async function POST(request: NextRequest) {
  const { username, email, password, id } = await request.json();

  if (!id) {
    return NextResponse.json({}, { status: 401 });
  }

  try {
    await prisma.user.update({
      where: { id },
      data: {
        ...(username && { username }),
        // ...(email && { email }),
        ...(password && {
          password: await bcrypt.hash(password, 10),
          passwordLength: password.length,
        }),
      },
    });

    return NextResponse.json({});
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if ((err as Prisma.PrismaClientKnownRequestError).code === "P2002") {
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
