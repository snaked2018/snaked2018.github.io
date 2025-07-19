"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import siteData from "@/data/siteData.json";

function ProjectLine({ images, reverse = false, onCardClick }) {
  const lineRef = useRef(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    let start = null;
    let reqId;
    const speed = 0.02;

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
          onClick={() => onCardClick(img)}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes={`(max-width: 768px) ${cardWidth}px, 220px`}
            priority={idx < images.length}
          />
        </div>
      ))}
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (project) {
      setIsMounted(true);

      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalOverflow || "";
        setIsMounted(false);
      };
    }
  }, [project]);

  const handleClose = () => {
    document.body.style.overflow = "";
    onClose();
  };

  if (!project) return null;

  // Use project theme color or fallback to default black
  const bgColor = project.themeColor || "#000";

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto"
      style={{ backgroundColor: `${bgColor}` }}
    >
      {/* Header section with shadow */}
      <div className="sticky top-0 z-30 w-full bg-black bg-opacity-60 backdrop-blur-sm shadow-lg shadow-black/30">
        <div className="max-w-[1440px] mx-auto px-4 py-4 flex items-center justify-between">
          <button
            className="text-white text-base font-semibold self-start inline-flex items-center gap-2 py-2 rounded transition cursor-pointer focus:outline-none"
            onClick={handleClose}
          >
            <FaArrowLeft className="text-lg" />
            Back to projects
          </button>
          <Link href="#" onClick={(e) => e.preventDefault()}>
            <div>
              <Image
                src={siteData.business.logo}
                alt={`${siteData.business.name} Logo`}
                width={60}
                height={40}
                className="w-[60px] h-[40px] object-contain"
                priority
              />
            </div>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src={project.preview}
          alt={project.title + " Preview"}
          fill
          className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
          priority
          style={{ zIndex: 1 }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b opacity-100 z-10"
          style={{
            background: `linear-gradient(to bottom, ${bgColor}, transparent, ${bgColor})`,
          }}
        ></div>
        {/* Details container */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-4 flex flex-col bg-transparent">
          <h2 className="text-5xl font-bold text-white mb-6">
            {project.title}
          </h2>
          <p className="text-lg text-[#b8b8b8] mb-6">{project.summary}</p>
          <div className="mb-6">
            <span className="font-semibold text-white">Stacks Used:</span>
            <ul className="list-disc list-inside text-[#b8b8b8] mt-2">
              {project.stacks.map((stack, idx) => (
                <li key={stack + idx}>{stack}</li>
              ))}
            </ul>
          </div>
          {project.website && (
            <div>
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 border border-white text-white rounded font-semibold bg-transparent hover:bg-white hover:text-black transition mt-4 w-auto"
              >
                View project
              </a>
            </div>
          )}
          <div className="mt-16 border border-b border-gray-300"></div>
        </div>
      </div>
      <div className="w-full max-w-[1440px] mx-auto my-12 px-4">
        <Image
          src={project.fullpreview}
          alt={project.title + " Full Preview"}
          width={1440}
          height={800}
          className="w-full h-auto object-contain rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}

export default function ProjectSection() {
  const [modalProject, setModalProject] = useState(null);

  const findProject = (img) => {
    const allProjects = [...siteData.projects.details];
    return allProjects.find((p) => p.src === img.src) || {
      title: img.alt,
      summary: "No details available.",
      stacks: [],
      preview: img.src,
    };
  };

  const handleCardClick = (img) => {
    setModalProject(findProject(img));
  };

  return (
    <section className="relative py-24 px-2 md:px-8">
      <div className="mb-12 text-center px-4">
        <h2 className="text-4xl font-bold text-white mb-3">
          {siteData.projects.title}
        </h2>
        <p className="text-base text-[#b8b8b8] text-center mb-10 max-w-[1440px] mx-auto">
          {siteData.projects.description}
        </p>
      </div>
      <div className="flex flex-col gap-8">
        <ProjectLine
          images={siteData.projects.line1}
          reverse={false}
          onCardClick={handleCardClick}
        />
        <ProjectLine
          images={siteData.projects.line2}
          reverse={true}
          onCardClick={handleCardClick}
        />
      </div>
      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </section>
  );
}