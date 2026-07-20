import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { businessInfo } from "@/lib/business-info";
import { BookingProvider } from "@/components/BookingProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${businessInfo.name} | Edmonds, WA`,
  description: `${businessInfo.name} — book your haircut, beard trim, or grooming package online.`,
};

export const viewport: Viewport = {
  themeColor: "#fbf3e7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-espresso">
        <BookingProvider>{children}</BookingProvider>
      </body>
    </html>
  );
}
