import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
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
          background:
            "radial-gradient(circle at 30% 20%, #ff2e63 0%, transparent 55%), radial-gradient(circle at 75% 75%, #00f2ea 0%, transparent 55%), #050307",
        }}
      >
        <div
          style={{
            fontSize: 200,
            fontWeight: 900,
            letterSpacing: -6,
            color: "white",
            display: "flex",
          }}
        >
          LOBUS
        </div>
        <div
          style={{
            fontSize: 32,
            color: "rgba(255,255,255,0.7)",
            letterSpacing: 8,
            textTransform: "uppercase",
            marginTop: 12,
            display: "flex",
          }}
        >
          Stream Everywhere
        </div>
      </div>
    ),
    { ...size }
  );
}
