import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const dynamic = 'force-static';

export const metadata: Metadata = {
  metadataBase: new URL("https://manik-dingra.in"),
  title: {
    default: "Manik Dingra",
    template: "%s | Manik Dingra",
  },
  description: "Full-stack software engineer specializing in building exceptional digital experiences. Explore my projects, skills, and journey in web development.",
  keywords: [
    "Manik Dingra",
    "Software Engineer",
    "Full Stack Developer",
    "Web Development",
    "Frontend Development",
    "Backend Development",
    "React Developer",
    "Next.js Developer",
    "Manik Dingra Portfolio",
    "Manik Dingra's Portfolio",
    "Manik Dingra's Website",
    "Manik Dingra's Personal Website",
    "Manik Dingra's Personal Portfolio",
    "Manik Dingra's Personal Projects",
    "Manik Dingra's Personal Experience",
    "Personal Portfolio",
    "Personal Projects",
    "Portfolio",
  ],
  authors: [{ name: "Manik Dingra" }],
  creator: "Manik Dingra",
  publisher: "Manik Dingra",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://manik-dingra.in",
    siteName: "Manik Dingra Portfolio",
    title: "Manik Dingra | Full-stack Developer",
    description: "Full-stack software engineer crafting exceptional digital experiences",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Manik Dingra - Full-stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manik Dingra | Software Engineer",
    description: "Full-stack software engineer crafting exceptional digital experiences",
    images: ["/og-image.png"],
    creator: "@manik_dingra",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff" },
    { media: "(prefers-color-scheme: dark)", color: "#000" },
  ],
  category: "portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}