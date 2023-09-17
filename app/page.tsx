import Hero from "@/components/home/Hero";
import Philosophy from "@/components/home/Philosophy";
import Contributors from "@/components/home/Contributors";
import AuthorInterest from "@/components/home/AuthorInterest";
import authOptions from "@/utils/auth/authOptions";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Hero />
      <Philosophy />
      <Contributors />
      <AuthorInterest />
    </>
  );
}
