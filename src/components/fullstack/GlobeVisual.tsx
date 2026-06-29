import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

// Three.js is heavy — only fetch it for capable users (its own lazy chunk).
const GlobeScene = lazy(() => import("./GlobeScene"));

// Lightweight static fallback used for the Suspense gap and for
// reduced-motion / mobile users. Brand colors only; blends with the hero.
function StaticBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-portfolio-primary/15" />
      <div className="absolute left-1/2 top-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-portfolio-accent/5 blur-3xl animate-pulse" />
    </div>
  );
}

export default function GlobeVisual() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

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
          <GlobeScene frameloop={inView ? "always" : "never"} />
        </Suspense>
      ) : (
        <StaticBackdrop />
      )}
    </div>
  );
}
