import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name?: string | null;
      image?: string | null;
      id: string;
      username?: string | null;
      emailVerified?: null | Date;
      email: string;
      role: "USER" | "AUTHOR" | "ASPIRING_AUTHOR";
    };
  }
}
