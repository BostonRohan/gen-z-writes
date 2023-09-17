"use client";
import { LogOut } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useHotkeys } from "react-hotkeys-hook";
import { useState } from "react";
import { signOut } from "next-auth/react";

export default function ProfileImage({
  image,
  name,
}: {
  image?: string | null;
  name?: string | null;
}) {
  const [open, setOpen] = useState(false);

  useHotkeys("shift+meta+d", () => open && signOut());

  return (
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <DropdownMenuTrigger asChild>
        <section className="cursor-pointer flex xs:flex-row flex-row-reverse items-center gap-4">
          {name && <h2 className="text-xl opacity-80">{name}</h2>}
          <Image
            width={36}
            height={36}
            src={image ?? "/icons/user.svg"}
            alt={name ?? "Profile Image"}
            className="rounded-full"
          />
        </section>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
