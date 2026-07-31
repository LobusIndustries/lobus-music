import { ImageResponse } from "next/og";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

const blobs = [
  { color: "#8b5cf6", left: 0, top: 3, w: 30, h: 30 },
  { color: "#22c55e", left: 24, top: 0, w: 27, h: 27 },
  { color: "#2563eb", left: -3, top: 24, w: 30, h: 30 },
  { color: "#f97316", left: 21, top: 21, w: 30, h: 30 },
  { color: "#ec4899", left: 12, top: 12, w: 27, h: 27 },
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
              filter: "blur(8px)",
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
            fontSize: 33,
            fontWeight: 700,
            fontFamily: "sans-serif",
            textShadow: "0 2px 5px rgba(0,0,0,0.8)",
          }}
        >
          L
        </div>
      </div>
    ),
    { ...size }
  );
}
