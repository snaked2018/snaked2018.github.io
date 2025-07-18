'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import siteData from "@/data/siteData.json";

const experiences = siteData.personal.experience

function getLoopedIdx(idx, length) {
    return ((idx % length) + length) % length;
}

export default function ExperienceSection() {
    const [activeIdx, setActiveIdx] = useState(0);

    const handleWheel = (e) => {
        if (e.deltaY > 0) {
            setActiveIdx((prev) => getLoopedIdx(prev + 1, experiences.length));
        } else if (e.deltaY < 0) {
            setActiveIdx((prev) => getLoopedIdx(prev - 1, experiences.length));
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setActiveIdx((prev) => getLoopedIdx(prev + 1, experiences.length));
        } else if (e.key === 'ArrowUp') {
            setActiveIdx((prev) => getLoopedIdx(prev - 1, experiences.length));
        }
    };

    // Bullet click handler
    const handleBulletClick = (idx) => {
        setActiveIdx(idx);
    };

    // Mobile detection (simple)
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    // Render for mobile: horizontal carousel card, logo inside card, no bullets
    if (isMobile) {
        return (
            <section className="relative pt-16 px-2 lg:px-8">
                <div className="mb-8 text-center px-4">
                    <h1 className="text-3xl font-bold text-white mb-2">Experience</h1>
                    <p className="text-base text-[#b8b8b8] text-center mb-10 max-w-xl mx-auto">
                        Swipe through my timeline. Each card highlights an experience and its logo.
                    </p>
                </div>
                <div className="w-full overflow-x-auto flex flex-row gap-6 px-2 pb-8" style={{ scrollSnapType: 'x mandatory' }}>
                    {experiences.map((exp, idx) => (
                        <motion.div
                            key={exp.title + idx}
                            className="relative flex-shrink-0 rounded-2xl shadow-xl text-base text-[#b8b8b8] border border-[#454545] bg-nav-gradient"
                            style={{
                                width: '80vw',
                                minWidth: '80vw',
                                maxWidth: '90vw',
                                height: '420px',
                                scrollSnapAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '32px 16px',
                            }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setActiveIdx(idx)}
                        >
                            <div className="flex flex-col items-center mb-6">
                                <div className="relative w-[200px] h-[40px] mb-4">
                                    <Image
                                        src={exp.logo}
                                        alt={`${exp.company} Logo`}
                                        fill
                                        className="object-contain"
                                        priority={activeIdx === idx}
                                    />
                                </div>
                                <span className="text-xs font-mono">{exp.year}</span>
                            </div>
                            <h2 className="text-xl font-bold mb-1 text-white text-center">{exp.title}</h2>
                            <h3 className="text-base font-semibold mb-2 text-center">{exp.company}</h3>
                            <p className="text-base leading-relaxed text-center">{exp.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        );
    }

    // Render 5 items: center, 2 above, 2 below (for partial view)
    const visibleItems = [];
    for (let i = -2; i <= 2; i++) {
        visibleItems.push(experiences[getLoopedIdx(activeIdx + i, experiences.length)]);
    }

    return (
        <section className="relative py-24 px-2 lg:px-8">
            <div className="mb-12 text-center px-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">Experience</h1>
                <p className="text-base text-[#b8b8b8] text-center mb-10 max-w-xl mx-auto">
                    Scroll through my timeline. The center slot highlights each experience, with the logo aligned and the bullet reacting as you scroll.
                </p>
            </div>
            <div
                className="max-w-[1440px] mx-auto rounded-2xl border border-[#444] overflow-hidden flex flex-row"
                style={{ height: '600px' }}
            >
                {/* Bullet Line - 10% */}
                <div className="relative flex-shrink-0" style={{ width: '10%', height: '600px' }}>
                    <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-[#888] to-transparent z-0" />
                    <div className="flex flex-col items-center justify-center h-full py-8 gap-16 relative z-10">
                        {experiences.map((exp, idx) => (
                            <motion.button
                                key={exp.year + idx}
                                className="flex flex-col items-center focus:outline-none"
                                animate={{
                                    scale: activeIdx === idx ? 1.2 : 1,
                                    opacity: activeIdx === idx ? 1 : 0.5,
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                onClick={() => handleBulletClick(idx)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                tabIndex={0}
                                aria-label={`Go to ${exp.title}`}
                            >
                                <div className={`w-5 h-5 rounded-full border-2 ${activeIdx === idx ? 'border-[#454545] bg-[#454545]' : 'border-[#888] bg-[#181A20]'} flex items-center justify-center`}>
                                    <span className={`w-2.5 h-2.5 rounded-full ${activeIdx === idx ? 'bg-white' : 'bg-[#888]'} block`}></span>
                                </div>
                                <span className={`text-white font-mono text-xs mt-2 ${activeIdx === idx ? 'font-bold' : 'opacity-60'}`}>
                                    {exp.year}
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </div>
                {/* Experience Details - 60% */}
                <div
                    className="flex-1 flex flex-col items-center justify-center relative"
                    style={{ width: '40%', height: '600px', overflow: 'hidden' }}
                    tabIndex={0}
                    onWheel={handleWheel}
                    onKeyDown={handleKeyDown}
                >
                    <div className="relative w-full h-full flex flex-col items-center justify-center">
                        <AnimatePresence initial={false}>
                            {visibleItems.map((exp, i) => {
                                // Center item
                                if (i === 2) {
                                    return (
                                        <motion.div
                                            key={exp.title + i}
                                            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 rounded-xl scale-[1.05] shadow-xl text-[#b8b8b8] z-20 border border-[#454545] bg-nav-gradient"
                                            style={{
                                                minHeight: '220px',
                                                height: '220px',
                                                margin: '0 auto',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                padding: '32px',
                                                width: '90%',
                                            }}
                                            initial={{ opacity: 0, y: 40 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -40 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        >
                                            <h2 className="text-2xl lg:text-3xl text-white font-bold mb-1">{exp.title}</h2>
                                            <h3 className="text-lg lg:text-xl font-semibold mb-2">{exp.company}</h3>
                                            <p className="text-base leading-relaxed">{exp.description}</p>
                                        </motion.div>
                                    );
                                }
                                // Partial items (top/bottom)
                                return (
                                    <motion.div
                                        key={exp.title + i}
                                        className="absolute left-0 right-0 rounded-xl opacity-40 z-10"
                                        style={{
                                            minHeight: '180px',
                                            height: '180px',
                                            margin: '0 auto',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            padding: '24px',
                                            width: '80%',
                                            top: `calc(50% + ${(i - 2) * 170}px)`,
                                        }}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 0.1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    >
                                        <h2 className="text-xl font-bold mb-1">{exp.title}</h2>
                                        <h3 className="text-base font-semibold mb-2">{exp.company}</h3>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>
                {/* Logo - 30% */}
                <div className="flex-shrink-0 flex items-center justify-center" style={{ width: '30%', position: 'relative', height: '600px' }}>
                    <AnimatePresence initial={false}>
                        {experiences.map((exp, idx) => (
                            activeIdx === idx && (
                                <motion.div
                                    key={exp.company + idx}
                                    className="absolute"
                                    style={{
                                        top: '50%',
                                        left: '30%',
                                        width: '180px',
                                        height: '60px',
                                        transform: 'translate(-50%, -50%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1.5 }}
                                    exit={{ opacity: 0, y: -40, scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                >
                                    <Image
                                        src={exp.logo}
                                        alt={`${exp.company} Logo`}
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </motion.div>
                            )
                        ))}
                    </AnimatePresence>
                    {/* Drag down indicator */}
                    <motion.div
                        className="absolute left-1/2 bottom-6 -translate-x-1/2 flex flex-col items-center"
                        initial={{ opacity: 0.5, y: 0 }}
                        animate={{ opacity: 1, y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.2 }}
                    >
                        <span className="w-6 h-6 rounded-full flex items-center justify-center border border-[#444]">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M12 5v14m0 0l-6-6m6 6l6-6" stroke="#454545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                        <span className="text-xs text-white mt-1">Drag or scroll</span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}