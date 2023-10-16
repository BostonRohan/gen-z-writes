"use client";
import { LogOut } from "lucide-react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

export default function ProfileImage({
  image,
  name,
  email,
  useDropDown,
}: {
  image?: string | null;
  name?: string | null;
  email: string;
  useDropDown?: boolean;
}) {
  const [open, setOpen] = useState(false);

  useHotkeys("shift+meta+d", () => open && signOut());

  if (useDropDown) {
    return (
      <DropdownMenu onOpenChange={setOpen} open={open}>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            {image ? (
              <Image
                width={100}
                height={100}
                className="aspect-square"
                src={image}
                alt={name ?? "Profile Image"}
              />
            ) : (
              <AvatarFallback className="uppercase">
                {name
                  ? `${name[0]}${
                      name.split(" ")[name.split(" ").length - 1][0]
                    }`
                  : email[0]}
              </AvatarFallback>
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Avatar className="cursor-pointer">
      {image ? (
        <Image
          width={100}
          height={100}
          className="aspect-square"
          src={image}
          alt={name ?? "Profile Image"}
        />
      ) : (
        <AvatarFallback className="uppercase">
          {name
            ? `${name[0]}${name.split(" ")[name.split(" ").length - 1][0]}`
            : email[0]}
        </AvatarFallback>
      )}
    </Avatar>
  );
}
