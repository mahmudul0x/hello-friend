// Shared image helpers for Unsplash-hosted assets (CDN-friendly).
// Goals: smaller payloads, working srcset, graceful fallback when an image 404s.

export const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1200&q=70&auto=format&fit=crop";

/** Tiny blurred LQIP version (for background placeholder). */
export function lqip(src?: string) {
  if (!src) return undefined;
  if (!/images\.unsplash\.com/.test(src)) return undefined;
  const base = src.split("?")[0];
  return `${base}?w=24&q=20&blur=50&auto=format&fit=crop`;
}

/** Normalize an Unsplash URL to a given width / quality. */
export function unsplash(src: string, w = 1200, q = 75) {
  if (!/images\.unsplash\.com/.test(src)) return src;
  const base = src.split("?")[0];
  return `${base}?w=${w}&q=${q}&auto=format&fit=crop`;
}

/** Build a responsive srcset for Unsplash URLs. */
export function unsplashSrcSet(src?: string, widths = [400, 640, 800, 1024, 1280, 1600]) {
  if (!src || !/images\.unsplash\.com/.test(src)) return undefined;
  const base = src.split("?")[0];
  return widths
    .map((w) => `${base}?w=${w}&q=75&auto=format&fit=crop ${w}w`)
    .join(", ");
}

/** onError handler that swaps to a guaranteed fallback once. */
export function onImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const el = e.currentTarget;
  if (el.dataset.fallback === "1") return;
  el.dataset.fallback = "1";
  el.removeAttribute("srcset");
  el.src = FALLBACK_IMG;
}
