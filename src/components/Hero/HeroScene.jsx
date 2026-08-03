import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sparkles } from "@react-three/drei";
import styles from "./HeroScene.module.css";

const ACCENT = "#e0a83c";

const reduced =
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const lerp = (a, b, t) => a + (b - a) * t;

function Orb() {
  const tilt = useRef();
  const spin = useRef();

  useFrame((state, delta) => {
    if (!reduced && spin.current) {
      spin.current.rotation.x += delta * 0.16;
      spin.current.rotation.y += delta * 0.24;
    }
    if (tilt.current) {
      tilt.current.rotation.x = lerp(tilt.current.rotation.x, state.pointer.y * 0.22, 0.06);
      tilt.current.rotation.y = lerp(tilt.current.rotation.y, state.pointer.x * 0.42, 0.06);
    }
  });

  return (
    <group ref={tilt}>
      <group ref={spin}>
        <mesh>
          <icosahedronGeometry args={[1.55, 1]} />
          <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.35} wireframe />
        </mesh>
        <mesh scale={0.6}>
          <icosahedronGeometry args={[1.55, 1]} />
          <meshStandardMaterial color="#131316" emissive={ACCENT} emissiveIntensity={0.55} transparent opacity={0.9} roughness={0.3} metalness={0.6} />
        </mesh>
      </group>
      <Sparkles count={90} scale={7} size={2} speed={reduced ? 0 : 0.4} opacity={0.5} color={ACCENT} />
    </group>
  );
}

export default function HeroScene() {
  const wrap = useRef(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!wrap.current) return undefined;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.05 });
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className={styles.canvas} aria-hidden="true">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 4, 5]} intensity={28} color={ACCENT} />
        <Orb />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={!reduced}
          autoRotateSpeed={0.7}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.6}
        />
      </Canvas>
    </div>
  );
}