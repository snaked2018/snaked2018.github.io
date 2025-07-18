'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function LogoSlider() {
  const sliderRef = useRef(null);

  useEffect(() => {
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

    const handleMouseEnter = () => {
      isHovered = true;
    };

    const handleMouseLeave = () => {
      isHovered = false;
    };

    slider.addEventListener('mouseenter', handleMouseEnter);
    slider.addEventListener('mouseleave', handleMouseLeave);

    // Clean up
    return () => {
      cancelAnimationFrame(animationId);
      if (slider) {
        slider.removeEventListener('mouseenter', handleMouseEnter);
        slider.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const logos = [
    { src: "/logos/sunnies-face.png", alt: "Sunnies Face Logo", width: 180 },
    { src: "/logos/boc.png", alt: "Bliss Logo", width: 100 },
    { src: "/logos/worklocker.webp", alt: "Worklocker Logo", width: 150 },
    { src: "/logos/gnn.png", alt: "Goodnight Natural Logo", width: 150 },
    { src: "/logos/phillabor.png", alt: "Phil Labor Logo", width: 120 },
    { src: "/logos/lemonjelly.png", alt: "Lemon Jelly Logo", width: 150 },
    { src: "/logos/safetydirect.png", alt: "Safety Direct Logo", width: 120 },
    { src: "/logos/workstitch.webp", alt: "Workstitch Logo", width: 150 },
    { src: "/logos/worklocker.webp", alt: "Worklocker Logo", width: 150 },
    { src: "/logos/sunnies-studios.png", alt: "Sunnies Studios Logo", width: 180 },
    { src: "/logos/wwp.png", alt: "Work Wear Pro Logo", width: 150 },
  ];

  return (
    <section className="py-4 overflow-hidden">
      <div className="max-w-full">
        {/* <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trusted by Brands</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            I&#39;ve had the privilege to work with these amazing companies, delivering exceptional results.
          </p>
        </div> */}

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 z-10 bg-gradient-to-r from-[#000] to-transparent"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 z-10 bg-gradient-to-l from-[#000] to-transparent"></div>
          
          <div 
            className="border border-[#454545] rounded-xl bg-nav-gradient py-4 overflow-hidden relative"
          >
            <div 
              ref={sliderRef}
              className="flex items-center gap-16 overflow-x-auto scrollbar-hide"
              style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Double the logos for seamless infinite scroll */}
              {[...logos, ...logos].map((logo, index) => (
                <div key={index} className="shrink-0 flex items-center justify-center h-24 bg-transparent">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={80}
                    className="object-contain max-h-full filter brightness-95"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}