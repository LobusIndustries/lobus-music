import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const blobs = [
  { color: "#8b5cf6", left: 0, top: 2, w: 20, h: 20 },
  { color: "#22c55e", left: 16, top: 0, w: 18, h: 18 },
  { color: "#2563eb", left: -2, top: 16, w: 20, h: 20 },
  { color: "#f97316", left: 14, top: 14, w: 20, h: 20 },
  { color: "#ec4899", left: 8, top: 8, w: 18, h: 18 },
];

export default function Icon() {
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
              filter: "blur(5px)",
              opacity: 1,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 50%, transparent 30%, #050307 90%)",
          }}
        />
        <div
          style={{
            position: "relative",
            color: "#ffffff",
            fontSize: 22,
            fontWeight: 700,
            fontFamily: "sans-serif",
            textShadow: "0 1px 3px rgba(0,0,0,0.8)",
          }}
        >
          L
        </div>
      </div>
    ),
    { ...size }
  );
}
