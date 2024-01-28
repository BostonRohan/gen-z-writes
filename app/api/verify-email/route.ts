import bcrypt from "bcrypt";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

interface TokenJWT {
  exp: number;
  data: string;
  iat: number;
}

export async function GET(request: NextRequest, response: NextResponse) {
  const eid = request.nextUrl.searchParams.get("eid");

  if (eid && process.env.EMAIL_SECRET) {
    try {
      const decodedEId = jwt.verify(eid, process.env.EMAIL_SECRET) as TokenJWT;

      if (decodedEId.data) {
        await prisma.user.update({
          where: { email: decodedEId.data },
          data: {
            emailVerified: new Date(),
          },
        });
      }
    } catch (err) {
      console.error(err);
      return NextResponse.json({}, { status: 500 });
    } finally {
      return redirect(`/profile/?email_verified=${eid}`);
    }
  } else {
    return NextResponse.json({}, { status: 401 });
  }
}
