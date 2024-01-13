"use client";

import { useToast } from "@/components/ui/use-toast";
import { ShareIcon } from "lucide-react";

export default function ShareButton({
  slug,
  title,
  text,
}: {
  slug: string;
  title: string;
  text: string;
}) {
  const { toast } = useToast();
  const url = `https://www.projectgenzwrites.com/author/${slug}`;

  const handleClick = async () => {
    try {
      if (!navigator.canShare) {
        await navigator.clipboard.writeText(url);
        toast({
          description: "Link Copied!",
        });
      } else {
        await navigator.share({
          title,
          text,
          url,
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem sharing this page. Please try again.",
      });
    }
  };
  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-center cursor-pointer">
      <ShareIcon className="text-white hover:bg-slate-200 hover:bg-opacity-30 p-1 xs:h-8 xs:w-8 w-6 h-6 flex items-center justify-center rounded-md" />
      <span className="text-xs">Share</span>
    </div>
  );
}
