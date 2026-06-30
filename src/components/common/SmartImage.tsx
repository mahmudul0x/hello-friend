import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { FALLBACK_IMG, lqip, unsplashSrcSet } from "@/lib/img";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  aspect?: "square" | "video" | "4/5" | "3/4" | "auto";
  rounded?: boolean;
  sizes?: string;
  priority?: boolean;
};

export function SmartImage({
  className,
  aspect = "auto",
  rounded = true,
  alt = "",
  sizes = "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw",
  priority = false,
  ...props
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const src = typeof props.src === "string" ? props.src : undefined;
  const placeholder = lqip(src);
  const srcSet = props.srcSet ?? unsplashSrcSet(src);

  // Mark as loaded if the image was already cached (load event may not fire).
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth > 0) setLoaded(true);
  }, [src]);

  // Safety net: never leave the image invisible if onLoad never fires.
  useEffect(() => {
    if (loaded) return;
    const t = setTimeout(() => setLoaded(true), 2500);
    return () => clearTimeout(t);
  }, [loaded]);

  const aspectClass =
    aspect === "square" ? "aspect-square"
    : aspect === "video" ? "aspect-video"
    : aspect === "4/5" ? "aspect-[4/5]"
    : aspect === "3/4" ? "aspect-[3/4]"
    : "";

  return (
    <div
      className={cn("relative overflow-hidden bg-muted/60", aspectClass, rounded && "rounded-2xl", className)}
      style={placeholder ? { backgroundImage: `url(${placeholder})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
    >
      {!loaded && <div className="absolute inset-0 skeleton opacity-40" aria-hidden="true" />}
      <img
        {...props}
        ref={imgRef}
        alt={alt}
        src={errored ? FALLBACK_IMG : (src as string | undefined)}
        srcSet={errored ? undefined : srcSet}
        sizes={sizes}
        loading={priority ? "eager" : (props.loading ?? "lazy")}
        fetchPriority={priority ? "high" : (props.fetchPriority ?? "auto")}
        decoding="async"
        onLoad={(e) => { setLoaded(true); props.onLoad?.(e); }}
        onError={(e) => {
          if (!errored) { setErrored(true); setLoaded(true); }
          props.onError?.(e);
        }}
        className={cn(
          "h-full w-full object-cover transition-all duration-700 will-change-transform",
          loaded ? "scale-100 opacity-100" : "scale-105 opacity-0",
        )}
      />
    </div>
  );
}
