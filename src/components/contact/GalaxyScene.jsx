import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function Galaxy({ count = 7000, arms = 3 }) {
  const groupRef = useRef();

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const arm        = i % arms;
      const armAngle   = (arm / arms) * Math.PI * 2;

      // Radius: power distribution for dense core
      const radius     = Math.pow(Math.random(), 0.6) * 5.5;
      const spinAngle  = radius * 0.9;            // spiral tightness
      const branchAngle = armAngle + spinAngle;

      // Scatter increases with radius
      const scatter = (Math.random() - 0.5) * 0.5 * Math.pow(radius, 0.8);

      pos[i * 3]     = Math.cos(branchAngle) * radius + scatter;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.25 * (radius / 5.5 + 0.1);
      pos[i * 3 + 2] = Math.sin(branchAngle) * radius + scatter;

      // Color: bright orange core → dim amber edge
      const t = 1 - radius / 5.5;               // 1 at center, 0 at edge
      col[i * 3]     = 0.55 + t * 0.45;         // R
      col[i * 3 + 1] = 0.28 + t * 0.42;         // G
      col[i * 3 + 2] = 0.10 + t * 0.25;         // B
    }

    return { positions: pos, colors: col };
  }, [count, arms]);

  useFrame((_, delta) => {
    groupRef.current.rotation.y += delta * 0.04;
  });

  return (
    <group ref={groupRef} rotation={[0.4, 0, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color"    args={[colors,    3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export default function GalaxyScene() {
  return (
    <Canvas
      camera={{ position: [0, 4, 8], fov: 65 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.5,
      }}
      gl={{ antialias: true, alpha: true }}
    >
      <Galaxy count={7000} arms={3} />
    </Canvas>
  );
}
