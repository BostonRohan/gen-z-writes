import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { r2 } from "@/lib/r2";

export const dynamic = "force-dynamic";

import { waitUntil, ipAddress } from "@vercel/functions";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

//TODO: remove this and just have sign in to access this route

export async function POST(request: Request) {
  const returnSignedUrl = async () => {
    const { fileName } = await request.json();

    console.log("Generating upload URL...");

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
  };

  try {
    // Allow local development to bypass rate limiting
    if (process.env.VERCEL_ENV === "development") {
      return returnSignedUrl();
    }

    const ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, "10 s"),
      prefix: "@upstash/ratelimit",
      analytics: true,
    });

    const identifier = "api";
    const { success, limit, remaining, pending } =
      await ratelimit.limit(identifier);

    const response = {
      success: success,
      limit: limit,
      remaining: remaining,
    };

    // pending is a promise for handling the analytics submission
    waitUntil(pending);

    if (!success) {
      const ip = ipAddress(request);
      console.warn("Rate limit exceeded", { ip });
      return new Response(JSON.stringify(response), { status: 429 });
    }

    return returnSignedUrl();
  } catch (err) {
    // TODO: Sentry
    console.error(err);
  }
}
