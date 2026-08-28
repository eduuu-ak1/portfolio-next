"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COLORS = {
  light: { wire: "#6B6B6B", signal: "#000000", moon: "#8A8A8A" },
  dark: { wire: "#8A8A8A", signal: "#FFFFFF", moon: "#5A5A5A" },
};

const ROTATE_SPEED = 0.045;
const MOON_SPIN_SPEED = 0.02;
const PULSE_SPEED = 0.22;
const POINTER_TILT = 0.35;
const POINTER_EASE = 0.06;
const EDGE_RADIUS = 0.011;
const MOON_RADIUS = 0.85;

const NODES = [
  { pos: [1.85, 0.55, 0.3], hot: false },
  { pos: [0.65, 1.55, 0.75], hot: false },
  { pos: [0.2, 0.35, 1.95], hot: true },
  { pos: [-1.55, 0.95, -0.85], hot: false },
  { pos: [-1.75, -0.65, 0.55], hot: false },
  { pos: [-0.35, -1.85, -0.45], hot: false },
  { pos: [1.45, -1.15, 0.65], hot: false },
];

const EDGES = [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 4],
  [4, 5],
  [5, 6],
  [2, 5],
  [3, 6],
];

const PULSE_EDGES = [
  [0, 2],
  [2, 6],
];

function usePrefersReducedMotion() {
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  return reducedRef;
}

function readTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function useTheme() {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    const handleThemeChange = () => setTheme(readTheme());
    window.addEventListener("themechange", handleThemeChange);
    return () => window.removeEventListener("themechange", handleThemeChange);
  }, []);

  return theme;
}

function usePointerTarget(reducedRef) {
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedRef.current) return undefined;

    function handlePointerMove(e) {
      targetRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reducedRef]);

  return targetRef;
}

// Layered sine noise: cheap, deterministic, no texture or noise library needed.
function terrainNoise(x, y, z) {
  let n = Math.sin(x * 6.0 + y * 3.1 + z * 4.7) * 0.5;
  n += Math.sin(x * 11.3 - y * 7.9 + z * 5.3) * 0.3;
  n += Math.sin(x * 19.7 + y * 14.1 - z * 9.8) * 0.2;
  return n;
}

function useMoonGeometry(radius) {
  return useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(radius, 2);
    const position = geometry.attributes.position;
    const vertex = new THREE.Vector3();
    const direction = new THREE.Vector3();

    for (let i = 0; i < position.count; i++) {
      vertex.fromBufferAttribute(position, i);
      direction.copy(vertex).normalize();
      const bump = terrainNoise(direction.x * 3, direction.y * 3, direction.z * 3) * (radius * 0.045);
      vertex.addScaledVector(direction, bump);
      position.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    geometry.computeVertexNormals();
    return geometry;
  }, [radius]);
}

function Moon({ colors, reducedRef }) {
  const meshRef = useRef(null);
  const geometry = useMoonGeometry(MOON_RADIUS);

  useFrame((_state, delta) => {
    if (reducedRef.current || !meshRef.current) return;
    meshRef.current.rotation.y += delta * MOON_SPIN_SPEED;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial color={colors.moon} roughness={0.92} metalness={0.02} flatShading />
    </mesh>
  );
}

function Nodes({ colors }) {
  return (
    <>
      {NODES.map((node, i) => (
        <group key={i} position={node.pos}>
          <mesh>
            <sphereGeometry args={[node.hot ? 0.09 : 0.065, 20, 20]} />
            <meshStandardMaterial
              color={node.hot ? colors.signal : colors.wire}
              roughness={0.35}
              metalness={0.15}
            />
          </mesh>
          {node.hot && (
            <mesh>
              <sphereGeometry args={[0.17, 16, 16]} />
              <meshBasicMaterial
                color={colors.signal}
                transparent
                opacity={0.16}
                depthWrite={false}
              />
            </mesh>
          )}
        </group>
      ))}
    </>
  );
}

function Edges({ colors }) {
  const geometries = useMemo(
    () =>
      EDGES.map(([a, b]) => {
        const curve = new THREE.LineCurve3(
          new THREE.Vector3(...NODES[a].pos),
          new THREE.Vector3(...NODES[b].pos)
        );
        return new THREE.TubeGeometry(curve, 1, EDGE_RADIUS, 6, false);
      }),
    []
  );

  return (
    <>
      {geometries.map((geometry, i) => (
        <mesh key={i} geometry={geometry}>
          <meshBasicMaterial color={colors.wire} transparent opacity={0.4} />
        </mesh>
      ))}
    </>
  );
}

function Pulses({ colors, reducedRef }) {
  const refs = useRef([]);
  const progress = useRef(PULSE_EDGES.map((_, i) => i * 0.5));

  const segments = useMemo(
    () =>
      PULSE_EDGES.map(([a, b]) => ({
        start: new THREE.Vector3(...NODES[a].pos),
        end: new THREE.Vector3(...NODES[b].pos),
      })),
    []
  );

  useFrame((_state, delta) => {
    if (reducedRef.current) return;

    segments.forEach(({ start, end }, i) => {
      progress.current[i] = (progress.current[i] + delta * PULSE_SPEED) % 1;
      const group = refs.current[i];
      if (group) group.position.lerpVectors(start, end, progress.current[i]);
    });
  });

  return (
    <>
      {PULSE_EDGES.map((_, i) => (
        <group key={i} ref={(el) => (refs.current[i] = el)}>
          <mesh>
            <sphereGeometry args={[0.045, 14, 14]} />
            <meshStandardMaterial color={colors.signal} roughness={0.3} metalness={0.2} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.095, 12, 12]} />
            <meshBasicMaterial
              color={colors.signal}
              transparent
              opacity={0.22}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

function Scene({ colors }) {
  const groupRef = useRef(null);
  const reducedRef = usePrefersReducedMotion();
  const pointerTarget = usePointerTarget(reducedRef);

  useFrame((_state, delta) => {
    if (reducedRef.current || !groupRef.current) return;

    groupRef.current.rotation.y += delta * ROTATE_SPEED;

    const targetTiltX = pointerTarget.current.y * POINTER_TILT;
    const targetTiltZ = -pointerTarget.current.x * POINTER_TILT;
    groupRef.current.rotation.x +=
      (targetTiltX - groupRef.current.rotation.x) * POINTER_EASE;
    groupRef.current.rotation.z +=
      (targetTiltZ - groupRef.current.rotation.z) * POINTER_EASE;
  });

  return (
    <group ref={groupRef}>
      <Moon colors={colors} reducedRef={reducedRef} />
      <Nodes colors={colors} />
      <Edges colors={colors} />
      <Pulses colors={colors} reducedRef={reducedRef} />
    </group>
  );
}

export default function AutomationGraph() {
  const theme = useTheme();
  const colors = COLORS[theme];

  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={1.3} />
      <directionalLight position={[-3, -2, -2]} intensity={0.3} />
      <Scene colors={colors} />
    </Canvas>
  );
}
