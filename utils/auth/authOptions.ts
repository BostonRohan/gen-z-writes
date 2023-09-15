import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";

const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/",
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
          return null;
        }
        const { email } = credentials;
        try {
          const user = await prisma.user.findUniqueOrThrow({
            where: {
              email,
            },
          });

          if (!user?.password) {
            console.error("password does not exist for the user:", user.email);
            return null;
          }

          const match = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!match) {
            console.error("passwords did not match");
            return null;
          }

          return user;
        } catch (err) {
          console.error(
            `there was an error authenticating the user: ${email}`,
            err
          );
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
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
