import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import jwt from "jsonwebtoken";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_TOKEN);

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (email && process.env.EMAIL_SECRET) {
    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: { email },
      });

      resend.emails.send({
        from: "support@projectgenzwrites.com",
        reply_to: "noreply@projectgenzwrites.com",
        to: user.email,
        subject: "Gen Z Writes Verify Email",
        html: `<a href=${`${
          process.env.NEXTAUTH_URL
        }/api/verify-email?eid=${jwt.sign(
          {
            data: email,
          },
          process.env.EMAIL_SECRET,
          { expiresIn: "1h" }
        )}`}>Click here to verify your email.</a>`,
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
