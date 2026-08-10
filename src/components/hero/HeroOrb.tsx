"use client";

import { useRef } from "react";
import { useFrame, type RootState } from "@react-three/fiber";
import type { Mesh } from "three";

/** Decorative wireframe orb — mouse parallax + slow rotation. */
export function HeroOrb({ active }: { active: boolean }) {
  const mesh = useRef<Mesh>(null);
  const ring = useRef<Mesh>(null);

  useFrame((state: RootState, delta: number) => {
    if (!active) return;
    const t = state.clock.elapsedTime;
    const px = state.pointer.x;
    const py = state.pointer.y;

    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.12;
      mesh.current.rotation.y += delta * 0.18;
      mesh.current.position.x += (px * 0.4 - mesh.current.position.x) * 0.06;
      mesh.current.position.y += (py * 0.28 - mesh.current.position.y) * 0.06;
      const s = 1 + Math.sin(t * 0.7) * 0.02;
      mesh.current.scale.setScalar(s);
    }

    if (ring.current) {
      ring.current.rotation.z -= delta * 0.08;
      ring.current.rotation.x = Math.PI / 2.4 + py * 0.12;
      ring.current.rotation.y = px * 0.15;
    }
  });

  return (
    <group>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.45, 1]} />
        <meshBasicMaterial
          color="#c4d4cc"
          wireframe
          transparent
          opacity={0.28}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={ring} scale={1.85}>
        <torusGeometry args={[1, 0.004, 8, 96]} />
        <meshBasicMaterial
          color="#a3a3a3"
          transparent
          opacity={0.22}
          depthWrite={false}
        />
      </mesh>
      {/* Soft core glow as low-poly sphere — no postprocessing */}
      <mesh scale={0.55}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          color="#c4d4cc"
          transparent
          opacity={0.05}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
