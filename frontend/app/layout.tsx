import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hearts Garden",
  description: "Hearts Garden waitlist and launch site powered by Next.js and Resend.",
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} h-full font-serif antialiased`}>
      <body className="min-h-screen flex flex-col bg-background font-serif text-foreground">
        <Header />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
