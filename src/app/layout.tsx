import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { Manrope } from "next/font/google";
import { type Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import { Navbar } from "@/components/Navbar";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Patient Dashboard",
  description: "Patient Dashboard",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${manrope.variable}`}>
      <body
        className={`font-manrope max-h-screen overflow-hidden bg-[#F6F7F8]`}
      >
        <Navbar />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
