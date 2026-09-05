import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { BRAND } from "./layers";
import { Globe } from "./GlobeScene";

export interface OrbitProject {
  id: number;
  title: string;
  shortDescription: string;
  image: string;
}

type SceneProps = {
  projects: OrbitProject[];
  profileImage?: string;
  /** controls the render loop so we can pause when the section is offscreen */
  frameloop: "always" | "never";
  /** widen the FOV on small screens so the globe fits without clipping */
  isMobile?: boolean;
  onHoverProject: (project: OrbitProject | null) => void;
  onSelectProject: (project: OrbitProject) => void;
};

const RADIUS = 3.1;
const NEAR_DIST = 4.4;
const FAR_DIST = 9.2;
const PLANE_WIDTH = 1.5;
const PLANE_HEIGHT = 0.95;
const PLANE_ASPECT = PLANE_WIDTH / PLANE_HEIGHT;

// Same circular-orbit math as GlobeScene's satellite ring, but carrying a
// full project image per orbiting body instead of a single dot, with
// distance-based scale/opacity for depth and hover-driven slow-down + glow.

// Globe radius (matches GlobeScene.tsx RADIUS = 2.3) — used to place the
// profile picture orbit just outside the globe surface.
const GLOBE_RADIUS = 2.3;
const PROFILE_ORBIT_R = GLOBE_RADIUS * 1.18; // ~2.71, snug around the globe

// A small circular profile picture that orbits tightly around the globe
// on a tilted ring, matching the existing GlobeScene satellite aesthetic.
function ProfilePicOrbit({ profileImage, isMobile }: { profileImage: string; isMobile?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const { camera } = useThree();
  const worldPos = useMemo(() => new THREE.Vector3(), []);
  const angleRef = useRef(0);
  // Scale the orbit radius proportionally with the globe on mobile
  const orbitR = isMobile ? PROFILE_ORBIT_R * 0.72 : PROFILE_ORBIT_R;
  const avatarSize = isMobile ? 34 : 44;

  useFrame((_state, delta) => {
    angleRef.current += delta * 0.3;
    if (!groupRef.current) return;
    groupRef.current.position.set(
      Math.cos(angleRef.current) * orbitR,
      0,
      Math.sin(angleRef.current) * orbitR
    );
    groupRef.current.getWorldPosition(worldPos);
    const dist = worldPos.distanceTo(camera.position);
    const proximity = THREE.MathUtils.clamp(1 - (dist - 3.8) / 5.0, 0.3, 1);
    if (divRef.current) {
      divRef.current.style.opacity = String(proximity);
    }
  });

  return (
    <group rotation={[Math.PI / 2.6, 0, 0.3]}>
      <mesh>
        <torusGeometry args={[orbitR, 0.008, 8, 96]} />
        <meshBasicMaterial color={BRAND.primary} transparent opacity={0.2} toneMapped={false} />
      </mesh>
      <group ref={groupRef}>
        <Html transform sprite distanceFactor={4} zIndexRange={[15, 0]}>
          <div
            ref={divRef}
            style={{
              width: avatarSize,
              height: avatarSize,
              borderRadius: "50%",
              padding: 2,
              background: "linear-gradient(135deg, #0ea5e9, #7c3aed)",
              boxShadow: "0 0 10px rgba(14, 165, 233, 0.55)",
            }}
          >
            <img
              src={profileImage}
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
                objectPosition: "top center",
                border: "2px solid white",
                display: "block",
              }}
            />
          </div>
        </Html>
      </group>
    </group>
  );
}

function ProjectOrbit({
  projects,
  isMobile,
  onHoverProject,
  onSelectProject,
}: Omit<SceneProps, "frameloop" | "profileImage">) {
  const { camera } = useThree();
  const tiltGroup = useRef<THREE.Group>(null);
  const itemRefs = useRef<THREE.Group[]>([]);
  const imageRefs = useRef<THREE.Mesh[]>([]);
  const haloRefs = useRef<THREE.Mesh[]>([]);
  const speedRef = useRef(1);
  const angleRef = useRef(0);
  const worldPos = useMemo(() => new THREE.Vector3(), []);
  const [hovered, setHovered] = useState<number | null>(null);
  // Scaled dimensions for mobile — smaller images + tighter orbit ring
  const orbitRadius = isMobile ? RADIUS * 0.7 : RADIUS;
  const planeW = isMobile ? PLANE_WIDTH * 0.65 : PLANE_WIDTH;
  const planeH = isMobile ? PLANE_HEIGHT * 0.65 : PLANE_HEIGHT;

  // Batch-load every project screenshot as a plain texture (no custom shader
  // material), then give each a "cover"-style UV so different aspect ratios
  // fill the plane without stretching.
  const urls = useMemo(() => projects.map((p) => p.image), [projects]);
  const textures = useTexture(urls);

  useEffect(() => {
    textures.forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      const imgAspect = texture.image.width / texture.image.height;
      if (imgAspect > PLANE_ASPECT) {
        texture.repeat.set(PLANE_ASPECT / imgAspect, 1);
        texture.offset.set((1 - PLANE_ASPECT / imgAspect) / 2, 0);
      } else {
        texture.repeat.set(1, imgAspect / PLANE_ASPECT);
        texture.offset.set(0, (1 - imgAspect / PLANE_ASPECT) / 2);
      }
      texture.needsUpdate = true;
    });
  }, [textures]);

  useFrame((state, delta) => {
    const targetSpeed = hovered !== null ? 0.12 : 1;
    speedRef.current = THREE.MathUtils.lerp(speedRef.current, targetSpeed, 0.06);
    angleRef.current += delta * 0.15 * speedRef.current;

    projects.forEach((_project, i) => {
      const item = itemRefs.current[i];
      const halo = haloRefs.current[i];
      if (!item) return;

      const angle = (i / projects.length) * Math.PI * 2 + angleRef.current;
      item.position.set(Math.cos(angle) * orbitRadius, 0, Math.sin(angle) * orbitRadius);

      item.getWorldPosition(worldPos);
      const dist = worldPos.distanceTo(camera.position);
      const proximity = THREE.MathUtils.clamp(1 - (dist - NEAR_DIST) / (FAR_DIST - NEAR_DIST), 0, 1);
      const baseScale = 0.7 + proximity * 0.6;
      const targetScale = hovered === i ? baseScale * 1.3 : baseScale;
      item.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);

      const imageMesh = imageRefs.current[i];
      const material = imageMesh?.material as THREE.MeshBasicMaterial | undefined;
      if (material) {
        const targetOpacity = 0.55 + proximity * 0.45;
        material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, 0.1);
      }

      if (halo) {
        const haloMat = halo.material as THREE.MeshBasicMaterial;
        haloMat.opacity = THREE.MathUtils.lerp(haloMat.opacity, hovered === i ? 0.4 : 0, 0.15);
      }
    });

    if (tiltGroup.current) {
      tiltGroup.current.rotation.x = THREE.MathUtils.lerp(
        tiltGroup.current.rotation.x,
        -state.pointer.y * 0.1 + 0.16,
        0.05
      );
    }
  });

  const handleOver = (i: number) => {
    setHovered(i);
    onHoverProject(projects[i]);
    document.body.style.cursor = "pointer";
  };
  const handleOut = () => {
    setHovered(null);
    onHoverProject(null);
    document.body.style.cursor = "auto";
  };

  return (
    <group ref={tiltGroup}>
      {/* faint guide ring tracing the orbit path */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[orbitRadius, 0.006, 8, 96]} />
        <meshBasicMaterial color={BRAND.accent} transparent opacity={0.22} toneMapped={false} />
      </mesh>

      {projects.map((project, i) => (
        <group
          key={project.id}
          ref={(el) => {
            if (el) itemRefs.current[i] = el;
          }}
        >
          <mesh
            position={[0, 0, -0.02]}
            ref={(el) => {
              if (el) haloRefs.current[i] = el;
            }}
          >
            <planeGeometry args={[planeW + 0.25, planeH + 0.25]} />
            <meshBasicMaterial color={BRAND.accent} transparent opacity={0} toneMapped={false} depthWrite={false} />
          </mesh>
          <mesh
            ref={(el) => {
              if (el) imageRefs.current[i] = el;
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              handleOver(i);
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              handleOut();
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSelectProject(project);
            }}
          >
            <planeGeometry args={[planeW, planeH]} />
            <meshBasicMaterial map={textures[i]} transparent toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function ProjectOrbitScene({ projects, profileImage, frameloop, isMobile, onHoverProject, onSelectProject }: SceneProps) {
  // Wider FOV on mobile keeps the globe + orbit rings fully in frame on narrow screens
  const fov = isMobile ? 72 : 50;
  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, isMobile ? 1.25 : 1.75]}
      camera={{ position: [0, 0, 7.2], fov }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Globe scales down on mobile so it doesn't dominate the narrow viewport */}
      <group scale={isMobile ? 0.72 : 1}>
        <Globe />
      </group>
      {/* Profile picture orbits the inner globe ring, separate from project images */}
      {profileImage && <ProfilePicOrbit profileImage={profileImage} isMobile={isMobile} />}
      <Suspense fallback={null}>
        <ProjectOrbit projects={projects} isMobile={isMobile} onHoverProject={onHoverProject} onSelectProject={onSelectProject} />
      </Suspense>
    </Canvas>
  );
}
