import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const resend = new Resend(process.env.RESEND_TOKEN);

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (email) {
    try {
      const forgotPassword = crypto.randomBytes(24).toString("hex").toString();

      const user = await prisma.user.update({
        where: { email },
        data: {
          forgotPassword,
        },
      });

      //jwt the forgot password token
      const hashedForgotPassword = jwt.sign(
        {
          //one hour expiration
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: forgotPassword,
        },
        process.env.FORGOT_PASSWORD_SECRET
      );

      resend.emails.send({
        //TODO update domain
        from: "onboarding@resend.dev",
        to: email,
        subject: "Gen Z Writes Password Reset",
        html: `<a href=${`${process.env.NEXTAUTH_URL}/forgot-password?token=${hashedForgotPassword}`}>Click here to reset your password.</a>`,
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
