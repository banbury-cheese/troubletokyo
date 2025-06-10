import type { Metadata } from "next";
import "./globals.scss";


export const metadata: Metadata = {
  title: "Trouble Tokyo",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        {children}
      </body>
    </html>
  );
}
