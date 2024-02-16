import "../global.css";
import { Analytics } from "@vercel/analytics/react";
import Nav from "@/components/Nav";
import NextAuthProvider from "@/components/global/NextAuthProvider";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

export const sharedOGImage = {
  images: ["/gen-z-writes-og.png"],
};

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
      <body className="bg-background-primary dark overflow-x-hidden">
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="sitemap" href="/sitemap.xml" />
        <NextAuthProvider>
          <Nav />
        </NextAuthProvider>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
