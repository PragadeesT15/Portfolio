import { ImageResponse } from "next/og";
import { profile, siteConfig } from "@/data/profile";

export const alt = `${siteConfig.name} — Full-Stack Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#05060a",
          color: "#eef0f8",
          padding: "58px 68px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(circle at 82% 18%, rgba(155,107,255,0.35), transparent 42%), radial-gradient(circle at 12% 88%, rgba(77,227,255,0.22), transparent 45%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-120px",
            top: "-80px",
            width: "520px",
            height: "520px",
            borderRadius: "999px",
            border: "1px solid rgba(155,107,255,0.28)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "40px",
            top: "120px",
            width: "330px",
            height: "330px",
            borderRadius: "999px",
            border: "1px dashed rgba(77,227,255,0.26)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "178px",
            top: "262px",
            width: "54px",
            height: "54px",
            borderRadius: "999px",
            background: "rgba(77,227,255,0.18)",
            border: "1px solid rgba(77,227,255,0.55)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                letterSpacing: "2px",
                color: "#9fe9ff",
              }}
            >
              {siteConfig.monogram}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              <span style={{ fontSize: "17px", letterSpacing: "0.4px" }}>{profile.name}</span>
              <span style={{ fontSize: "11px", color: "rgba(238,240,248,0.45)", letterSpacing: "3px" }}>
                PORTFOLIO / 2026
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "11px",
              letterSpacing: "2.5px",
              color: "rgba(238,240,248,0.6)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "999px",
              padding: "9px 16px",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "999px", background: "#6ee7b7" }} />
            OPEN TO SELECT PROJECTS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "820px" }}>
          <span style={{ fontSize: "13px", letterSpacing: "4px", color: "rgba(77,227,255,0.85)" }}>
            FULL-STACK DEVELOPER
          </span>
          <span style={{ fontSize: "76px", lineHeight: 1.02, letterSpacing: "-3.5px" }}>I Build Digital</span>
          <span
            style={{
              fontSize: "76px",
              lineHeight: 1.02,
              letterSpacing: "-3.5px",
              color: "#a98cff",
            }}
          >
            Experiences.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "22px",
            fontSize: "13px",
            color: "rgba(238,240,248,0.55)",
          }}
        >
          <span>{siteConfig.description.slice(0, 88)}…</span>
          <span style={{ letterSpacing: "2px", fontSize: "11px" }}>NEXT.JS / THREE.JS / FRAMER MOTION</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
