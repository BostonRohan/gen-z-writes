"use client";

import { useToast } from "@/components/ui/use-toast";
import { ShareIcon } from "lucide-react";
import { toast } from "sonner";

export default function ShareButton({
  slug,
  title,
  text,
}: {
  slug: string;
  title: string;
  text: string;
}) {
  const url = `https://www.projectgenzwrites.com/author/${slug}`;

  const handleClick = async () => {
    try {
      if (!navigator.canShare) {
        await navigator.clipboard.writeText(url);
        toast.info("Link Copied!", {
          position: "top-right",
          richColors: true,
        });
      } else {
        await navigator.share({
          //TODO: add media to share?
          title,
          text,
          url,
        });
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.indexOf("user denied permission") !== -1) {
          toast.error(
            "There was a problem sharing this page. Please try again.",
            { position: "top-right", richColors: true },
          );
          console.error(err.message);
        }
      }
    }
  };
  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-center cursor-pointer"
    >
      <ShareIcon className="hover:bg-neutral-600/30 p-1 xs:h-8 xs:w-8 w-6 h-6 flex items-center justify-center rounded-md" />
      <span className="text-xs">Share</span>
    </div>
  );
}
