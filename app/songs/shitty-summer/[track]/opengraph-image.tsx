import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getReleaseBySlug } from "@/lib/discography";
import { getTrackBySlug } from "@/lib/shittySummerTracks";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

function loadCoverArtDataUri(coverArt: string): string | null {
  try {
    const filePath = path.join(process.cwd(), "public", coverArt);
    const bytes = fs.readFileSync(filePath);
    const mime = coverArt.endsWith(".png") ? "image/png" : "image/jpeg";
    return `data:${mime};base64,${bytes.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function Image({
  params,
}: {
  params: Promise<{ track: string }>;
}) {
  const { track: trackSlug } = await params;
  const track = getTrackBySlug(trackSlug);
  const ep = getReleaseBySlug("shitty-summer");
  const title = track?.title ?? "LOBUS";
  const coverDataUri = ep?.coverArt ? loadCoverArtDataUri(ep.coverArt) : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: coverDataUri ? "flex-start" : "center",
          position: "relative",
          background: "#050307",
          overflow: "hidden",
          padding: coverDataUri ? "0 90px" : 0,
        }}
      >
        {coverDataUri && (
          <img
            src={coverDataUri}
            width={size.width}
            height={size.height}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(70px) brightness(0.35) saturate(1.3)",
              transform: "scale(1.2)",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: coverDataUri
              ? "radial-gradient(circle at 30% 50%, transparent 0%, #050307 85%)"
              : "radial-gradient(circle at 50% 50%, transparent 20%, #050307 78%)",
          }}
        />

        {coverDataUri && (
          <img
            src={coverDataUri}
            width={340}
            height={340}
            style={{
              position: "relative",
              borderRadius: 24,
              boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
              flexShrink: 0,
            }}
          />
        )}

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: coverDataUri ? "flex-start" : "center",
            marginLeft: coverDataUri ? 60 : 0,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 10,
              color: "rgba(255,255,255,0.7)",
              marginBottom: 20,
            }}
          >
            LOBUS &middot; SHITTY SUMMER
          </div>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 18 ? 60 : 84,
              fontWeight: 900,
              color: "white",
              textAlign: coverDataUri ? "left" : "center",
              textShadow: "0 6px 24px rgba(0,0,0,0.85)",
              maxWidth: coverDataUri ? 620 : 1000,
              justifyContent: coverDataUri ? "flex-start" : "center",
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
