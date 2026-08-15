"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Planet() {
  const groupRef = useRef(null);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Soft outer glow (approximated atmosphere) */}
      <mesh>
        <sphereGeometry args={[1.35, 32, 32]} />
        <meshBasicMaterial
          color="#3D7A8C"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Core sphere */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#0A0A0C"
          roughness={0.35}
          metalness={0.6}
        />
      </mesh>

      {/* Rim light accent (thin fresnel-ish highlight ring) */}
      <mesh>
        <sphereGeometry args={[1.01, 64, 64]} />
        <meshBasicMaterial
          color="#3D7A8C"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Saturn-style ring */}
      <mesh rotation={[THREE.MathUtils.degToRad(75), 0, THREE.MathUtils.degToRad(20)]}>
        <torusGeometry args={[1.7, 0.03, 8, 100]} />
        <meshStandardMaterial
          color="#3D7A8C"
          metalness={0.7}
          roughness={0.3}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}

export default function RingedPlanet() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 3, 4]} intensity={1.2} color="#FFFFFF" />
        <directionalLight position={[-4, -2, -3]} intensity={0.5} color="#3D7A8C" />
        <Planet />
      </Suspense>
    </Canvas>
  );
}