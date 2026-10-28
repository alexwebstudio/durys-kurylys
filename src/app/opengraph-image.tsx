import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.slogan}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const [unbounded, manrope] = await Promise.all([
    readFile(path.join(process.cwd(), "public/fonts/og-Unbounded-700.ttf")),
    readFile(path.join(process.cwd(), "public/fonts/og-Manrope-500.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1A1A1D",
          color: "#F1F1F2",
          padding: "64px 72px",
          fontFamily: "Manrope",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 30 }}>
          <span style={{ textTransform: "uppercase", letterSpacing: "0.12em", opacity: 0.6 }}>{site.descriptor}</span>
          <span style={{ opacity: 0.6 }}>{site.city}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontFamily: "Unbounded" }}>
          {site.wordmark.map((line) => (
            <div
              key={line}
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                fontSize: 150,
                lineHeight: 1.04,
                textTransform: "uppercase",
              }}
            >
              {Array.from(line).map((ch, i) => (
                <span key={i}>{ch}</span>
              ))}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 34 }}>
          <span style={{ width: 56, height: 4, background: "#C8542B" }} />
          <span>{site.slogan}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Unbounded", data: unbounded, weight: 700, style: "normal" },
        { name: "Manrope", data: manrope, weight: 500, style: "normal" },
      ],
    },
  );
}
