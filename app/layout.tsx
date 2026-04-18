import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Partha & Trisa | Wedding Ceremony",
  description: "Interactive wedding invitation for Partha Saha and Trisa Das",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "https://partha-weds-trisa-invitation.vercel.app")
  ),
  openGraph: {
    type: "website",
    siteName: "Partha & Trisa Wedding Invitation",
    title: "Partha & Trisa | Wedding Ceremony",
    description: "Interactive wedding invitation for Partha Saha and Trisa Das",
    images: [
      {
        url: "/og/cover.jpg",
        width: 1875,
        height: 2325,
        alt: "Partha and Trisa wedding invitation cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partha & Trisa | Wedding Ceremony",
    description: "Interactive wedding invitation for Partha Saha and Trisa Das",
    images: ["/og/cover.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
