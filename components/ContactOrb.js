"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

function GlowOrb({ scale = 1 }) {
  const groupRef = useRef(null);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Soft glow shell */}
      <mesh>
        <sphereGeometry args={[1.15, 32, 32]} />
        <meshBasicMaterial
          color="#8B7CF6"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Wireframe core */}
      <mesh>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshBasicMaterial
          color="#8B7CF6"
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Solid inner glow point */}
      <mesh>
        <sphereGeometry args={[0.4, 24, 24]} />
        <meshBasicMaterial color="#F2F1F5" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

export default function ContactOrb({ scale = 1 }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 2, 2]} intensity={1} color="#8B7CF6" />
        <GlowOrb scale={scale} />
      </Suspense>
    </Canvas>
  );
}