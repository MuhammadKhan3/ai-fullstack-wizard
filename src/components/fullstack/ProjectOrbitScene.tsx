import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
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
  /** controls the render loop so we can pause when the section is offscreen */
  frameloop: "always" | "never";
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
function ProjectOrbit({
  projects,
  onHoverProject,
  onSelectProject,
}: Omit<SceneProps, "frameloop">) {
  const { camera } = useThree();
  const tiltGroup = useRef<THREE.Group>(null);
  const itemRefs = useRef<THREE.Group[]>([]);
  const imageRefs = useRef<THREE.Mesh[]>([]);
  const haloRefs = useRef<THREE.Mesh[]>([]);
  const speedRef = useRef(1);
  const angleRef = useRef(0);
  const worldPos = useMemo(() => new THREE.Vector3(), []);
  const [hovered, setHovered] = useState<number | null>(null);

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
      item.position.set(Math.cos(angle) * RADIUS, 0, Math.sin(angle) * RADIUS);

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
        <torusGeometry args={[RADIUS, 0.006, 8, 96]} />
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
            <planeGeometry args={[1.75, 1.2]} />
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
            <planeGeometry args={[PLANE_WIDTH, PLANE_HEIGHT]} />
            <meshBasicMaterial map={textures[i]} transparent toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function ProjectOrbitScene({ projects, frameloop, onHoverProject, onSelectProject }: SceneProps) {
  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7.2], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <Globe />
      <Suspense fallback={null}>
        <ProjectOrbit projects={projects} onHoverProject={onHoverProject} onSelectProject={onSelectProject} />
      </Suspense>
    </Canvas>
  );
}
