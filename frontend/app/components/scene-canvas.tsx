"use client";

import { Environment, Float, OrbitControls, Sparkles } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function SceneCanvas() {
  return (
    <section className="relative min-h-[420px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-4 sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(248,113,113,0.35),_transparent_28%),radial-gradient(circle_at_70%_35%,_rgba(59,130,246,0.3),_transparent_26%),radial-gradient(circle_at_50%_80%,_rgba(34,197,94,0.18),_transparent_24%)]" />

      <div className="relative flex h-full flex-col gap-4 text-white">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm uppercase tracking-[0.25em] text-white/50">Preview</p>
            <p className="text-2xl font-semibold">Live 3D scene</p>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/60">
            Three.js
          </div>
        </div>

        <div className="relative min-h-[320px] flex-1 overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/80">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
            <color attach="background" args={["#020617"]} />
            <fog attach="fog" args={["#020617", 6, 14]} />
            <ambientLight intensity={0.8} />
            <directionalLight position={[4, 5, 3]} intensity={2.2} />
            <directionalLight position={[-4, -2, 2]} intensity={1} />

            <Float speed={1.4} rotationIntensity={1.1} floatIntensity={1.3}>
              <group>
                <mesh rotation={[0.55, 0.2, 0]}>
                  <torusKnotGeometry args={[1, 0.32, 220, 32]} />
                  <meshStandardMaterial color="#f472b6" roughness={0.2} metalness={0.65} />
                </mesh>
                <mesh position={[0, 0, 0]} rotation={[1.2, 0.4, 0.2]} scale={0.45}>
                  <icosahedronGeometry args={[1.2, 1]} />
                  <meshStandardMaterial color="#fde68a" roughness={0.15} metalness={0.7} />
                </mesh>
              </group>
            </Float>

            <Sparkles count={90} scale={[6, 6, 6]} size={2.2} speed={0.25} color="#f8fafc" />
            <Environment preset="city" />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
          </Canvas>

          <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-white/75 backdrop-blur">
            This is the first real 3D hero scaffold. We can swap the model, lighting, or interaction later without changing the page shell.
          </div>
        </div>
      </div>
    </section>
  );
}