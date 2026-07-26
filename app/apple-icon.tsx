import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const blobs = [
  { color: "#8b5cf6", left: 4, top: 10, w: 100, h: 100 },
  { color: "#22c55e", left: 92, top: 4, w: 95, h: 95 },
  { color: "#2563eb", left: 0, top: 92, w: 100, h: 100 },
  { color: "#f97316", left: 88, top: 88, w: 105, h: 105 },
  { color: "#ec4899", left: 50, top: 50, w: 100, h: 100 },
  { color: "#06b6d4", left: 55, top: 8, w: 70, h: 70 },
];

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
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
              filter: "blur(22px)",
              opacity: 1,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 50%, transparent 35%, #050307 92%)",
          }}
        />
        <div
          style={{
            position: "relative",
            color: "#ffffff",
            fontSize: 118,
            fontWeight: 700,
            fontFamily: "sans-serif",
            textShadow: "0 4px 16px rgba(0,0,0,0.85)",
          }}
        >
          L
        </div>
      </div>
    ),
    { ...size }
  );
}
