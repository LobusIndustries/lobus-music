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

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const release = getReleaseBySlug(slug);
  const title = release?.title ?? "LOBUS";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "#050307",
          overflow: "hidden",
        }}
      >
        {blobs.map((b, i) => (
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
        ))}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 50%, transparent 20%, #050307 78%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 10,
            color: "rgba(255,255,255,0.7)",
            marginBottom: 24,
          }}
        >
          LOBUS
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            fontSize: title.length > 18 ? 72 : 100,
            fontWeight: 900,
            color: "white",
            textAlign: "center",
            textShadow: "0 6px 24px rgba(0,0,0,0.85)",
            maxWidth: 1000,
            justifyContent: "center",
          }}
        >
          {title}
        </div>
      </div>
    ),
    { ...size }
  );
}
