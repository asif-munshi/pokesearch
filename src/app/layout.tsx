import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import Provider from "./_trpc/Provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "PokeSearch",
  description: "Created by Asif Munshi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontSans.variable}>
        <Provider>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
