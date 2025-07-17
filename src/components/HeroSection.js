"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';
import siteData from '@/data/siteData.json';

export default function HeroSection() {
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  
  const { personal } = siteData;

  useEffect(() => {
    // Start date from JSON data
    const startDate = new Date(personal.startDate);
    
    // Calculate initial time once
    const calculateTime = () => {
      const now = new Date();
      const difference = now - startDate;
      
      // Calculate years, days, hours, minutes and seconds
      const millisecondsInSecond = 1000;
      const millisecondsInMinute = millisecondsInSecond * 60;
      const millisecondsInHour = millisecondsInMinute * 60;
      const millisecondsInDay = millisecondsInHour * 24;
      const millisecondsInYear = millisecondsInDay * 365.25; // Account for leap years
      
      const years = Math.floor(difference / millisecondsInYear);
      const days = Math.floor((difference % millisecondsInYear) / millisecondsInDay);
      const hours = Math.floor((difference % millisecondsInDay) / millisecondsInHour);
      const minutes = Math.floor((difference % millisecondsInHour) / millisecondsInMinute);
      const seconds = Math.floor((difference % millisecondsInMinute) / millisecondsInSecond);
      
      setTimeElapsed({ years, days, hours, minutes, seconds });
    };
    
    // Calculate once immediately
    calculateTime();
    
    // Show content after a small delay to ensure calculations are complete
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    // Update the counter every second
    const timer = setInterval(calculateTime, 1000);
    
    // Clean up the timers when the component unmounts
    return () => {
      clearInterval(timer);
      clearTimeout(loadingTimeout);
    };
  }, [personal.startDate]);

  // Format the time string in the format "7years 198days xxminutes and xxseconds"
  const formattedTime = `${timeElapsed.years} years, ${timeElapsed.days} days, ${String(timeElapsed.minutes).padStart(2, '')} minutes and ${String(timeElapsed.seconds).padStart(2, '0')} seconds.`;

  return (
    <section className="relative pt-12 pb-16 md:pt-5 md:pb-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Image First on Mobile, Second on Desktop */}
        <div className="w-full md:w-1/2 md:order-2 flex justify-center mb-8 md:mb-0 md:mt-0 z-10 relative">
          <div className="relative w-[350px] h-[350px] md:w-[600px] md:h-[600px] xl:w-[700px] xl:h-[700px]">
            {/* Circular mask with gradient fade */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="w-full h-full relative">
                <Image 
                  src="/New.png" 
                  alt={`${personal.name} Profile`}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Gradient overlay for fade effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[rgba(0,0,0,0.7)] opacity-90"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(0,0,0,0.7)] opacity-90"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Text Content Second on Mobile, First on Desktop */}
        <div className="w-full md:w-1/2 md:order-1 z-10">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white mb-4 md:mb-6 text-center md:text-left">
            I&apos;m a {personal.profession.title}<br />
            Based<br />
            In {personal.location}
          </h1>
          
          <p className="text-gray-300 mb-4 md:mb-6 max-w-lg text-center md:text-left mx-auto md:mx-0">
            {personal.profession.shortDescription}
          </p>
          
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <p className="text-gray-300 mb-1 text-center md:text-left">
              {personal.profession.skills}
            </p>
          </div>
          
          <p className="text-gray-300 mb-6 md:mb-8 text-center md:text-left">
            I have been working with web technologies for{" "}
            {isLoading ? (
              <span className="inline-block w-[260px] md:w-[320px] h-5 md:h-6 bg-gray-700 animate-pulse rounded"></span>
            ) : (
              <span className="text-gray">{formattedTime}</span>
            )}
          </p>
          
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 md:gap-4 mt-4 md:mt-8 w-full">
            <Link 
              href="/contact" 
              className="relative hover-silver-border flex items-center justify-center px-5 py-2.5 md:py-3 bg-nav-gradient border border-[#333] text-white text-sm font-medium rounded-full hover:bg-[#222] transition duration-300 mb-3 md:mb-0 w-[calc(50%-0.375rem)] md:w-auto overflow-hidden"
            >
              <span className="silver-border absolute inset-0 rounded-full silver-gradient blur-sm"></span>
              <span className="absolute inset-[1.5px] rounded-full bg-[#111] z-10"></span>
              <span className="flex items-center gap-2 relative z-20">
                <Image src="/icons/hireme.svg" alt="Hire me" width={16} height={16} className="object-contain" />
                Hire me
              </span>
            </Link>
            
            <Link 
              href={personal.socialLinks.upwork} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative hover-silver-border flex items-center justify-center px-5 py-2.5 md:py-3 bg-nav-gradient border border-[#333] text-white text-sm font-medium rounded-full hover:bg-[#222] transition duration-300 mb-3 md:mb-0 w-[calc(50%-0.375rem)] md:w-auto overflow-hidden"
            >
              <span className="silver-border absolute inset-0 rounded-full silver-gradient blur-sm"></span>
              <span className="absolute inset-[1.5px] rounded-full bg-[#111] z-10"></span>
              <span className="flex items-center gap-2 relative z-20">
                <SiUpwork className="mr-2" size={16} />
                Upwork
              </span>
            </Link>
            
            <Link 
              href={personal.socialLinks.github}
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative hover-silver-border flex items-center justify-center px-5 py-2.5 md:py-3 bg-nav-gradient border border-[#333] text-white text-sm font-medium rounded-full hover:bg-[#222] transition duration-300 mb-3 md:mb-0 w-[calc(50%-0.375rem)] md:w-auto overflow-hidden"
            >
              <span className="silver-border absolute inset-0 rounded-full silver-gradient blur-sm"></span>
              <span className="absolute inset-[1.5px] rounded-full bg-[#111] z-10"></span>
              <span className="flex items-center gap-2 relative z-20">
                <FaGithub className="mr-2" size={16} />
                Github
              </span>
            </Link>
            
            <Link 
              href={personal.socialLinks.linkedin}
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative hover-silver-border flex items-center justify-center px-5 py-2.5 md:py-3 bg-nav-gradient border border-[#333] text-white text-sm font-medium rounded-full hover:bg-[#222] transition duration-300 mb-3 md:mb-0 w-[calc(50%-0.375rem)] md:w-auto overflow-hidden"
            >
              <span className="silver-border absolute inset-0 rounded-full silver-gradient blur-sm"></span>
              <span className="absolute inset-[1.5px] rounded-full bg-[#111] z-10"></span>
              <span className="flex items-center gap-2 relative z-20">
                <FaLinkedinIn className="mr-2" size={16} />
                LinkedIn
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}