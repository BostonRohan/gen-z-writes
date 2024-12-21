import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { r2 } from "@/lib/r2";

export async function POST(request: Request) {
  try {
    console.log("Generating upload URL...");

    const { fileName } = await request.json();

    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: fileName,
      }),
      { expiresIn: 60 },
    );

    console.log("Successfully generated upload URL:", signedUrl);

    return NextResponse.json({ url: signedUrl });
  } catch (err) {
    // TODO: Sentry
    console.error(err);
  }
}
