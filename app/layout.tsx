import "global.css";
import { Analytics } from "@vercel/analytics/react";
import Nav from "@/components/Nav";
import NextAuthProvider from "@/components/global/NextAuthProvider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background-primary dark">
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
        <NextAuthProvider>
          <Nav />
        </NextAuthProvider>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
