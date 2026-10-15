"use client";

import type { CSSProperties, HTMLAttributes } from "react";

export type MarqueeProps = HTMLAttributes<HTMLDivElement> & {
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  speed?: number;
};

export function Marquee({ children, className = "", pauseOnHover = false,
  direction = "left", speed = 30, style, ...props }: MarqueeProps) {
  return (
    <div className={`marqueeRoot ${pauseOnHover ? "marqueePauseOnHover" : ""} ${className}`}
      style={{ ...style, "--marquee-duration": `${Number.isFinite(speed) && speed > 0 ? speed : 30}s` } as CSSProperties} {...props}>
      <div className="marqueeTrack" style={{ animationDirection: direction === "right" ? "reverse" : "normal" }}>
        <div className="marqueeGroup">{children}</div>
        <div className="marqueeGroup marqueeDuplicate" aria-hidden="true" inert>{children}</div>
      </div>
    </div>
  );
}
