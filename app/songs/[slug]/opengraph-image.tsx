import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getReleaseBySlug } from "@/lib/discography";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const blobs = [
  { color: "#a78bfa", left: 40, top: 60, w: 480, h: 480 },
  { color: "#4ade80", left: 680, top: 20, w: 440, h: 440 },
  { color: "#60a5fa", left: 20, top: 380, w: 480, h: 480 },
  { color: "#fb923c", left: 640, top: 360, w: 500, h: 500 },
  { color: "#f472b6", left: 360, top: 200, w: 480, h: 480 },
];

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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const release = getReleaseBySlug(slug);
  const title = release?.title ?? "LOBUS";
  const coverDataUri = release?.coverArt
    ? loadCoverArtDataUri(release.coverArt)
    : null;

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
        {coverDataUri ? (
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
        ) : (
          blobs.map((b, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: b.left,
                top: b.top,
                width: b.w,
                height: b.h,
                borderRadius: 9999,
                background: b.color,
                filter: "blur(90px)",
                opacity: 0.8,
              }}
            />
          ))
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
            LOBUS
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
