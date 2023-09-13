import GoogleSignIn from "@/components/auth/GoogleSignIn";
import authOptions from "@/utils/auth/authOptions";
import { getServerSession } from "next-auth/next";
import { getProviders, signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getServerSession(authOptions);

  if (session) return redirect("/profile");

  return (
    <form>
      <input name="csrfToken" type="hidden" defaultValue={""} />
      <label>
        Email address
        <input type="email" id="email" name="email" />
      </label>
      <button type="submit">Sign in with Email</button>
      <GoogleSignIn />
    </form>
  );
}
