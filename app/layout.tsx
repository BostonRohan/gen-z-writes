import "../global.css";
import { Analytics } from "@vercel/analytics/react";
import Nav from "@/components/Nav";
import NextAuthProvider from "@/components/global/NextAuthProvider";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import sharedOGImage from "@/lib/sharedOg";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.projectgenzwrites.com/"),
  keywords: [
    "Gen Z Writes",
    "Literary Social Network",
    "Literary Changemakers",
    "Creative Community",
    "Inspirational Writers",
    "Innovation in Writing",
    "Literary Gateway",
    "Future of Literature",
    "Creative Expression",
    "Writing Community",
    "Literature Platform",
    "Writing Inspiration",
    "Literary World",
    "Literary Creativity",
    "Writing Innovators",
  ],
  openGraph: {
    ...sharedOGImage,
  },
  twitter: {
    ...sharedOGImage,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <Nav />
        </NextAuthProvider>
        {children}
        <Toaster />
        {process.env.VERCEL_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
