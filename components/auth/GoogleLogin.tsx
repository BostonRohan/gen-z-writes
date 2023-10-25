"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function GoogleLogin() {
  return (
    <button
      className="bg-slate-200 p-2 w-full hover:bg-slate-300 text-black rounded-md flex justify-center gap-2 xs:text-base text-sm"
      onClick={() => signIn("google")}>
      Login with Google{" "}
      <Image src="/icons/google.svg" width={24} height={24} alt="Google Icon" />
    </button>
  );
}
