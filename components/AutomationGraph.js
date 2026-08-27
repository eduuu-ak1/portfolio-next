"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COLORS = {
  light: { wire: "#6B6B6B", signal: "#000000" },
  dark: { wire: "#8A8A8A", signal: "#FFFFFF" },
};

const ROTATE_SPEED = 0.045;
const PULSE_SPEED = 0.25;
const POINTER_TILT = 0.35;
const POINTER_EASE = 0.06;
const EDGE_RADIUS = 0.012;

const NODES = [
  { pos: [-1.9, 0.6, 0], hot: false },
  { pos: [-0.7, 1.3, 0.4], hot: false },
  { pos: [0.4, 0.4, -0.3], hot: true },
  { pos: [1.8, 0.9, 0.2], hot: false },
  { pos: [-1.1, -0.9, 0.5], hot: false },
  { pos: [0.2, -1.4, -0.2], hot: false },
  { pos: [1.5, -0.6, 0.3], hot: false },
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
          <meshBasicMaterial color={colors.wire} transparent opacity={0.45} />
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
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={1.3} />
      <directionalLight position={[-3, -2, -2]} intensity={0.35} />
      <Scene colors={colors} />
    </Canvas>
  );
}
