"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import siteData from "@/data/siteData.json";

function ProjectLine({ images, reverse = false }) {
  const lineRef = useRef(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    let start = null;
    let reqId;
    const speed = 0.02; // very slow scroll

    function animate(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const direction = reverse ? -1 : 1;
      const maxScroll = line.scrollWidth - line.clientWidth;
      let scrollPos = (elapsed * speed * direction) % maxScroll;
      if (scrollPos < 0) scrollPos += maxScroll;
      line.scrollLeft = scrollPos;
      reqId = requestAnimationFrame(animate);
    }
    reqId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(reqId);
  }, [reverse]);

  // Responsive sizing
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const cardWidth = isMobile ? 120 : 220;
  const cardHeight = isMobile ? 70 : 140;

  return (
    <div
      ref={lineRef}
      className="flex gap-4 overflow-x-auto scrollbar-hide py-2"
      style={{
        scrollBehavior: "smooth",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {[...images, ...images].map((img, idx) => (
        <div
          key={img.src + idx}
          className="group relative flex-shrink-0 rounded-xl border border-[#454545] bg-nav-gradient shadow-xl overflow-hidden"
          style={{ width: cardWidth, height: cardHeight, cursor: "pointer" }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 80vw, 220px"
            priority={idx < images.length}
          />
        </div>
      ))}
    </div>
  );
}

export default function ProjectSection() {
  return (
    <section className="relative py-24 px-2 md:px-8">
      <div className="mb-12 text-center px-4">
        <h2 className="text-4xl font-bold text-white mb-3">
          {siteData.projects.title}
        </h2>
        <p className="text-base text-[#b8b8b8] text-center mb-10 max-w-xl mx-auto">
          {siteData.projects.description}
        </p>
      </div>
      <div className="flex flex-col gap-8">
        <ProjectLine images={siteData.projects.line1} reverse={false} />
        <ProjectLine images={siteData.projects.line2} reverse={true} />
      </div>
    </section>
  );
}