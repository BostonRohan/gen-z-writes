import Form from "@/components/forms/UpdateProfile";
import Input from "@/components/forms/profile/input";
import NextAuthProvider from "@/components/global/NextAuthProvider";
import ProfileImage from "@/components/profile/ProfileImage";
import authOptions from "@/utils/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/login");

  return (
    <div className="text-slate-200 mt-40 max-w-[1000px] mx-auto px-4">
      <NextAuthProvider>
        <header className="flex xs:flex-row flex-col gap-4">
          <h1 className="text-6xl">Profile</h1>
          <div className="xs:ml-auto xs:mr-0 xs:flex-row flex-row-reverse mr-auto flex items-center gap-4">
            <ProfileImage name={session.user.name} image={session.user.image} />
          </div>
        </header>
        <Form userId={session.user.id} />
      </NextAuthProvider>
    </div>
  );
}
