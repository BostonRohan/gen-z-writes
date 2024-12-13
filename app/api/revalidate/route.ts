import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  _type: string;
};

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      path?: string | undefined;
    }>(req, process.env.SANITY_HOOK_SECRET);

    if (!isValidSignature) {
      return new Response("Invalid Signature", { status: 401 });
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      const message = "Invalid signature";
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      });
    } else if (!body?._type) {
      const message = "Bad Request";
      return new Response(JSON.stringify({ message, body }), { status: 400 });
    }

    revalidateTag(body._type);

    return NextResponse.json({ body });
  } catch (err) {
    if (err instanceof Error) {
      return new Response(err.message, { status: 500 });
    }

    if (body.path) {
      console.log(`revalidating tag: ${body._type}:${body.path}`);
      revalidateTag(`${body._type}:${body.path}`);
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
