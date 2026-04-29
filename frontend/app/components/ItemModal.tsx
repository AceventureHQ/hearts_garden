"use client";

import { useEffect } from "react";

interface ItemModalProps {
	isOpen: boolean;
	itemName: string;
	onClose: () => void;
}

type ItemDetails = {
	title: string;
	description: string;
	badge: string;
	accent: string;
};

const itemDetails: Record<string, ItemDetails> = {
	Item_Lamp: {
		title: "Mystical Lamp",
		description:
			"An old lamp that feels like it is holding a small piece of the next room. Tap it to move forward through the garden.",
		badge: "Room Key",
		accent: "from-amber-300 via-pink-300 to-fuchsia-300",
	},
	Item_Plant: {
		title: "Sacred Plant",
		description:
			"A living piece of the garden that suggests growth, care, and hidden pathways.",
		badge: "Living Detail",
		accent: "from-emerald-300 via-lime-300 to-teal-300",
	},
	Item_Flower: {
		title: "Blooming Flower",
		description:
			"A bright marker in the scene that feels like a clue, a reward, or a place to pause.",
		badge: "Decorative Item",
		accent: "from-rose-300 via-pink-300 to-orange-300",
	},
	Item_Stone: {
		title: "Garden Stone",
		description:
			"A grounded object with a calm presence, like an anchor in the scene.",
		badge: "Anchor Point",
		accent: "from-slate-300 via-cyan-200 to-blue-300",
	},
};

export default function ItemModal({ isOpen, itemName, onClose }: ItemModalProps) {
	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("keydown", handleEscape);

		return () => {
			document.body.style.overflow = previousOverflow;
			document.removeEventListener("keydown", handleEscape);
		};
	}, [isOpen, onClose]);

	if (!isOpen) {
		return null;
	}

	const details = itemDetails[itemName] ?? {
		title: itemName || "Unknown object",
		description: "This object has no description yet.",
		badge: "Selectable Object",
		accent: "from-white via-white to-white",
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
			<button
				type="button"
				aria-label="Close modal"
				className="absolute inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity"
				onClick={onClose}
			/>

			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="item-modal-title"
				className="relative w-full max-w-lg overflow-hidden rounded-4xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(244,114,182,0.18),transparent_40%),linear-gradient(180deg,rgba(15,23,42,0.98),rgba(2,6,23,0.98))] shadow-2xl shadow-black/40"
				onClick={(event) => event.stopPropagation()}
			>
				<div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%,transparent_65%,rgba(255,255,255,0.04))]" />

				<div className="relative p-6 sm:p-8">
					<div className="mb-6 flex items-start justify-between gap-4">
						<div>
							<p className="text-xs uppercase tracking-[0.35em] text-white/45">
								Garden Object
							</p>
							<h2
								id="item-modal-title"
								className={`mt-2 bg-linear-to-r ${details.accent} bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl`}
							>
								{details.title}
							</h2>
						</div>

						<button
							type="button"
							onClick={onClose}
							className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
							aria-label="Dismiss modal"
						>
							<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					<div className="mb-6 flex flex-wrap gap-2">
						<span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-white/65">
							{details.badge}
						</span>
						<span className="rounded-full border border-pink-300/20 bg-pink-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-pink-100/80">
							{itemName}
						</span>
					</div>

					<p className="max-w-md text-sm leading-7 text-white/75 sm:text-base">
						{details.description}
					</p>

					<div className="mt-8 grid gap-3 sm:grid-cols-2">
						<button
							type="button"
							onClick={onClose}
							className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/80 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
						>
							Close
						</button>
						<button
							type="button"
							className="rounded-2xl bg-linear-to-r from-pink-500 to-rose-500 px-4 py-3 text-sm font-semibold text-white transition hover:from-pink-400 hover:to-rose-400"
						>
							Inspect Details
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
