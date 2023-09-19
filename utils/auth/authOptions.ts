import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";

const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
    verifyRequest: "/",
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          console.error("no email provided");
          throw new Error("no-email");
        }
        const { email } = credentials;
        try {
          const user = await prisma.user.findUniqueOrThrow({
            where: {
              email,
            },
          });

          if (!user?.password) {
            console.error(
              `password does not exist for the user: ${user.email}`
            );
            throw new Error(`no-password`);
          }

          const match = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!match) {
            console.error(
              `password does not exist for the user: ${user.email}`
            );
            throw new Error("invalid-password");
          }

          return user;
        } catch (err) {
          console.error(
            `there was an error authenticating the user: ${email} -- err: ${err}`
          );
          if (err instanceof Error) {
            throw new Error(err.message);
          }
          throw new Error("unexpected");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      user && (token.user = user);

      if (trigger === "update" && typeof token.user === "object") {
        token.user = { ...token.user, ...session.data };
      }

      return token;
    },
    //whatever value we return here will be the value of the next-auth session
    async session({ session, token, user }) {
      return {
        ...session,
        user: { ...session.user, ...user, ...token.user! }, // combine the session and db user
      };
    },
  },
};

export default authOptions;
