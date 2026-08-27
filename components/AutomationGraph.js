"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const WIRE_COLOR = "#2FBF9F";
const SIGNAL_COLOR = "#E8622C";
const ROTATE_SPEED = 0.045;
const PULSE_SPEED = 0.25;

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

function Nodes() {
  return (
    <>
      {NODES.map((node, i) => (
        <mesh key={i} position={node.pos}>
          <sphereGeometry args={[node.hot ? 0.09 : 0.065, 16, 16]} />
          <meshBasicMaterial color={node.hot ? SIGNAL_COLOR : WIRE_COLOR} />
        </mesh>
      ))}
    </>
  );
}

function Edges() {
  const geometries = useMemo(
    () =>
      EDGES.map(([a, b]) => {
        const points = [
          new THREE.Vector3(...NODES[a].pos),
          new THREE.Vector3(...NODES[b].pos),
        ];
        return new THREE.BufferGeometry().setFromPoints(points);
      }),
    []
  );

  return (
    <>
      {geometries.map((geometry, i) => (
        <line key={i} geometry={geometry}>
          <lineBasicMaterial color={WIRE_COLOR} transparent opacity={0.35} />
        </line>
      ))}
    </>
  );
}

function Pulses({ reducedRef }) {
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
      const mesh = refs.current[i];
      if (mesh) mesh.position.lerpVectors(start, end, progress.current[i]);
    });
  });

  return (
    <>
      {PULSE_EDGES.map((_, i) => (
        <mesh key={i} ref={(el) => (refs.current[i] = el)}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color={SIGNAL_COLOR} />
        </mesh>
      ))}
    </>
  );
}

function Scene() {
  const groupRef = useRef(null);
  const reducedRef = usePrefersReducedMotion();

  useFrame((_state, delta) => {
    if (reducedRef.current || !groupRef.current) return;
    groupRef.current.rotation.y += delta * ROTATE_SPEED;
  });

  return (
    <group ref={groupRef}>
      <Nodes />
      <Edges />
      <Pulses reducedRef={reducedRef} />
    </group>
  );
}

export default function AutomationGraph() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
    </Canvas>
  );
}
