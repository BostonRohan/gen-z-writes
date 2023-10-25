import GoogleSignIn from "@/components/auth/GoogleSignIn";
import Form from "@/components/auth/LoginForm";
import authOptions from "@/utils/auth/authOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

const title = "Login";
const description =
  "Login to Project Gen Z Writes: Your Gateway to an Inspirational Literary Social Network, Igniting the Future of Literary Changemakers. Dive into a world of creativity and innovation.";

export const metadata: Metadata = {
  title,
  description,
  category: title,
  openGraph: {
    title,
    url: "https://www.projectgenzwrites.com/login",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default async function SignIn() {
  const session = await getServerSession(authOptions);

  if (session) return redirect("/profile");

  return (
    <div className="min-h-[calc(100vh_-_16px)] h-full w-full flex items-center px-4 justify-center">
      <Form />
    </div>
  );
}
