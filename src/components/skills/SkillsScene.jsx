import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

// Slowly rotating wireframe torus knot
function TorusKnot() {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 0.18;
    ref.current.rotation.y += delta * 0.12;
    ref.current.rotation.z += delta * 0.08;
  });

  return (
    <group ref={ref}>
      {/* Outer wireframe */}
      <mesh>
        <torusKnotGeometry args={[1.2, 0.38, 128, 16, 2, 3]} />
        <meshBasicMaterial color="#D97757" wireframe transparent opacity={0.45} />
      </mesh>
      {/* Inner subtle fill for depth */}
      <mesh scale={0.88}>
        <torusKnotGeometry args={[1.2, 0.38, 64, 8, 2, 3]} />
        <meshBasicMaterial color="#E69872" wireframe transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

// Small drifting particles
function Particles({ count = 60 }) {
  const ref = useRef();

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      vel[i * 3]     = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
    }
    return { positions: pos, velocities: vel };
  }, [count]);

  useFrame(() => {
    const pos = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3]     += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      if (pos[i * 3] > 4)      pos[i * 3] = -4;
      if (pos[i * 3] < -4)     pos[i * 3] = 4;
      if (pos[i * 3 + 1] > 4)  pos[i * 3 + 1] = -4;
      if (pos[i * 3 + 1] < -4) pos[i * 3 + 1] = 4;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#D97757" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export default function SkillsScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{
        position: 'absolute',
        top: 0,
        right: '-5%',
        width: '45%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.7,
      }}
      gl={{ antialias: true, alpha: true }}
    >
      <TorusKnot />
      <Particles count={60} />
    </Canvas>
  );
}
