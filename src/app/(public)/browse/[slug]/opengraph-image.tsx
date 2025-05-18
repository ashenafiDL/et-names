import { ImageResponse } from "next/og";

export const runtime = "edge";

export default async function Image({ params }: { params: { slug: string } }) {
  try {
    const fontData = await fetch(
      new URL("../../../../../public/fonts/AbyssinicaSIL.ttf", import.meta.url),
    ).then((res) => res.arrayBuffer());
    const font = await fontData;

    const { slug } = await params;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/name?name=${slug}`,
    );

    if (!res.ok) throw new Error("Name not found");

    const { name, meaning, _count } = await res.json();

    return new ImageResponse(
      (
        <div
          style={{
            height: 630,
            width: 1200,
            display: "flex",
            flexDirection: "column",
            border: " 1px solid #00000010",
            backgroundColor: "white",
            padding: "96px 144px",
            color: "black",
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <h1
              style={{
                fontSize: 96,
                lineHeight: 1,
                fontWeight: 800,
                letterSpacing: -1,
                margin: 0,
              }}
            >
              {name}
            </h1>
            <span style={{ fontSize: 64, color: "#3b82f6" }}>♂️</span>
          </div>

          <p
            style={{
              marginTop: 32,
              fontSize: 28,
              color: "#6b7280",
              fontStyle: "italic",
            }}
          >
            {meaning}
          </p>

          <div style={{ flexGrow: 1 }}></div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 28,
              color: "#374151",
            }}
          >
            <div style={{ display: "flex", gap: 32 }}>
              <p style={{ margin: 0 }}>{`👍 ${_count.likes} Likes`}</p>
              <p style={{ margin: 0 }}>🔁 0 Shared</p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 28, color: "#9ca3af" }}>ET-NAMES</span>
            </div>
          </div>
        </div>
      ),
      {
        fonts: [
          {
            name: "Noto Sans Ethiopic",
            data: font,
            style: "normal",
            weight: 400,
          },
        ],
      },
    );
  } catch {
    return new Response("Failed to generate image", { status: 500 });
  }
}
