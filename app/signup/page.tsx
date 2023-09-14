import GoogleSignIn from "@/components/auth/GoogleSignIn";
import Form from "@/components/auth/SignupForm";
import authOptions from "@/utils/auth/authOptions";
import { getServerSession } from "next-auth/next";
import { getProviders, signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getServerSession(authOptions);

  if (session) return redirect("/profile");

  return (
    <div className="min-h-[calc(100vh_-_16px)] h-full w-full flex items-center px-4 justify-center">
      <Form />
    </div>
  );
}
