import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { v4 as uuidv4 } from "uuid";
import * as jose from "jose";

export const runtime =
  process.env.NODE_ENV === "development" ? "nodejs" : "edge";
export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_TOKEN);

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (email) {
    try {
      const forgotPassword = uuidv4();

      await prisma.user.update({
        where: { email },
        data: {
          forgotPassword,
        },
      });

      //jwt the forgot password token
      const signedForgotPassword = await new jose.SignJWT({
        data: forgotPassword,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(new TextEncoder().encode(process.env.FORGOT_PASSWORD_SECRET));

      resend.emails.send({
        from: "support@projectgenzwrites.com",
        reply_to: "noreply@projectgenzwrites.com",
        to: email,
        subject: "Gen Z Writes Password Reset",
        html: `<a href=${`${process.env.NEXTAUTH_URL}/forgot-password?token=${signedForgotPassword}`}>Click here to reset your password.</a>`,
      });

      return NextResponse.json({});
    } catch (err) {
      //prisma error - if the email was not found
      if ((err as any).meta.cause === "Record to update not found.") {
        return NextResponse.json(
          { data: "We could not find a user with that email." },
          { status: 401 }
        );
      }
      console.error(err);
      return NextResponse.json({}, { status: 500 });
    }
  } else {
    return NextResponse.json({}, { status: 401 });
  }
}
