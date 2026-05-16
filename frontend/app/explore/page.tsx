"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { DynamicModel } from "../components/DynamicModel";
import ItemModal from "../components/ItemModal";
import Link from "next/link";
import * as THREE from "three";
import { useState } from "react";

const interactiveItemNames = ["Item_Lamp"];

export default function ExplorePage() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* 3D Canvas takes full screen */}
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        <Stage environment="city" intensity={0.6}>
          <DynamicModel
            url="/model/InteriorTest.glb"
            onSelect={(name) => {
              if (interactiveItemNames.includes(name)) {
                setSelectedItem(name);
              }
            }}
            interactiveItemNames={interactiveItemNames}
          />
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

      <div className="pointer-events-none absolute left-6 bottom-6 z-10 rounded-full border border-pink-300/25 bg-pink-500/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-pink-100/90 shadow-lg shadow-pink-500/10 sm:hidden">
        Tap the glowing item
      </div>

      <ItemModal
        isOpen={selectedItem !== null}
        itemName={selectedItem ?? ""}
        onClose={() => setSelectedItem(null)}
      />
    </main>
  );
}
