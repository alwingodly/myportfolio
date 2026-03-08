import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════
   BLACK HOLE — Gargantua / Interstellar style
   Reference: smooth lensing arch over the shadow + wide flat disk.
   • LensingArch   → half-torus (arc=π) dome arch over shadow
   • AccretionDisk → dense concentric flat rings in XZ plane
   • GravityParticles → spiral infalling matter
   • PolarJets     → faint relativistic jets
   Black hole sphere is STATIONARY — rings revolve.
═══════════════════════════════════════════════════════ */

const RINGS = [
  /* ── Innermost — searing white-yellow ── */
  [0.46,  0.492, '#ffffff', 1.00],
  [0.494, 0.518, '#fff8b0', 0.98],
  [0.520, 0.546, '#ffee00', 1.00],
  [0.548, 0.574, '#ffe800', 0.96],
  [0.576, 0.604, '#ffdd00', 1.00],
  [0.606, 0.634, '#ffd000', 0.96],
  [0.636, 0.666, '#ffcc00', 1.00],
  [0.668, 0.698, '#ffbb00', 0.96],
  [0.700, 0.732, '#ffaa00', 1.00],
  [0.734, 0.768, '#ffa000', 0.94],
  /* ── Mid zone — yellow-orange ── */
  [0.770, 0.808, '#ff9800', 1.00],
  [0.810, 0.852, '#ff9200', 0.96],
  [0.854, 0.900, '#ff8c00', 1.00],
  [0.902, 0.952, '#ff8600', 0.94],
  [0.954, 1.008, '#ff8000', 0.98],
  [1.010, 1.070, '#ff7a00', 0.90],
  [1.072, 1.138, '#ff7500', 0.94],
  [1.140, 1.214, '#ff7000', 0.86],
  [1.216, 1.298, '#ff6c00', 0.90],
  [1.300, 1.392, '#ff6800', 0.82],
  /* ── Outer zone — orange fading out ── */
  [1.394, 1.498, '#ff6200', 0.76],
  [1.500, 1.618, '#ff5c00', 0.68],
  [1.620, 1.754, '#ff5600', 0.60],
  [1.756, 1.908, '#ff5000', 0.52],
  [1.910, 2.082, '#f04800', 0.44],
  [2.084, 2.278, '#e04000', 0.36],
  [2.280, 2.500, '#d03800', 0.28],
  [2.502, 2.750, '#c03200', 0.20],
  [2.752, 3.030, '#b02c00', 0.13],
  [3.032, 3.340, '#9a2500', 0.07],
];

/* ══════════════════════════════════════════════════════
   LENSING ARCH — the gravitational lensing dome.
   Half-torus (arc = π) in the XY plane:
     starts at (+R, 0, 0) → peaks at (0, +R, 0) → ends at (−R, 0, 0)
   Seen from camera [0, 1.2, 11.5] it looks like a smooth glowing
   arch over the black hole — exactly like the reference image.
   A very slow Y-precession keeps it alive without distorting the look.
══════════════════════════════════════════════════════ */
function LensingArch() {
  /* Each layer: [radius, tube, radialSeg, tubularSeg, color, opacity] */
  const layers = [
    /* ── Razor-thin core line — pure white ── */
    [0.471, 0.006, 32, 360, '#ffffff', 1.00],
    /* ── Inner tight glow — warm white ── */
    [0.471, 0.016, 28, 320, '#fff6d0', 0.82],
    /* ── Mid glow — bright yellow ── */
    [0.471, 0.032, 24, 280, '#ffe800', 0.56],
    /* ── Outer spread — yellow-orange ── */
    [0.480, 0.055, 20, 260, '#ffcc00', 0.32],
    /* ── Wide halo — orange ── */
    [0.496, 0.085, 16, 240, '#ffaa00', 0.16],
    /* ── Far diffuse glow ── */
    [0.518, 0.120, 12, 220, '#ff7700', 0.07],
  ];

  return (
    <group renderOrder={5}>
      {layers.map(([R, tube, rSeg, tSeg, color, opacity], i) => (
        <mesh key={i}>
          {/* arc = Math.PI → upper half only, from +X through +Y to −X */}
          <torusGeometry args={[R, tube, rSeg, tSeg, Math.PI]} />
          <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Connection flares — where arch base meets the disk ── */
function ConnectionFlares() {
  const lRef  = useRef();
  const rRef  = useRef();
  const lgRef = useRef();
  const rgRef = useRef();

  useFrame(({ clock }) => {
    const t     = clock.elapsedTime;
    const pulse = 0.70 + Math.sin(t * 3.8) * 0.12;
    const sc    = 1.0 + Math.sin(t * 2.6) * 0.3;

    if (lRef.current)  { lRef.current.material.opacity  = pulse; lRef.current.scale.setScalar(sc); }
    if (rRef.current)  { rRef.current.material.opacity  = pulse; rRef.current.scale.setScalar(sc); }
    if (lgRef.current) lgRef.current.scale.setScalar(sc);
    if (rgRef.current) rgRef.current.scale.setScalar(sc);
  });

  return (
    <group renderOrder={8}>
      <mesh ref={lRef}  position={[ 0.471, 0, 0]}>
        <sphereGeometry args={[0.030, 10, 10]} />
        <meshBasicMaterial color="#fff8a0" transparent opacity={0.9} />
      </mesh>
      <mesh ref={rRef}  position={[-0.471, 0, 0]}>
        <sphereGeometry args={[0.030, 10, 10]} />
        <meshBasicMaterial color="#fff8a0" transparent opacity={0.9} />
      </mesh>
      <mesh ref={lgRef} position={[ 0.471, 0, 0]}>
        <sphereGeometry args={[0.060, 8, 8]} />
        <meshBasicMaterial color="#ffdd00" transparent opacity={0.20} />
      </mesh>
      <mesh ref={rgRef} position={[-0.471, 0, 0]}>
        <sphereGeometry args={[0.060, 8, 8]} />
        <meshBasicMaterial color="#ffdd00" transparent opacity={0.20} />
      </mesh>
    </group>
  );
}

/* ── Gravity spiral particles — matter being consumed ── */
function GravityParticles({ isMobile }) {
  const count = isMobile ? 180 : 420;
  const ref   = useRef();

  const state = useRef(null);
  if (!state.current) {
    state.current = Array.from({ length: count }, () => {
      const r = 1.4 + Math.random() * 3.0;
      return {
        r,
        theta:  Math.random() * Math.PI * 2,
        phi:    (Math.random() - 0.5) * 0.18,
        vTheta: 0.28 / Math.sqrt(r),
        infall: 0.00028 + Math.random() * 0.00032,
      };
    });
  }

  const positions = useMemo(() => new Float32Array(count * 3), [count]);

  useFrame(() => {
    const pts = state.current;
    const arr = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      p.r     -= p.infall;
      p.theta += p.vTheta / (p.r * 0.9);
      if (p.r < 0.46) {
        p.r     = 1.8 + Math.random() * 2.8;
        p.theta = Math.random() * Math.PI * 2;
        p.phi   = (Math.random() - 0.5) * 0.18;
        p.vTheta = 0.28 / Math.sqrt(p.r);
        p.infall = 0.00028 + Math.random() * 0.00032;
      }
      arr[i * 3]     = Math.cos(p.theta) * p.r;
      arr[i * 3 + 1] = Math.sin(p.phi)   * p.r * 0.07;
      arr[i * 3 + 2] = Math.sin(p.theta) * p.r;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} renderOrder={3}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.022} color="#ffbb00" transparent opacity={0.70} sizeAttenuation />
    </points>
  );
}

/* ── Polar jets ── */
function PolarJets() {
  const topRef = useRef();
  const botRef = useRef();

  const jets = useMemo(() => {
    const N   = 60;
    const top = new Float32Array(N * 3);
    const bot = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const sp = Math.random() * 0.055;
      const a  = Math.random() * Math.PI * 2;
      const h  = 0.5 + Math.random() * 2.0;
      top[i*3]   = Math.cos(a) * sp * (h / 2.5);
      top[i*3+1] = h;
      top[i*3+2] = Math.sin(a) * sp * (h / 2.5);
      bot[i*3]   = top[i*3];
      bot[i*3+1] = -h;
      bot[i*3+2] = top[i*3+2];
    }
    return { top, bot };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (topRef.current) topRef.current.material.opacity = 0.16 + Math.sin(t * 1.8) * 0.05;
    if (botRef.current) botRef.current.material.opacity = 0.16 + Math.sin(t * 1.8 + 0.9) * 0.05;
  });

  return (
    <group>
      <points ref={topRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[jets.top, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.026} color="#ffcc44" transparent opacity={0.16} sizeAttenuation />
      </points>
      <points ref={botRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[jets.bot, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.026} color="#ffcc44" transparent opacity={0.16} sizeAttenuation />
      </points>
    </group>
  );
}

/* ── Event horizon — black hole is STATIONARY ── */
function BlackHoleShadow() {
  return (
    <group>
      {/* Lensing arch — the glowing dome over the shadow */}
      <LensingArch />

      {/* Arch-base ↔ disk connection flares */}
      <ConnectionFlares />

      {/* Black void sphere — covers everything inside */}
      <mesh renderOrder={30}>
        <sphereGeometry args={[0.450, 64, 64]} />
        <meshBasicMaterial color="#000000" depthWrite={true} depthTest={true} />
      </mesh>
      <mesh renderOrder={32}>
        <sphereGeometry args={[0.447, 48, 48]} />
        <meshBasicMaterial color="#000000" depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ── Accretion disk — flat concentric rings in XZ plane ── */
function AccretionDisk({ isMobile }) {
  const ref = useRef();
  useFrame(() => { ref.current.rotation.y += 0.006; });

  const seg = isMobile ? 120 : 240;

  return (
    <group ref={ref}>
      {RINGS.map(([inner, outer, color, opacity], i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[inner, outer, seg, 1]} />
          <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {/* Warm inner glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.44, 2.00, 128, 1]} />
        <meshBasicMaterial color="#ffcc00" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
      {/* Outer sweep */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.00, 4.20, 128, 1]} />
        <meshBasicMaterial color="#ff4400" transparent opacity={0.04} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* ── Stars — gravitationally pulled inward ── */
function Stars({ count, spread }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i*3]   = (Math.random() - 0.5) * spread;
      arr[i*3+1] = (Math.random() - 0.5) * spread * 0.38;
      arr[i*3+2] = (Math.random() - 0.5) * spread * 0.28;
    }
    return arr;
  }, [count, spread]);

  const starState = useRef(null);
  if (!starState.current) {
    starState.current = Array.from({ length: count }, (_, i) => ({
      x: positions[i*3], y: positions[i*3+1], z: positions[i*3+2],
      vx: 0, vy: 0, vz: 0,
    }));
  }

  useFrame(() => {
    const arr = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < starState.current.length; i++) {
      const p  = starState.current[i];
      const r2 = p.x*p.x + p.y*p.y + p.z*p.z;
      const r  = Math.sqrt(r2);
      const f  = 0.00012 / r2;
      p.vx -= (p.x/r)*f;  p.vy -= (p.y/r)*f;  p.vz -= (p.z/r)*f;
      p.x  += p.vx;        p.y  += p.vy;        p.z  += p.vz;
      if (r < 1.2) {
        p.x = (Math.random()-0.5)*spread; p.y = (Math.random()-0.5)*spread*0.38;
        p.z = (Math.random()-0.5)*spread*0.28; p.vx=0; p.vy=0; p.vz=0;
      }
      arr[i*3]=p.x; arr[i*3+1]=p.y; arr[i*3+2]=p.z;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.042} color="#fff2ee" transparent opacity={0.38} sizeAttenuation />
    </points>
  );
}

/* ── Scene: float + mouse parallax ── */
function Scene({ isMobile, isTablet }) {
  const ref   = useRef();
  const sc    = isMobile ? 0.68 : isTablet ? 0.88 : 1.12;
  const baseX = isMobile ? 0    : isTablet ? 0.28  : 0.65;
  /* On mobile push black hole into the lower half of the viewport */
  const baseY = isMobile ? -2.2 : isTablet ? -0.3  : 0;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    ref.current.position.x = baseX + Math.sin(t * 0.32) * 0.10;
    ref.current.position.y = baseY + Math.sin(t * 0.24) * 0.07 + Math.cos(t * 0.41) * 0.04;
  });

  return (
    <group ref={ref} position={[baseX, 0, 0]} scale={sc}>
      <BlackHoleShadow />
      <AccretionDisk isMobile={isMobile} />
      <GravityParticles isMobile={isMobile} />
      <PolarJets />
    </group>
  );
}

/* ── Canvas export ── */
export default function ThreeScene() {
  const getBreakpoint = () => {
    if (typeof window === 'undefined') return { isMobile: false, isTablet: false };
    const w = window.innerWidth;
    return { isMobile: w < 600, isTablet: w >= 600 && w < 1024 };
  };

  const [bp, setBp] = useState(getBreakpoint);

  useEffect(() => {
    const onResize = () => setBp(getBreakpoint());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { isMobile, isTablet } = bp;

  return (
    <Canvas
      camera={{ position: [0, 1.2, 11.5], fov: isMobile ? 55 : 46 }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: true }}
      performance={{ min: 0.5 }}
    >
      <Stars count={isMobile ? 80 : isTablet ? 140 : 220} spread={isMobile ? 15 : 24} />
      <Scene isMobile={isMobile} isTablet={isTablet} />
    </Canvas>
  );
}
