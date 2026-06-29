import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import type { LayerId } from "./layers";

// Three.js is heavy — only fetch it for capable users (split into its own chunk).
const FullStackScene = lazy(() => import("./FullStackScene"));

// Static, lightweight backdrop used as the Suspense fallback AND as the full
// replacement for reduced-motion / mobile / low-power users. Matches the card's
// existing gradient and uses only brand-token utilities (no new colors).
function StaticBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-portfolio-primary/10 to-portfolio-accent/10" />
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-portfolio-accent/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-0 -left-8 h-44 w-44 rounded-full bg-portfolio-primary/10 blur-3xl animate-pulse" />
    </div>
  );
}

type Props = {
  /** layer highlighted by the currently hovered expertise item */
  activeLayer: LayerId | null;
};

export default function FullStackVisual({ activeLayer }: Props) {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Whether the section has ever been in view (gates lazy mount) and whether it
  // is currently in view (gates the render loop so we don't burn cycles offscreen).
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const [inView, setInView] = useState(false);

  const enable3D = !isMobile && !prefersReducedMotion;

  useEffect(() => {
    if (!enable3D || !containerRef.current) return;
    const el = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setHasBeenInView(true);
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [enable3D]);

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden="true">
      {enable3D && hasBeenInView ? (
        <Suspense fallback={<StaticBackdrop />}>
          <FullStackScene activeLayer={activeLayer} frameloop={inView ? "always" : "never"} />
        </Suspense>
      ) : (
        <StaticBackdrop />
      )}
    </div>
  );
}
