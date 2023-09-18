import GoogleSignIn from "@/components/auth/GoogleSignIn";
import Form from "@/components/auth/LoginForm";
import authOptions from "@/utils/auth/authOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function SignIn({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);

  if (session?.user) return redirect("/profile");

  return (
    <div className="min-h-[calc(100vh_-_16px)] h-full w-full flex items-center px-4 justify-center">
      <Form error={!!searchParams?.error} />
    </div>
  );
}
