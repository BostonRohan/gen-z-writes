import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  const requestedTag = request.nextUrl.searchParams.get("tag");
  const tag = process.env.VIDEOS_CACHE_TAG;

  if (tag && requestedTag) {
    if (tag === requestedTag) {
      revalidateTag(tag);
      return NextResponse.json({ revalidated: true, now: Date.now() });
    } else {
      console.error("Incorrect Tag Passed to search param");
      return NextResponse.json({ revalidated: false, now: Date.now() });
    }
  } else {
    console.error("Missing: ENV VAR or revalidation tag");
    return NextResponse.json({ revalidated: false, now: Date.now() });
  }
}
