"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { SceneFallback } from "@/components/hero/scene-fallback";
import { useTheme } from "@/components/theme-provider";

type ScenePalette = {
  shell: string;
  shellEmissive: string;
  shellEmissiveIntensity: number;
  shellMetalness: number;
  shellRoughness: number;
  wire: string;
  wireOpacity: number;
  ringViolet: string;
  ringVioletOpacity: number;
  ringCyan: string;
  ringCyanOpacity: number;
  sparkA: string;
  sparkB: string;
  dust: string;
  keyLight: string;
  cyanLight: string;
  violetLight: string;
  ambient: number;
  keyIntensity: number;
  cyanIntensity: number;
  violetIntensity: number;
};

const DARK_PALETTE: ScenePalette = {
  shell: "#171329",
  shellEmissive: "#43208f",
  shellEmissiveIntensity: 0.38,
  shellMetalness: 0.92,
  shellRoughness: 0.18,
  wire: "#8fe6ff",
  wireOpacity: 0.12,
  ringViolet: "#9b6bff",
  ringVioletOpacity: 0.55,
  ringCyan: "#4de3ff",
  ringCyanOpacity: 0.38,
  sparkA: "#b8f6ff",
  sparkB: "#c4b5ff",
  dust: "#8beeff",
  keyLight: "#c6e6ff",
  cyanLight: "#4de3ff",
  violetLight: "#9b6bff",
  ambient: 0.45,
  keyIntensity: 1.8,
  cyanIntensity: 48,
  violetIntensity: 42,
};

const LIGHT_PALETTE: ScenePalette = {
  shell: "#dbe4f2",
  shellEmissive: "#7f6ad8",
  shellEmissiveIntensity: 0.2,
  shellMetalness: 0.7,
  shellRoughness: 0.3,
  wire: "#2c6fa8",
  wireOpacity: 0.22,
  ringViolet: "#7956c5",
  ringVioletOpacity: 0.5,
  ringCyan: "#087ea4",
  ringCyanOpacity: 0.42,
  sparkA: "#0b6f8f",
  sparkB: "#6b53b8",
  dust: "#4b90b0",
  keyLight: "#ffffff",
  cyanLight: "#4aa6c6",
  violetLight: "#a78bfa",
  ambient: 0.7,
  keyIntensity: 1.5,
  cyanIntensity: 28,
  violetIntensity: 24,
};

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

function Dust({ reduced, palette }: { reduced: boolean; palette: ScenePalette }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 240;
    const array = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const radius = 2.3 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      array[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      array[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.8;
      array[index * 3 + 2] = radius * Math.cos(phi);
    }
    return array;
  }, []);

  useFrame((_, delta) => {
    if (!reduced && points.current) points.current.rotation.y += delta * 0.025;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.026}
        color={palette.dust}
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Sculpture({ reduced, palette }: { reduced: boolean; palette: ScenePalette }) {
  const group = useRef<THREE.Group>(null);
  const auto = useRef(0);

  useFrame((state, delta) => {
    if (!group.current) return;
    const dt = Math.min(delta, 0.05);
    auto.current += dt * 0.16;

    const targetY = auto.current + state.pointer.x * 0.32;
    const targetX = state.pointer.y * -0.2;

    if (reduced) return;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 2.4, dt);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 2.4, dt);
  });

  return (
    <group ref={group}>
      <mesh castShadow>
        <icosahedronGeometry args={[1.32, 14]} />
        <meshStandardMaterial
          color={palette.shell}
          emissive={palette.shellEmissive}
          emissiveIntensity={palette.shellEmissiveIntensity}
          metalness={palette.shellMetalness}
          roughness={palette.shellRoughness}
        />
      </mesh>

      <mesh scale={1.03}>
        <icosahedronGeometry args={[1.32, 2]} />
        <meshBasicMaterial color={palette.wire} wireframe transparent opacity={palette.wireOpacity} />
      </mesh>

      <mesh rotation={[Math.PI / 2.4, 0.35, 0]} scale={1.78}>
        <torusGeometry args={[1, 0.0035, 8, 220]} />
        <meshBasicMaterial color={palette.ringViolet} transparent opacity={palette.ringVioletOpacity} />
      </mesh>

      <mesh rotation={[Math.PI / 1.7, -0.5, 0.6]} scale={2.05}>
        <torusGeometry args={[1, 0.0028, 8, 220]} />
        <meshBasicMaterial color={palette.ringCyan} transparent opacity={palette.ringCyanOpacity} />
      </mesh>

      <mesh position={[1.98, 0.45, 0.2]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={palette.sparkA} />
      </mesh>

      <mesh position={[-1.75, -0.7, 0.6]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color={palette.sparkB} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState(false);
  const [inView, setInView] = useState(true);
  const reduced = usePrefersReducedMotion();
  const { theme } = useTheme();
  const palette = theme === "light" ? LIGHT_PALETTE : DARK_PALETTE;

  useEffect(() => {
    setSupported(supportsWebGL());
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="absolute inset-0">
      {supported ? (
        <Canvas
          camera={{ position: [0, 0, 5.4], fov: 42 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          frameloop={reduced || !inView ? "demand" : "always"}
          aria-hidden="true"
        >
          <Suspense fallback={null}>
            <ambientLight intensity={palette.ambient} />
            <directionalLight position={[4, 5, 6]} intensity={palette.keyIntensity} color={palette.keyLight} />
            <pointLight position={[4, 2, 3]} intensity={palette.cyanIntensity} color={palette.cyanLight} distance={16} />
            <pointLight position={[-4, -1.5, 2]} intensity={palette.violetIntensity} color={palette.violetLight} distance={16} />
            <Float
              speed={reduced ? 0 : 1.1}
              rotationIntensity={reduced ? 0 : 0.18}
              floatIntensity={reduced ? 0 : 0.55}
            >
              <Sculpture reduced={reduced} palette={palette} />
            </Float>
            <Dust reduced={reduced} palette={palette} />
          </Suspense>
        </Canvas>
      ) : (
        <SceneFallback />
      )}
    </div>
  );
}
