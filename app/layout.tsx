import type { Metadata, Viewport } from "next";
import { Anton, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { genres, comparableArtists, soundDescription } from "@/lib/artistInfo";
import ShaderBackground from "./components/ShaderBackground";
import CursorTrail from "./components/CursorTrail";
import Noise from "./components/Noise";
import SoundToggle from "./components/SoundToggle";
import StructuredData from "./components/StructuredData";

const displayFont = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const bodyFont = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

const siteDescription = `LOBUS — ${soundDescription} Stream on Spotify, SoundCloud, and Apple Music, watch videos on YouTube, and follow on Instagram and TikTok.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://lobusmusic.com"),
  title: {
    default: "LOBUS",
    template: "%s — LOBUS",
  },
  description: siteDescription,
  keywords: [
    "Lobus",
    "LOBUS music",
    "Lobus artist",
    "Lobus Spotify",
    "Lobus SoundCloud",
    "Lobus Apple Music",
    "Lobus YouTube",
    "new music",
    ...genres.map((g) => g.toLowerCase()),
    ...comparableArtists.map((a) => `music like ${a}`),
    "new alternative rock music",
    "new emo music",
    "new indie rock music",
  ],
  applicationName: "LOBUS",
  authors: [{ name: "LOBUS" }],
  category: "music",
  alternates: {
    canonical: "https://lobusmusic.com",
  },
  openGraph: {
    title: "LOBUS",
    description: siteDescription,
    type: "website",
    siteName: "LOBUS",
    url: "https://lobusmusic.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "LOBUS",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "9Fs_dD0suyFddBu2eoNNxTeKn-bGs1BkYep1u6PIsHE",
  },
};

export const viewport: Viewport = {
  themeColor: "#050307",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050307] text-white font-body overflow-x-hidden">
        <StructuredData />
        <ShaderBackground />
        <CursorTrail />
        <Noise />
        <SoundToggle />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
