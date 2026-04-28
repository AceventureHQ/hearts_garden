"use client";
import WaitlistForm from "./components/waitlist-form";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-800 to-rose-900 opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgba(236,72,153,0.15),_transparent_50%),radial-gradient(circle_at_80%_80%,_rgba(168,85,247,0.15),_transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        {/* Animated floating elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-rose-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-10 sm:px-10 lg:px-12">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-40 h-40 text-6xl opacity-10 select-none pointer-events-none">🌱</div>
        <div className="absolute bottom-0 right-0 w-40 h-40 text-6xl opacity-10 select-none pointer-events-none">💐</div>
        <div className="absolute top-1/3 right-20 text-5xl opacity-5 select-none pointer-events-none animate-pulse">💜</div>

        <div className="relative max-w-2xl text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-pink-300/30 bg-pink-500/10 px-6 py-3 backdrop-blur">
            <span className="text-2xl">🌿</span>
            <span className="text-sm font-semibold tracking-widest text-pink-200 uppercase">
              Hearts Garden
            </span>
            <span className="text-2xl">💜</span>
          </div>

          {/* Main heading with whimsical styling */}
          <div className="space-y-6">
            <h1 className="text-7xl sm:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300">
              Growing
            </h1>
            <h2 className="text-3xl sm:text-4xl font-semibold text-pink-100/80">
              Something Beautiful
            </h2>
          </div>

          {/* Description */}
          <p className="text-lg text-pink-100/70 leading-relaxed max-w-xl mx-auto">
            Welcome!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link
              href="/explore"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold transition-all transform hover:scale-105 shadow-lg shadow-pink-500/50"
            >
              Explore the Garden 🌸
            </Link>
            <button
              onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 rounded-full cursor-pointer border-2 border-pink-300/50 hover:border-pink-300 text-pink-200 hover:text-pink-100 font-semibold transition-all"
            >
              Join the Waitlist
            </button>
          </div>

          {/* Status cards */}
          <div className="grid sm:grid-cols-2 gap-4 pt-12">
            <div className="rounded-2xl border border-pink-300/20 bg-pink-500/10 backdrop-blur-xl p-6 hover:border-pink-300/40 transition-all">
              <p className="text-pink-200/60 text-sm font-semibold tracking-wider uppercase">Status</p>
              <p className="mt-3 text-lg font-bold text-pink-100">Cooking something up!</p>
            </div>
            <div className="rounded-2xl border border-purple-300/20 bg-purple-500/10 backdrop-blur-xl p-6 hover:border-purple-300/40 transition-all">
              <p className="text-purple-200/60 text-sm font-semibold tracking-wider uppercase">Placeholder</p>
              <p className="mt-3 text-lg font-bold text-purple-100">Placeholder</p>
            </div>
          </div>
        </div>

        {/* Waitlist section */}
        <div id="waitlist" className="relative mt-24 w-full max-w-md">
          <div className="rounded-3xl border border-pink-300/30 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-pink-100 mb-6 text-center">
              Stay in the loop 💌
            </h3>
            <WaitlistForm />
          </div>
        </div>
      </div>
    </main>
  );
}
