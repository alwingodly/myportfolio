import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function BlackHole({ count = 4000 }) {
  const pointsRef = useRef();

  // Each particle has a fixed orbital radius + angle, angular velocity scales with 1/sqrt(r)
  const { positions, colors, radii, thetas, yOffsets, omegas } = useMemo(() => {
    const pos    = new Float32Array(count * 3);
    const col    = new Float32Array(count * 3);
    const radii  = new Float32Array(count);
    const thetas = new Float32Array(count);
    const yOff   = new Float32Array(count);
    const omegas = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Concentrate particles closer to center with power distribution
      const r = 0.25 + Math.pow(Math.random(), 1.4) * 4.0;
      radii[i]  = r;
      thetas[i] = Math.random() * Math.PI * 2;
      yOff[i]   = (Math.random() - 0.5) * 0.35 * (r / 4.0);
      omegas[i] = 0.6 / Math.sqrt(r); // Keplerian angular velocity

      // Seed initial positions
      pos[i * 3]     = r * Math.cos(thetas[i]);
      pos[i * 3 + 1] = yOff[i];
      pos[i * 3 + 2] = r * Math.sin(thetas[i]);

      // Color gradient: inner = bright warm white, outer = deep orange
      const t = 1 - r / 4.25; // 0 at edge, 1 at center
      col[i * 3]     = 0.85 + t * 0.15;       // R: 0.85 → 1.0
      col[i * 3 + 1] = 0.47 + t * 0.40;       // G: 0.47 → 0.87
      col[i * 3 + 2] = 0.34 + t * 0.30;       // B: 0.34 → 0.64
    }

    return { positions: pos, colors: col, radii, thetas, yOffsets: yOff, omegas };
  }, [count]);

  useFrame((_, delta) => {
    const pos = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      thetas[i] += omegas[i] * delta;
      pos[i * 3]     = radii[i] * Math.cos(thetas[i]);
      pos[i * 3 + 1] = yOffsets[i];
      pos[i * 3 + 2] = radii[i] * Math.sin(thetas[i]);
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors,    3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
      />
    </points>
  );
}

// Dark event horizon sphere
function EventHorizon() {
  return (
    <mesh>
      <sphereGeometry args={[0.22, 16, 16]} />
      <meshBasicMaterial color="#0a0705" />
    </mesh>
  );
}

export default function BlackHoleScene() {
  return (
    <Canvas
      camera={{ position: [0, 3.5, 5], fov: 60 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.65,
      }}
      gl={{ antialias: true, alpha: true }}
    >
      <BlackHole count={4000} />
      <EventHorizon />
    </Canvas>
  );
}
