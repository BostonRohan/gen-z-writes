import type { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

export default async function middleware(request: NextRequest) {
  //only use rate limiting on prod
  if (process.env.NODE_ENV === "production") {
    // You could alternatively limit based on user ID or similar
    const ratelimit = new Ratelimit({
      redis: kv,
      // 3 requests from the same IP in 10 seconds
      limiter: Ratelimit.slidingWindow(3, "10 s"),
    });

    const ip = request.ip ?? "127.0.0.1";
    const { limit, reset, remaining } = await ratelimit.limit(ip);

    if (remaining === 0) {
      return new Response(JSON.stringify({ error: "Rate Limit Exceeded" }), {
        status: 200,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      });
    }
  }
}

export const config = {
  matcher: "/api/:path*",
};
