import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { BRAND, SCENE_LAYERS, type LayerId } from "./layers";

type SceneProps = {
  /** the layer the user is currently hovering in the expertise list, if any */
  activeLayer: LayerId | null;
  /** controls the render loop so we can pause when the section is offscreen */
  frameloop: "always" | "never";
};

type Node = {
  layer: LayerId;
  position: THREE.Vector3;
  color: THREE.Color;
};

type Connection = { start: THREE.Vector3; end: THREE.Vector3; layers: [LayerId, LayerId] };

// Build node positions and the connections between adjacent layers once.
function useEcosystem() {
  return useMemo(() => {
    const nodes: Node[] = [];
    const nodesByLayer: Node[][] = [];

    SCENE_LAYERS.forEach((layer, li) => {
      const row: Node[] = [];
      layer.nodeXs.forEach((x, ni) => {
        const z = (ni - (layer.nodeXs.length - 1) / 2) * 0.18 + (li % 2 ? 0.15 : -0.15);
        const node: Node = {
          layer: layer.id,
          position: new THREE.Vector3(x, layer.y, z),
          color: new THREE.Color(layer.color),
        };
        row.push(node);
        nodes.push(node);
      });
      nodesByLayer.push(row);
    });

    const connections: Connection[] = [];
    for (let li = 0; li < nodesByLayer.length - 1; li++) {
      nodesByLayer[li].forEach((a) => {
        nodesByLayer[li + 1].forEach((b) => {
          connections.push({
            start: a.position,
            end: b.position,
            layers: [SCENE_LAYERS[li].id, SCENE_LAYERS[li + 1].id],
          });
        });
      });
    }

    return { nodes, connections };
  }, []);
}

// All connection lines drawn as a single buffer (one draw call) with per-vertex
// brand colors and a gentle opacity pulse — the ambient mesh of the system.
function Connections({ connections }: { connections: Connection[] }) {
  const materialRef = useRef<THREE.LineBasicMaterial>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(connections.length * 6);
    const colors = new Float32Array(connections.length * 6);
    const cStart = new THREE.Color(BRAND.primary);
    const cEnd = new THREE.Color(BRAND.secondary);
    connections.forEach((c, i) => {
      positions.set([c.start.x, c.start.y, c.start.z, c.end.x, c.end.y, c.end.z], i * 6);
      colors.set([cStart.r, cStart.g, cStart.b, cEnd.r, cEnd.g, cEnd.b], i * 6);
    });
    return { positions, colors };
  }, [connections]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.opacity = 0.13 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    }
  });

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <lineBasicMaterial ref={materialRef} vertexColors transparent opacity={0.15} toneMapped={false} depthWrite={false} />
    </lineSegments>
  );
}

// When an expertise item is hovered, the connections touching that layer light up
// brightly and pulse — visually tracing how that layer wires into the stack.
function ActiveConnections({ connections, activeLayer }: { connections: Connection[]; activeLayer: LayerId | null }) {
  const lineRefs = useRef<{ material: THREE.Material }[]>([]);

  const active = useMemo(
    () => (activeLayer ? connections.filter((c) => c.layers[0] === activeLayer || c.layers[1] === activeLayer) : []),
    [connections, activeLayer]
  );

  useFrame((state) => {
    const o = 0.4 + Math.sin(state.clock.elapsedTime * 4) * 0.25;
    lineRefs.current.forEach((l) => {
      if (l?.material) l.material.opacity = o;
    });
  });

  if (!activeLayer) return null;

  return (
    <>
      {active.map((c, i) => (
        <Line
          key={i}
          ref={(el) => {
            if (el) lineRefs.current[i] = el;
          }}
          points={[c.start, c.end]}
          color={BRAND.accent}
          lineWidth={2}
          transparent
          opacity={0.6}
        />
      ))}
    </>
  );
}

// Glowing nodes (core + soft halo) for each layer; the hovered layer lifts and brightens.
function Nodes({ nodes, activeLayer }: { nodes: Node[]; activeLayer: LayerId | null }) {
  const coreRefs = useRef<THREE.Mesh[]>([]);
  const haloRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    nodes.forEach((node, i) => {
      const core = coreRefs.current[i];
      const halo = haloRefs.current[i];
      const active = activeLayer === node.layer;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.08;
      const target = (active ? 1.7 : 1) * pulse;
      if (core) {
        core.scale.lerp(new THREE.Vector3(target, target, target), 0.12);
        const mat = core.material as THREE.MeshBasicMaterial;
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, active ? 1 : 0.75, 0.12);
      }
      if (halo) {
        const ht = active ? 2.2 : 1.4;
        halo.scale.lerp(new THREE.Vector3(ht, ht, ht), 0.1);
        const mat = halo.material as THREE.MeshBasicMaterial;
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, active ? 0.3 : 0.12, 0.1);
      }
    });
  });

  return (
    <>
      {nodes.map((node, i) => (
        <group key={i} position={node.position}>
          <mesh
            ref={(el) => {
              if (el) haloRefs.current[i] = el;
            }}
          >
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.12} toneMapped={false} depthWrite={false} />
          </mesh>
          <mesh
            ref={(el) => {
              if (el) coreRefs.current[i] = el;
            }}
          >
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.75} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </>
  );
}

// Small particles that travel along connections, visualizing data/request flow
// moving from the UI down to backend services and the database/cloud.
function DataFlow({ connections }: { connections: Connection[] }) {
  const COUNT = 18;
  const meshRefs = useRef<THREE.Mesh[]>([]);
  const state = useRef(
    Array.from({ length: COUNT }, (_, i) => ({
      conn: i % connections.length,
      t: (i / COUNT) % 1,
      speed: 0.25 + (i % 5) * 0.06,
      color: i % 3 === 0 ? BRAND.primary : BRAND.accent,
    }))
  );

  useFrame((_, delta) => {
    state.current.forEach((p, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;
      p.t += delta * p.speed;
      if (p.t >= 1) {
        p.t = 0;
        p.conn = (p.conn + 7) % connections.length;
      }
      const c = connections[p.conn];
      const e = p.t < 0.5 ? 2 * p.t * p.t : 1 - Math.pow(-2 * p.t + 2, 2) / 2;
      mesh.position.lerpVectors(c.start, c.end, e);
    });
  });

  return (
    <>
      {state.current.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) meshRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color={p.color} transparent opacity={0.95} toneMapped={false} />
        </mesh>
      ))}
    </>
  );
}

// Faint floor grid for an "engineering dashboard" feel.
function GroundGrid() {
  return (
    <gridHelper
      args={[18, 18, BRAND.primary, BRAND.secondary]}
      position={[0, -3, 0]}
      ref={(el) => {
        if (el) {
          const m = el.material as THREE.LineBasicMaterial;
          m.transparent = true;
          m.opacity = 0.08;
          m.depthWrite = false;
        }
      }}
    />
  );
}

// Sparse background starfield tinted with the brand colors.
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const COUNT = 240;

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const palette = [new THREE.Color(BRAND.primary), new THREE.Color(BRAND.accent), new THREE.Color(BRAND.secondary)];
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 11;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
      const c = palette[i % palette.length];
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.4} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// Abstract wireframe shapes drifting in the background ("floating tech elements").
function FloatingShapes() {
  const group = useRef<THREE.Group>(null);
  const shapes = useMemo(
    () => [
      { pos: [-3.2, 1.4, -1.5], color: BRAND.primary, geo: "ico" as const, s: 0.55 },
      { pos: [3.3, -1.2, -1.8], color: BRAND.accent, geo: "torus" as const, s: 0.5 },
      { pos: [2.7, 1.8, -1.2], color: BRAND.secondary, geo: "octa" as const, s: 0.45 },
      { pos: [-2.9, -1.7, -1.6], color: BRAND.accent, geo: "octa" as const, s: 0.4 },
    ],
    []
  );

  useFrame((state) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      child.rotation.x = state.clock.elapsedTime * 0.2 + i;
      child.rotation.y = state.clock.elapsedTime * 0.15 + i;
      child.position.y = (shapes[i].pos[1] as number) + Math.sin(state.clock.elapsedTime * 0.6 + i) * 0.25;
    });
  });

  return (
    <group ref={group}>
      {shapes.map((s, i) => (
        <mesh key={i} position={s.pos as [number, number, number]} scale={s.s}>
          {s.geo === "ico" && <icosahedronGeometry args={[1, 0]} />}
          {s.geo === "torus" && <torusGeometry args={[0.7, 0.22, 8, 16]} />}
          {s.geo === "octa" && <octahedronGeometry args={[1, 0]} />}
          <meshBasicMaterial color={s.color} wireframe transparent opacity={0.28} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

// Root group that parallaxes toward the pointer for depth/interactivity.
function Ecosystem({ activeLayer }: { activeLayer: LayerId | null }) {
  const group = useRef<THREE.Group>(null);
  const { nodes, connections } = useEcosystem();

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.35, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.pointer.y * 0.2, 0.05);
  });

  return (
    <group ref={group}>
      <GroundGrid />
      <ParticleField />
      <FloatingShapes />
      <Connections connections={connections} />
      <ActiveConnections connections={connections} activeLayer={activeLayer} />
      <Nodes nodes={nodes} activeLayer={activeLayer} />
      <DataFlow connections={connections} />
    </group>
  );
}

export default function FullStackScene({ activeLayer, frameloop }: SceneProps) {
  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <Ecosystem activeLayer={activeLayer} />
    </Canvas>
  );
}
