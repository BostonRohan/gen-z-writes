import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  try {
    if (email) {
      await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          Authorization: `Bearer ${process.env.NEWSLETTER_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      return NextResponse.json({});
    } else {
      return NextResponse.json({}, { status: 401 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({}, { status: 500 });
  }
}
