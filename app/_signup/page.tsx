import Form from "@/components/auth/SignupForm";
import authOptions from "@/utils/auth/authOptions";
import { Metadata, ResolvingMetadata } from "next";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import sharedOGImage from "../layout";

const title = "Signup";
const description =
  "Signup for Project Gen Z Writes: Your Gateway to an Inspirational Literary Social Network, Igniting the Future of Literary Changemakers. Dive into a world of creativity and innovation.";

export const metadata: Metadata = {
  title,
  description,
  category: title,
  openGraph: {
    title,
    url: "https://www.projectgenzwrites.com/signup",
    description,
    ...sharedOGImage,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    ...sharedOGImage,
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
