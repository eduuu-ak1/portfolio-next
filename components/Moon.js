"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function makeMoonBumpTexture(size = 512) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  // Base mid-gray
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, size, size);

  // Fine surface noise
  const imageData = ctx.getImageData(0, 0, size, size);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const n = 128 + (Math.random() - 0.5) * 30;
    data[i] = n;
    data[i + 1] = n;
    data[i + 2] = n;
  }
  ctx.putImageData(imageData, 0, 0);

  // Larger craters: soft dark rim, lighter center-bottom to fake depth
  const craterCount = 26;
  for (let i = 0; i < craterCount; i++) {
    const cx = Math.random() * size;
    const cy = Math.random() * size;
    const r = 8 + Math.random() * 34;

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, "rgba(60,60,60,0.55)");
    grad.addColorStop(0.7, "rgba(90,90,90,0.35)");
    grad.addColorStop(0.85, "rgba(190,190,190,0.4)");
    grad.addColorStop(1, "rgba(128,128,128,0)");

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function MoonMesh() {
  const groupRef = useRef(null);
  const bumpMap = useMemo(() => makeMoonBumpTexture(), []);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Very subtle outer glow */}
      <mesh>
        <sphereGeometry args={[1.12, 32, 32]} />
        <meshBasicMaterial
          color="#a9c6cf"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Moon surface */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#b8ae9e"
          bumpMap={bumpMap}
          bumpScale={0.045}
          roughness={0.85}
          metalness={0.03}
        />
      </mesh>
    </group>
  );
}

export default function Moon() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.18} color="#4a5a66" />
        <directionalLight position={[4, 2, 3]} intensity={2} color="#fff8ec" />
        <MoonMesh />
      </Suspense>
    </Canvas>
  );
}