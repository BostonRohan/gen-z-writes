import Form from "@/components/forms/UpdateProfile";
import NextAuthProvider from "@/components/global/NextAuthProvider";
import ProfileImage from "@/components/profile/ProfileImage";
import authOptions from "@/utils/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export interface TokenJWT {
  exp: number;
  data: string;
  iat: number;
}

export default async function Profile({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/login");

  let email_verified = true;

  if (typeof searchParams.email_verified !== "string") email_verified = false;

  if (
    typeof searchParams.email_verified === "string" &&
    process.env.EMAIL_SECRET
  ) {
    try {
      const decoded_verified = jwt.verify(
        searchParams?.email_verified,
        process.env.EMAIL_SECRET
      ) as TokenJWT;

      if (decoded_verified.data !== session.user.email) {
        email_verified = false;
      }
    } catch (err) {
      email_verified = false;
      console.error(err);
    }
  }

  return (
    <div className="text-slate-200 mt-40 max-w-4xl mx-auto px-4">
      <NextAuthProvider>
        <header className="flex xs:flex-row flex-col gap-4">
          <h1 className="text-6xl">Profile</h1>
          <div className="xs:ml-auto xs:mr-0 xs:flex-row flex-row-reverse mr-auto flex items-center gap-4">
            <ProfileImage
              name={session.user?.name}
              image={session.user?.image}
              email={session.user.email}
              useDropDown={true}
            />
          </div>
        </header>
        <Form
          emailJustVerified={email_verified}
          userId={session.user.id}
          serverSession={{
            name: session.user.name,
            passwordLength: session.user?.passwordLength,
            username: session.user.username,
            email: session.user.email,
            emailVerified: session.user.emailVerified,
          }}
        />
      </NextAuthProvider>
    </div>
  );
}
