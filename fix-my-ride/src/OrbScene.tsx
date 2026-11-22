import { Float, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

function GlassArtifact() {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.16;
    group.current.rotation.x += (state.pointer.y * 0.12 - group.current.rotation.x) * 0.025;
    group.current.rotation.z += (state.pointer.x * 0.08 - group.current.rotation.z) * 0.025;
  });

  return (
    <group ref={group}>
      <Float speed={1.25} floatIntensity={0.35} rotationIntensity={0.22}>
        <mesh scale={1.08}>
          <icosahedronGeometry args={[1, 3]} />
          <meshPhysicalMaterial
            color="#ff879a"
            metalness={0.15}
            roughness={0.08}
            transmission={0.86}
            thickness={1.6}
            ior={1.32}
            clearcoat={1}
            clearcoatRoughness={0.07}
            transparent
            opacity={0.94}
          />
        </mesh>
        <mesh scale={0.63} rotation={[0.2, 0.7, 0.25]}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#ffe3e5"
            metalness={0.78}
            roughness={0.18}
            emissive="#8c1738"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>

      <mesh rotation={[Math.PI / 2.35, 0.12, 0.16]}>
        <torusGeometry args={[1.58, 0.012, 12, 180]} />
        <meshBasicMaterial color="#ff8da2" transparent opacity={0.82} />
      </mesh>
      <mesh rotation={[1.1, -0.65, 0.48]}>
        <torusGeometry args={[1.8, 0.007, 10, 180]} />
        <meshBasicMaterial color="#ffc0ca" transparent opacity={0.58} />
      </mesh>
      <mesh position={[1.13, 0.62, 0.34]}>
        <sphereGeometry args={[0.095, 24, 24]} />
        <meshStandardMaterial color="#ff7b94" emissive="#ff284e" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[-1.32, -0.55, -0.15]}>
        <sphereGeometry args={[0.055, 20, 20]} />
        <meshStandardMaterial color="#ffd0ac" emissive="#ff745d" emissiveIntensity={1.1} />
      </mesh>
    </group>
  );
}

export default function OrbScene() {
  return (
    <div className="orb-scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 42 }}
        dpr={[1, 1.6]}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[3, 2, 4]} intensity={12} color="#ff536f" />
        <pointLight position={[-3, -2, 1]} intensity={7} color="#ffb0bd" />
        <directionalLight position={[0, 4, -3]} intensity={2.4} color="#fff1dd" />
        <GlassArtifact />
        <Sparkles count={74} scale={5.3} size={2} speed={0.32} color="#ffd1d8" opacity={0.72} />
      </Canvas>
    </div>
  );
}
