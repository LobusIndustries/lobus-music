import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

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
          background:
            "radial-gradient(circle at 30% 25%, #2a1240 0%, #050307 65%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 58,
            top: 30,
            color: "#00f2ea",
            fontSize: 130,
            fontWeight: 700,
            fontFamily: "sans-serif",
          }}
        >
          L
        </div>
        <div
          style={{
            position: "absolute",
            left: 68,
            top: 30,
            color: "#ff2e63",
            fontSize: 130,
            fontWeight: 700,
            fontFamily: "sans-serif",
          }}
        >
          L
        </div>
        <div
          style={{
            position: "absolute",
            left: 63,
            top: 30,
            color: "#ffffff",
            fontSize: 130,
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
