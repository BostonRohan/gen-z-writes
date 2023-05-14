import "global.css";
import { inter } from "./fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`bg-primary ${inter.className}`} lang="en">
      <body>{children}</body>
    </html>
  );
}
