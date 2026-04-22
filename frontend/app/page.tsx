import SceneCanvas from "./components/scene-canvas";
import WaitlistForm from "./components/waitlist-form";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10 sm:px-10 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.24),_transparent_34%),radial-gradient(circle_at_20%_20%,_rgba(244,114,182,0.25),_transparent_28%),radial-gradient(circle_at_80%_30%,_rgba(251,191,36,0.22),_transparent_24%),linear-gradient(135deg,_#0f172a_0%,_#111827_48%,_#020617_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

      <section className="relative grid w-full max-w-6xl gap-8 rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-12">
        <div className="flex flex-col justify-between gap-8">
          <div className="space-y-6">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium tracking-[0.2em] text-white/80 uppercase">
              Hearts Garden
            </p>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Coming soon.
                <span className="block text-white/70">Something atmospheric is growing here.</span>
              </h1>
              <p className="max-w-xl text-base leading-7 text-white/70 sm:text-lg">
                The main page is now a temporary coming-soon screen while the rest of the experience is being built.
                The 3D preview on the right is powered by Three.js through <span className="text-white">@react-three/fiber</span> and <span className="text-white">@react-three/drei</span>.
              </p>
            </div>
          </div>

          <WaitlistForm />

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/8 p-5 text-white/80">
              <p className="text-sm uppercase tracking-[0.2em] text-white/45">Status</p>
              <p className="mt-2 text-lg font-medium text-white">3D scene scaffolded</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/8 p-5 text-white/80">
              <p className="text-sm uppercase tracking-[0.2em] text-white/45">Waitlist</p>
              <p className="mt-2 text-lg font-medium text-white">Form ready for early signups</p>
            </div>
          </div>
        </div>

        <SceneCanvas />
      </section>
    </main>
  );
}
