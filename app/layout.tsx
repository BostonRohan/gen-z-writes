import "global.css";
import { inter } from "./fonts";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-primary ${inter.className}`}>{children}</body>
    </html>
  );
}
