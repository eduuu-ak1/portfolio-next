"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, Icosahedron } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";

function Star() {
  return (
    <Float speed={1.8} rotationIntensity={1.4} floatIntensity={1.4}>
      <Icosahedron args={[1, 0]} rotation={[0.4, 0.3, 0]}>
        <meshStandardMaterial
          color="#F2F1F5"
          metalness={1}
          roughness={0.1}
          envMapIntensity={1.5}
        />
      </Icosahedron>
    </Float>
  );
}

export default function ShinyStar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[3, 3, 4]} intensity={1.2} color="#F2F1F5" />
        <directionalLight position={[-4, -2, -3]} intensity={0.7} color="#3D7A8C" />
        <Environment preset="studio" />
        <Star />
      </Suspense>
    </Canvas>
  );
}