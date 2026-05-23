import Link from "next/link";

const ITEMS = [
  "Wait to water until the top layer of soil feels dry to the touch.",
  "Bottom watering is preferred so roots can drink what they need without oversaturating the top layer.",
  "Avoid getting water on the leaves, because moisture sitting on foliage can lead to rot or spotting.",
  "If you repot, choose a well-draining succulent mix and a pot with drainage holes.",
  "Place in bright, indirect light or gentle morning sun and rotate occasionally for even growth.",
] as const;

export default function SucculentsCarePage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_24px_70px_rgba(120,53,15,0.12)] backdrop-blur sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#9a3412]">
          Care guide
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-[#1f1714] sm:text-4xl">
          Succulents
        </h1>
        <p className="mt-4 text-base leading-7 text-[#675148]">
          Keep your succulent routine simple: water less often, keep leaves dry, and use fast-draining soil.
        </p>

        <div className="mt-8 space-y-4">
          {ITEMS.map((item) => (
            <div key={item} className="rounded-[1.5rem] border border-[#ead9cc] bg-[#fffaf5] p-5">
              <p className="text-base leading-7 text-[#1f1714]">{item}</p>
            </div>
          ))}
        </div>

        <Link
          href="/care"
          className="mt-8 inline-flex h-11 items-center rounded-full border border-[#dbc6b6] bg-white px-4 text-sm font-semibold text-[#1f1714] transition hover:border-[#c89a74] hover:bg-[#fffaf5]"
        >
          Back to care instructions
        </Link>
      </section>
    </main>
  );
}