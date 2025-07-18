"use client";
import { useEffect, useRef } from "react";
import { FaReact, FaNodeJs, FaShopify, FaHtml5, FaGitAlt, FaWordpress, FaFigma } from "react-icons/fa";
import { SiMongodb, SiExpress, SiRemix, SiPhp, SiTypescript } from "react-icons/si";
import siteData from "@/data/siteData.json";

const skillIcons = {
  "React.js": <FaReact className="text-white" />,
  "Node.js": <FaNodeJs className="text-white" />,
  "Shopify": <FaShopify className="text-white" />,
  "Remix": <SiRemix className="text-white" />,
  "MongoDB": <SiMongodb className="text-white" />,
  "Express.js": <SiExpress className="text-white" />,
  "HTML5": <FaHtml5 className="text-white" />,
  "PHP": <SiPhp className="text-white" />,
  "WordPress": <FaWordpress className="text-white" />,
  "Git": <FaGitAlt className="text-white" />,
  "TypeScript": <SiTypescript className="text-white" />,
  "Figma": <FaFigma className="text-white" />,
};

export default function SkillSection() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const sliderRef = useRef(null);

  // Auto-scroll logic for mobile, same as LogoSlider
  useEffect(() => {
    if (!isMobile) return;
    const slider = sliderRef.current;
    if (!slider) return;

    let animationId;
    let isHovered = false;

    const scroll = () => {
      if (!isHovered && slider) {
        if (slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth) * 0.99) {
          slider.scrollLeft = 0;
        } else {
          slider.scrollLeft += 0.5;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    const handleMouseEnter = () => { isHovered = true; };
    const handleMouseLeave = () => { isHovered = false; };

    slider.addEventListener('mouseenter', handleMouseEnter);
    slider.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      if (slider) {
        slider.removeEventListener('mouseenter', handleMouseEnter);
        slider.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isMobile]);

  if (isMobile) {
    // Split skills into rows of 3
    const skills = [...siteData.personal.profession.skillList];
    const rows = [];
    for (let i = 0; i < skills.length; i += 3) {
      rows.push(skills.slice(i, i + 3));
    }

    return (
      <section className="relative pt-16 px-2 overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-20">
          <h2 className="text-3xl font-bold text-white mb-6 text-center tracking-tight">
            {siteData.personal.profession.title}
          </h2>
          <p className="text-base text-[#b8b8b8] text-center mb-8 max-w-xl mx-auto">
            {siteData.personal.profession.skills}
          </p>
          <div className="flex flex-col gap-6">
            {rows.map((row, rowIdx) => (
              <div
                key={rowIdx}
                className={`flex gap-6 justify-center`}
              >
                {row.map((skill, idx) => (
                  <div
                    key={skill + idx}
                    className="flex flex-col items-center justify-center bg-nav-gradient border border-[#454545] rounded-xl shadow-xl p-6 min-w-[100px] max-w-[100px]"
                  >
                    <div className="mb-3 text-2xl drop-shadow-lg">{skillIcons[skill]}</div>
                    <span className="text-xs font-semibold text-[#b8b8b8]">{skill}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop
  return (
    <section className="relative py-20 px-4 md:px-8 overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center tracking-tight">
          {siteData.personal.profession.title}
        </h2>
        <p className="text-base text-[#b8b8b8] text-center mb-10 max-w-xl mx-auto">
          {siteData.personal.profession.skills}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 justify-items-center">
          {siteData.personal.profession.skillList.map((skill) => (
            <div
              key={skill}
              className="flex flex-col items-center justify-center bg-nav-gradient border border-[#454545] rounded-xl shadow-xl p-6 w-full max-w-[180px] transition-all duration-200 hover:scale-105 hover:shadow-2xl"
            >
              <div className="mb-3 text-4xl drop-shadow-lg">{skillIcons[skill]}</div>
              <span className="text-base font-semibold text-[#b8b8b8]">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}