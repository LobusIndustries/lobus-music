import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

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
          background: "#050307",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 10,
            top: 4,
            color: "#00f2ea",
            fontSize: 24,
            fontWeight: 700,
            fontFamily: "sans-serif",
          }}
        >
          L
        </div>
        <div
          style={{
            position: "absolute",
            left: 14,
            top: 4,
            color: "#ff2e63",
            fontSize: 24,
            fontWeight: 700,
            fontFamily: "sans-serif",
          }}
        >
          L
        </div>
        <div
          style={{
            position: "absolute",
            left: 12,
            top: 4,
            color: "#ffffff",
            fontSize: 24,
            fontWeight: 700,
            fontFamily: "sans-serif",
          }}
        >
          L
        </div>
      </div>
    ),
    { ...size }
  );
}
