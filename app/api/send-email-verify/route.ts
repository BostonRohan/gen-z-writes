import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export const runtime =
  process.env.NODE_ENV === "development" ? "nodejs" : "edge";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (email && process.env.EMAIL_SECRET) {
    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: { email },
      });

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_TOKEN}`,
        },
        body: JSON.stringify({
          from: "support@projectgenzwrites.com",
          reply_to: "noreply@projectgenzwrites.com",
          to: user.email,
          subject: "Gen Z Writes Verify Email",
          html: `<a href=${`${
            process.env.VERCEL_URL
          }/api/verify-email?eid=${await new jose.SignJWT({
            data: email,
          })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("1h")
            .sign(
              new TextEncoder().encode(process.env.EMAIL_SECRET)
            )}`}>Click here to verify your email.</a>`,
        }),
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
