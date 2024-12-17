import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { Slug } from "sanity";

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug: Slug;
    }>(req, process.env.SANITY_HOOK_SECRET);

    console.log({ body });

    if (!isValidSignature) {
      return new Response("Invalid Signature", { status: 401 });
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return new Response("Invalid Signature", { status: 401 });
    }

    if (!body?._type) {
      return new Response("Bad Request", { status: 400 });
    }

    if (body.slug) {
      console.log(`revalidating tag: ${body._type}:${body.slug.current}`);

      revalidateTag(`${body._type}:${body.slug.current}`);
    }

    console.log(`revalidating tag: ${body._type}`);

    revalidateTag(body._type);
    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
    return new Response("An unknown error occured revalidating", {
      status: 500,
    });
  }
}
