import { ImageResponse } from "next/og";

/**
 * Shared Open Graph image renderer.
 *
 * Both the site-wide card (`app/opengraph-image.tsx`) and per-project cards
 * (`app/projects/[slug]/opengraph-image.tsx`) render through this so social
 * previews stay on-brand and consistent. Kept font-free (system UI stack via
 * Satori defaults) to avoid shipping font binaries into the edge bundle — the
 * layout, brand navy field, and gold accent carry the identity.
 */

/** Standard OG card dimensions. */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

interface OgImageOptions {
  /** Small uppercase label above the title (e.g. section or category). */
  eyebrow: string;
  /** Large headline — the project or page name. */
  title: string;
  /** Supporting line beneath the title. */
  subtitle?: string;
  /** Footer wordmark; defaults to the site owner. */
  wordmark?: string;
}

/** Brand tokens duplicated here (Satori can't read CSS variables). */
const NAVY_950 = "#0b1220";
const NAVY_700 = "#1d3050";
const GOLD = "#d9ad55";
const WHITE = "#f3f4f6";
const MUTED = "#aab0bb";

export function renderOgImage({
  eyebrow,
  title,
  subtitle,
  wordmark = "Jennifer Ye",
}: OgImageOptions): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: NAVY_950,
          backgroundImage: `radial-gradient(70% 60% at 15% 0%, ${NAVY_700} 0%, ${NAVY_950} 60%)`,
          color: WHITE,
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: eyebrow + gold rule */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{ width: "56px", height: "4px", backgroundColor: GOLD }}
          />
          <div
            style={{
              fontSize: "26px",
              letterSpacing: "6px",
              textTransform: "uppercase",
              color: GOLD,
            }}
          >
            {eyebrow}
          </div>
        </div>

        {/* Middle: title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: title.length > 24 ? "76px" : "96px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-2px",
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                fontSize: "34px",
                lineHeight: 1.35,
                color: MUTED,
                maxWidth: "900px",
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        {/* Bottom: wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "30px",
            fontWeight: 600,
            color: WHITE,
          }}
        >
          <div
            style={{
              width: "18px",
              height: "18px",
              marginRight: "16px",
              backgroundColor: GOLD,
              transform: "rotate(45deg)",
            }}
          />
          {wordmark}
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
