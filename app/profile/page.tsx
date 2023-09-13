import authOptions from "@/utils/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/login");

  return <div className="text-9xl text-slate-200">{session.user.name}</div>;
}
