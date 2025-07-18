'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { FiMinus, FiMaximize2, FiX } from "react-icons/fi";

// Card data
const cards = [
	{
		title: 'about-me',
		content: [
			"Hi, I'm Ron Reciproco, a freelance Full-stack Developer!",
			"My focus is on creative development; my skills are a meeting point between creativity and technical proficiency.",
			"I integrate complex but smooth animations and interactions into my projects to present information in an engaging way.",
			"I strive to deliver projects that are visually compelling and technically outstanding.",
			"My favorite technologies are based on the MERNstack paradigm, focusing on web-application development.",
			"Though my current focus is on Shopify development, I also have experience with WordPress and other CMS platforms.",
		],
		width: 620,
	},
	{
		title: 'where-i-work',
		content: [
			"Currently based in the Philippines 🇵🇭, I work remotely with clients from around the world.",
			"Available for remote collaborations worldwide.",
		],
		width: 340,
	},
	{
		title: 'collaborations',
		content: [
			"My ideal collaborations are with web agencies and digital design studios.",
			"I also work with independent professionals such as designers or other developers.",
			"I achieve my best results in partnerships based on mutual understanding and close collaboration.",
		],
		width: 420,
	},
	{
		title: 'me-online',
		content: [
			"linkedin ↗",
			"instagram ↗",
			"twitter ↗",
			"github ↗",
		],
		width: 300,
	},
	{
		title: 'portrait',
		image: "/background-2.gif",
		width: 400,
	},
];

// Bento grid positions for desktop
const bentoPositions = [
	{ top: 150, left: 0 }, // about-me card
    { top: 170, left: 680 }, // where-i-work card
    { top: 550, left: 790 }, // collaborations card
    { top: 640, left: 120 }, // me-online card
	{ top: 420, left: 400 }, // portrait card center
];

function DraggableCard({ title, content, image, index, draggable, width }) {
	const cardRef = useRef(null);
	let offset = { x: 0, y: 0 };

	// Smooth drag handler for desktop only
	const onPointerDown = (e) => {
		if (!draggable) return;
		e.preventDefault();
		const card = cardRef.current;
		const startX = e.clientX;
		const startY = e.clientY;
		offset = {
			x: card.offsetLeft - startX,
			y: card.offsetTop - startY,
		};

		card.style.transition = 'none';

		const moveHandler = (event) => {
			const clientX = event.clientX;
			const clientY = event.clientY;
			card.style.left = clientX + offset.x + 'px';
			card.style.top = clientY + offset.y + 'px';
		};

		const upHandler = () => {
			card.style.transition = 'all 0.2s cubic-bezier(.4,0,.2,1)';
			document.removeEventListener('mousemove', moveHandler);
			document.removeEventListener('mouseup', upHandler);
		};

		document.addEventListener('mousemove', moveHandler);
		document.addEventListener('mouseup', upHandler);
	};

	// Responsive position: bento grid on desktop, stacked on mobile
	const desktopPos = bentoPositions[index] || { top: 60 + index * 60, left: 100 + index * 80 };

	return (
		<div
			ref={cardRef}
			className={`aboutme-draggable-card absolute bg-nav-gradient border border-[#454545] rounded-xl shadow-2xl p-8 cursor-${draggable ? 'move' : 'default'} select-none transition-all duration-200`}
			style={{
				top: desktopPos.top,
				left: desktopPos.left,
				zIndex: 10 + index,
				width: width ? `${width}px` : '420px',
				position: draggable ? 'absolute' : 'static',
				margin: draggable ? undefined : '0 auto 32px auto',
			}}
			onMouseDown={onPointerDown}
		>
			{/* Card Header */}
			<div className="flex items-center justify-between mb-4">
				<span className="font-mono text-base text-gray-100">{title}</span>
				<div className="flex items-center gap-2">
					<button className="w-5 h-5 rounded-sm bg-[#222] hover:bg-[#333] flex items-center justify-center text-xs text-[#b8b8b8] border border-[#444]">
						<FiMinus size={14} />
					</button>
					<button className="w-5 h-5 rounded-sm bg-[#222] hover:bg-[#333] flex items-center justify-center text-xs text-[#b8b8b8] border border-[#444]">
						<FiMaximize2 size={14} />
					</button>
					<button className="w-5 h-5 rounded-sm bg-[#222] hover:bg-[#c00] flex items-center justify-center text-xs text-[#b8b8b8] border border-[#444]">
						<FiX size={14} />
					</button>
				</div>
			</div>
			<div className="w-full h-[2px] bg-gradient-to-r from-[#FFF] via-[#FFF] to-transparent mb-6"></div>
            {/* Card Content or Image */}
            {image ? (
                <div className="flex justify-center items-center">
                    <div className="w-full h-[200px] rounded-xl overflow-hidden border border-[#333] relative">
                        <Image
                            src={image}
                            alt="portrait"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 90vw, 100vw"
                            priority
                        />
                    </div>
                </div>
            ) : (
                <ul className="list-decimal ml-5 text-base text-[#b8b8b8] space-y-2">
                    {content.map((line, i) => (
                        <li key={i}>{line}</li>
                    ))}
                </ul>
            )}
        </div>
	);
}

export default function AboutMeDraggable() {
    // Detect mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
        <section className="relative py-24 overflow-x-hidden">
            <div className="max-w-[1100px] mx-auto relative h-[800px] flex flex-col md:block">
                {/* Title and subcopy */}
                <div className="mb-12 text-center px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">About Me</h1>
                    <p className="text-base text-[#b8b8b8] text-center mb-10 max-w-xl mx-auto">
                        Explore my background, skills, and links. On desktop, you can drag and move each card freely.
                    </p>
                </div>
                {cards.map((card, idx) => (
                    <DraggableCard
                        key={card.title}
                        {...card}
                        index={idx}
                        draggable={!isMobile}
                        width={card.width}
                    />
                ))}
            </div>
            {/* Mobile stacking styles */}
            <style jsx global>{`
                @media (max-width: 768px) {
                    .aboutme-draggable-card {
                        position: static !important;
                        margin: 0 auto 32px auto !important;
                        left: unset !important;
                        top: unset !important;
                        width: 90vw !important;
                        max-width: 420px !important;
                        cursor: default !important;
                    }
                }
            `}</style>
        </section>
    );
}