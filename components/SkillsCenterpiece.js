"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function createStarShape(outerRadius, innerRadius, points) {
  const shape = new THREE.Shape();
  const step = Math.PI / points;
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = i * step - Math.PI / 2;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

const metalProps = {
  color: "#F2F1F5",
  metalness: 1,
  roughness: 0.1,
  clearcoat: 1,
  clearcoatRoughness: 0.05,
  envMapIntensity: 1.8,
};

function RingAndStar() {
  const groupRef = useRef(null);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  const starGeometry = useMemo(() => {
    const shape = createStarShape(0.55, 0.22, 4);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 3,
    });
    geo.center();
    return geo;
  }, []);

  return (
    <group
      ref={groupRef}
      rotation={[THREE.MathUtils.degToRad(25), 0, THREE.MathUtils.degToRad(25)]}
    >
      <mesh>
        <torusGeometry args={[1.6, 0.045, 32, 200]} />
        <meshPhysicalMaterial {...metalProps} />
      </mesh>

      <mesh geometry={starGeometry} position={[0, -0.9, 0.3]} rotation={[0, 0, 0.3]}>
        <meshPhysicalMaterial {...metalProps} />
      </mesh>
    </group>
  );
}

export default function SkillsCenterpiece() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 42 }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.15} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} color="#FFFFFF" />
        <directionalLight position={[-4, -1, -3]} intensity={0.5} color="#FFFFFF" />
        <Environment preset="studio" />
        <RingAndStar />
      </Suspense>
    </Canvas>
  );
}