'use client'

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════════
   HYPER-REAL BLACK HOLE — raymarched gravitational lensing
   Each pixel fires a ray that is bent by the Schwarzschild geodesic
   ( u'' + u = 1.5 u², horizon normalised to r = 1 ), so the accretion
   disk genuinely arcs up and over the shadow, the photon ring forms on
   its own, and Doppler beaming + gravitational redshift shade the gas.
   The whole thing renders on a fullscreen quad with its own virtual
   camera — the R3F camera is bypassed.
═══════════════════════════════════════════════════════════════ */

const pointer = { x: 0, y: 0 };   // window pointer (canvas is pointer-events:none)

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;

  const float RS       = 1.0;     // event horizon
  const float DISK_IN  = 3.0;     // inner edge (≈ ISCO)
  const float DISK_OUT = 12.0;    // outer edge
  const int   STEPS    = 100;

  float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1,0)), u.x),
               mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
  }
  float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++){ v += a * noise(p); p = p * 2.03 + 1.7; a *= 0.5; } return v; }

  // distant starfield
  vec3 stars(vec3 dir){
    vec2 uv = vec2(atan(dir.z, dir.x), asin(clamp(dir.y, -1.0, 1.0)));
    float s = 0.0;
    for (int i = 0; i < 3; i++){
      float sc = 110.0 + float(i) * 160.0;
      s += smoothstep(0.9976, 1.0, hash(floor(uv * sc)));
    }
    float neb = fbm(uv * 3.0);
    return vec3(s) * vec3(1.0, 0.95, 0.85) + vec3(0.03, 0.04, 0.07) * neb * neb;
  }

  // ACES filmic tonemap — cinematic highlight rolloff (reads as bloom)
  vec3 aces(vec3 x){
    const float a = 2.51, b = 0.03, c = 2.43, d = 0.59, e = 0.14;
    return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
  }

  vec3 diskColor(vec3 hit, vec3 camPos){
    float r  = length(hit.xz);
    float fr = clamp((r - DISK_IN) / (DISK_OUT - DISK_IN), 0.0, 1.0);

    // blackbody-ish temperature ramp (warm-gold theme)
    vec3 hot  = vec3(1.00, 0.96, 0.88);
    vec3 mid  = vec3(1.00, 0.60, 0.16);
    vec3 cool = vec3(0.55, 0.11, 0.02);
    vec3 col  = mix(hot, mid, smoothstep(0.0, 0.30, fr));
    col       = mix(col, cool, smoothstep(0.30, 1.0, fr));

    float bright = pow(1.0 - fr, 1.5) + 0.04;
    bright *= smoothstep(0.0, 0.06, fr) * smoothstep(1.0, 0.72, fr);   // soft edges

    // turbulent gas, differential (Keplerian) rotation — inner faster
    float ang  = atan(hit.z, hit.x);
    float spin = uTime * (1.4 / pow(r, 1.5));
    float gas  = fbm(vec2(ang * 2.0 + spin * 2.0, r * 0.55 - spin * 0.4));
    float fine = fbm(vec2(ang * 6.0 - spin, r * 1.6));
    bright *= (0.45 + 1.25 * gas) * (0.8 + 0.4 * fine);

    // gravitational redshift / time dilation near the inner edge
    float gz = sqrt(max(1.0 - RS / r, 0.05));
    bright *= gz;
    col = mix(col * vec3(1.3, 0.7, 0.4), col, gz);

    // relativistic Doppler beaming
    vec3  vdir  = normalize(cross(vec3(0.0, 1.0, 0.0), hit));
    float beta  = 0.50 * sqrt(DISK_IN / r);
    vec3  toCam = normalize(camPos - hit);
    float dop   = 1.0 / max(1.0 - beta * dot(vdir, toCam), 0.06);
    bright *= pow(dop, 2.8);
    col = mix(col, col * vec3(0.75, 0.86, 1.25), clamp((dop - 1.0) * 0.5, 0.0, 0.6));
    col = mix(col, col * vec3(1.30, 0.70, 0.42), clamp((1.0 - dop) * 0.5, 0.0, 0.6));

    return col * bright;
  }

  void main(){
    float aspect = uResolution.x / uResolution.y;
    vec2  p = (vUv - 0.5);
    p.x *= aspect;
    p.x -= 0.12;   // bias the hole to the right, clear of the canvas' left fade

    // virtual camera: near edge-on, slow drift + mouse look-around
    float t       = uTime * 0.02 + uMouse.x * 0.25;
    float incl    = 0.13 + uMouse.y * 0.10 + 0.03 * sin(uTime * 0.04);
    float camDist = 13.0;
    vec3  camPos  = vec3(sin(t) * camDist, sin(incl) * camDist, cos(t) * camDist);
    vec3  fw = normalize(-camPos);
    vec3  rt = normalize(cross(vec3(0.0, 1.0, 0.0), fw));
    vec3  up = cross(fw, rt);
    vec3  dir = normalize(fw + p.x * rt * 0.85 + p.y * up * 0.85);

    vec3  pos = camPos;
    vec3  vel = dir;
    vec3  col = vec3(0.0);
    float transmit = 1.0;
    bool  captured = false;

    vec3  hh = cross(pos, vel);   // angular momentum (conserved)
    float h2 = dot(hh, hh);

    for (int i = 0; i < STEPS; i++){
      float r = length(pos);
      if (r < RS * 1.02){ captured = true; break; }
      if (r > 70.0) break;

      float dt = clamp(r * 0.09, 0.018, 0.7);
      vec3  prev = pos;

      // Schwarzschild light bending
      vec3 acc = -1.5 * h2 * pos / pow(dot(pos, pos), 2.5);
      vel += acc * dt;
      pos += vel * dt;

      // accumulate every disk-plane crossing (front + lensed far side)
      if (prev.y * pos.y < 0.0){
        float f   = prev.y / (prev.y - pos.y);
        vec3  hit = mix(prev, pos, f);
        float rr  = length(hit.xz);
        if (rr > DISK_IN && rr < DISK_OUT){
          col      += diskColor(hit, camPos) * transmit;
          transmit *= 0.5;
          if (transmit < 0.02) break;
        }
      }
    }

    vec3 outc = col;
    if (!captured) outc += stars(normalize(vel)) * transmit;

    outc *= 1.1;
    outc = aces(outc);
    outc = pow(outc, vec3(0.95));

    // alpha from luminance so the void reads as the dark page behind it
    float lum   = max(max(outc.r, outc.g), outc.b);
    float alpha = clamp(lum * 1.35, 0.0, 1.0);
    gl_FragColor = vec4(outc, alpha);
  }
`;

function BlackHole() {
  const uniforms = useMemo(() => ({
    uTime:       { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uMouse:      { value: new THREE.Vector2(0, 0) },
  }), []);

  const m = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uResolution.value.set(state.size.width, state.size.height);
    // ease toward the pointer for weighty parallax
    m.current.x += (pointer.x - m.current.x) * 0.05;
    m.current.y += (pointer.y - m.current.y) * 0.05;
    uniforms.uMouse.value.set(m.current.x, m.current.y);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function ThreeScene({ active = true }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onMq = () => setReduced(mq.matches);
    mq.addEventListener?.('change', onMq);
    return () => mq.removeEventListener?.('change', onMq);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth)  * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  // Animate only while visible; render a single static frame under reduced-motion.
  const frameloop = reduced ? 'demand' : active ? 'always' : 'never';

  return (
    <Canvas
      frameloop={frameloop}
      dpr={1}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <BlackHole />
    </Canvas>
  );
}
