"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { DynamicModel } from "../components/DynamicModel";
import Link from "next/link";
import * as THREE from "three";

export default function ExplorePage() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* 3D Canvas takes full screen */}
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        <Stage environment="city" intensity={0.6}>
          <DynamicModel url="/model/InteriorTest.glb" />
        </Stage>
        <OrbitControls makeDefault />
      </Canvas>

      {/* Navigation back to home */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-10 px-6 py-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur text-white/80 hover:text-white font-semibold transition-all border border-white/20"
      >
        ← Back Home
      </Link>

      {/* Info panel */}
      <div className="absolute bottom-6 right-6 z-10 max-w-xs rounded-2xl bg-black/60 backdrop-blur border border-white/20 p-6">
        <h3 className="text-white font-bold text-lg mb-2">
          Explore the Garden 🌸
        </h3>
        <p className="text-white/70 text-sm leading-relaxed">
          Use your mouse to orbit around the scene. This is an interactive 3D
          preview of what&apos;s growing in the Hearts Garden.
        </p>
      </div>
    </main>
  );
}
