import type { Metadata, Viewport } from "next";
import { Anton, Space_Grotesk } from "next/font/google";
import "./globals.css";

const displayFont = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const bodyFont = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

const siteDescription =
  "LOBUS — official site. Stream the music on Spotify, SoundCloud, and Apple Music, watch videos on YouTube, and follow on Instagram and TikTok.";

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
        {children}
      </body>
    </html>
  );
}
