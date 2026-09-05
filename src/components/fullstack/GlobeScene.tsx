import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { BRAND } from "./layers";

type SceneProps = {
  /** controls the render loop so we can pause when the section is offscreen */
  frameloop: "always" | "never";
};

const RADIUS = 2.3;

function randomSpherePoint(radius: number) {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  return new THREE.Vector3(
    Math.sin(phi) * Math.cos(theta) * radius,
    Math.cos(phi) * radius,
    Math.sin(phi) * Math.sin(theta) * radius
  );
}

// Dotted globe: points distributed evenly over a sphere (Fibonacci sphere),
// tinted with the brand palette so it reads as a "digital Earth". Gently twinkles.
function GlobePoints() {
  const COUNT = 1600;
  const matRef = useRef<THREE.PointsMaterial>(null);
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const palette = [new THREE.Color(BRAND.primary), new THREE.Color(BRAND.accent), new THREE.Color(BRAND.secondary)];
    const golden = Math.PI * (1 + Math.sqrt(5));
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2; // 1 -> -1
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      positions[i * 3] = Math.cos(theta) * r * RADIUS;
      positions[i * 3 + 1] = y * RADIUS;
      positions[i * 3 + 2] = Math.sin(theta) * r * RADIUS;
      const c = palette[i % palette.length];
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.opacity = 0.72 + Math.sin(state.clock.elapsedTime * 1.4) * 0.12;
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial ref={matRef} size={0.05} vertexColors transparent opacity={0.8} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// Faint latitude/longitude wireframe shell under the dots.
function GlobeWireframe() {
  return (
    <mesh>
      <sphereGeometry args={[RADIUS * 0.99, 30, 22]} />
      <meshBasicMaterial color={BRAND.primary} wireframe transparent opacity={0.1} toneMapped={false} />
    </mesh>
  );
}

// Soft atmosphere halo around the globe (inner-facing shell tints the edge).
function Atmosphere() {
  return (
    <mesh>
      <sphereGeometry args={[RADIUS * 1.12, 32, 32]} />
      <meshBasicMaterial color={BRAND.accent} transparent opacity={0.07} side={THREE.BackSide} toneMapped={false} />
    </mesh>
  );
}

// Network arcs ("flight paths") that loop over the globe, each with a pulse of
// light traveling along it — evokes data flowing across a global system.
function Arcs() {
  const ARC_COUNT = 8;
  const dotRefs = useRef<THREE.Mesh[]>([]);

  const arcs = useMemo(() => {
    return Array.from({ length: ARC_COUNT }, (_, i) => {
      const start = randomSpherePoint(RADIUS * 1.005);
      const end = randomSpherePoint(RADIUS * 1.005);
      const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(RADIUS * 1.45);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      return {
        curve,
        points: curve.getPoints(50),
        color: i % 2 === 0 ? BRAND.accent : BRAND.primary,
        speed: 0.18 + (i % 4) * 0.05,
        offset: i / ARC_COUNT,
      };
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    arcs.forEach((arc, i) => {
      const dot = dotRefs.current[i];
      if (!dot) return;
      const p = (t * arc.speed + arc.offset) % 1;
      dot.position.copy(arc.curve.getPointAt(p));
    });
  });

  return (
    <>
      {arcs.map((arc, i) => (
        <group key={i}>
          <Line points={arc.points} color={arc.color} lineWidth={1} transparent opacity={0.35} />
          <mesh
            ref={(el) => {
              if (el) dotRefs.current[i] = el;
            }}
          >
            <sphereGeometry args={[0.06, 10, 10]} />
            <meshBasicMaterial color={arc.color} transparent opacity={0.95} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </>
  );
}

// A tilted orbit ring with a satellite dot circling the globe.
function Orbit() {
  const satRef = useRef<THREE.Mesh>(null);
  const ORBIT_R = RADIUS * 1.5;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (satRef.current) {
      satRef.current.position.set(Math.cos(t * 0.5) * ORBIT_R, 0, Math.sin(t * 0.5) * ORBIT_R);
    }
  });

  return (
    <group rotation={[Math.PI / 2.6, 0, 0.3]}>
      <mesh>
        <torusGeometry args={[ORBIT_R, 0.01, 8, 96]} />
        <meshBasicMaterial color={BRAND.accent} transparent opacity={0.3} toneMapped={false} />
      </mesh>
      <mesh ref={satRef}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshBasicMaterial color={BRAND.accent} transparent opacity={0.95} toneMapped={false} />
      </mesh>
    </group>
  );
}

// Rotating globe group with subtle pointer parallax + a gentle bob.
// Exported so other scenes (e.g. ProjectOrbitScene) can reuse the same
// ambient dot/atmosphere animation instead of duplicating it.
export function Globe() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.1; // continuous spin, like the Earth
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.pointer.y * 0.15 + 0.2, 0.04);
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
  });

  return (
    <group ref={group}>
      <Atmosphere />
      <GlobeWireframe />
      <GlobePoints />
      <Arcs />
    </group>
  );
}

export default function GlobeScene({ frameloop }: SceneProps) {
  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.2], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <Globe />
      <Orbit />
    </Canvas>
  );
}
