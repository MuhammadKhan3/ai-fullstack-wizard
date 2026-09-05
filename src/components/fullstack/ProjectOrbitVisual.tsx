import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import type { OrbitProject } from "./ProjectOrbitScene";

const ProjectOrbitScene = lazy(() => import("./ProjectOrbitScene"));

type Props = {
  projects: OrbitProject[];
  profileImage?: string;
  onHoverProject: (project: OrbitProject | null) => void;
};

// Static, lightweight fallback for mobile / reduced-motion / the Suspense gap.
// Keeps the same brand-colored backdrop as the other scenes, plus a simple
// row of clickable project thumbnails so navigation still works without 3D.
function StaticBackdrop({ projects, profileImage }: { projects: OrbitProject[]; profileImage?: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-portfolio-primary/15" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-portfolio-accent/5 blur-3xl animate-pulse" aria-hidden="true" />
      {profileImage && (
        <div className="absolute left-1/2 top-[18%] -translate-x-1/2" aria-hidden="true">
          <div style={{ width: 80, height: 80, borderRadius: "50%", padding: 3, background: "linear-gradient(135deg, #0ea5e9, #7c3aed)", boxShadow: "0 0 20px rgba(14,165,233,0.4)" }}>
            <img src={profileImage} alt="Profile" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", objectPosition: "top center", border: "3px solid white", display: "block" }} />
          </div>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-6 flex justify-center gap-3 px-4 overflow-x-auto">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/project/${project.id}`}
            aria-label={`View ${project.title}`}
            className="flex-shrink-0 h-14 w-20 rounded-lg overflow-hidden border-2 border-white shadow-md hover:scale-105 transition-transform"
          >
            <img src={project.image} alt={project.title} loading="lazy" className="h-full w-full object-cover" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function ProjectOrbitVisual({ projects, profileImage, onHoverProject }: Props) {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const [hasBeenInView, setHasBeenInView] = useState(false);
  const [inView, setInView] = useState(false);

  // Only disable 3D for users who explicitly prefer reduced motion (accessibility).
  // Mobile devices get the full globe — it's lightweight enough.
  const enable3D = !prefersReducedMotion;

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

  const handleSelectProject = (project: OrbitProject) => {
    navigate(`/project/${project.id}`);
  };

  return (
    <div ref={containerRef} className={`absolute inset-y-0 ${isMobile ? 'left-3 right-3' : 'inset-x-0'}`}>
      {enable3D && hasBeenInView ? (
        <Suspense fallback={<StaticBackdrop projects={projects} profileImage={profileImage} />}>
          <ProjectOrbitScene
            projects={projects}
            profileImage={profileImage}
            frameloop={inView ? "always" : "never"}
            onHoverProject={onHoverProject}
            onSelectProject={handleSelectProject}
            isMobile={isMobile ?? false}
          />
        </Suspense>
      ) : (
        <StaticBackdrop projects={projects} profileImage={profileImage} />
      )}
    </div>
  );
}
