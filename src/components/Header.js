'use client';
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import siteData from '@/data/siteData.json';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { navigation, business } = siteData;

  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled more than 10px
      setIsScrolled(window.scrollY > 10);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check in case page is loaded scrolled down
    handleScroll();
    
    // Clean up the listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`py-6 px-4 md:px-8 lg:px-16 text-white ${isScrolled ? 'md:fixed md:top-0 md:left-0 md:w-full md:z-50' : 'relative'} transition-all duration-300`}>
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center justify-between md:justify-center relative z-[100]">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden z-10 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 flex flex-col gap-1">
              <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
          
          {/* All navigation in a single row */}
          <div className="hidden md:flex items-center gap-8 lg:gap-[60px] px-7 border border-[#454545] rounded-full bg-nav-gradient text-[14px]">
            {/* First 3 navigation items */}
            <Link 
              href={navigation.main[0].path}
              className="font-medium py-2 hover:font-bold hover:bg-nav-gradient hover:px-4 hover:py-2 hover:rounded-full hover:border hover:border-[#454545] transition-all ease-in-out duration-300"
            >
              {navigation.main[0].name}
            </Link>
            <Link 
              href={navigation.main[1].path}
              className="font-medium py-2 hover:font-bold hover:bg-nav-gradient hover:px-4 hover:py-2 hover:rounded-full hover:border hover:border-[#454545] transition-all ease-in-out duration-300"
            >
              {navigation.main[1].name}
            </Link>
            <Link 
              href={navigation.main[2].path}
              className="font-medium py-2 hover:font-bold hover:bg-nav-gradient hover:px-4 hover:py-2 hover:rounded-full hover:border hover:border-[#454545] transition-all ease-in-out duration-300"
            >
              {navigation.main[2].name}
            </Link>
            
            {/* Logo - no vertical padding */}
            <Link href="/" className="mx-4 -my-[1px] flex items-center">
              <Image 
                src={business.logo} 
                alt={`${business.name} Logo`} 
                width={80}
                height={60}
                className="w-[80px] h-[60px] object-contain"
                priority
              />
            </Link>
            
            {/* Last 3 navigation items */}
            <Link 
              href={navigation.main[3].path}
              className="font-medium py-2 hover:font-bold hover:bg-nav-gradient hover:px-4 hover:py-2 hover:rounded-full hover:border hover:border-[#454545] transition-all ease-in-out duration-300"
            >
              {navigation.main[3].name}
            </Link>
            <Link 
              href={navigation.main[4].path}
              className="font-medium py-2 hover:font-bold hover:bg-nav-gradient hover:px-4 hover:py-2 hover:rounded-full hover:border hover:border-[#454545] transition-all ease-in-out duration-300"
            >
              {navigation.main[4].name}
            </Link>
            <Link 
              href={navigation.main[5].path}
              className="font-medium py-2 hover:font-bold hover:bg-nav-gradient hover:px-4 hover:py-2 hover:rounded-full hover:border hover:border-[#454545] transition-all ease-in-out duration-300"
            >
              {navigation.main[5].name}
            </Link>
          </div>
          
          {/* Mobile Logo - Centered */}
          <div className="md:hidden">
            <Link href="/">
              <Image 
                src={business.logo}
                alt={`${business.name} Logo`}
                width={60}
                height={40}
                className="w-[60px] h-[40px] object-contain"
                priority
              />
            </Link>
          </div>
          
          {/* Empty div for mobile layout balance */}
          <div className="md:hidden w-6"></div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black z-[90] pt-24 px-4">
            <div className="flex flex-col space-y-8 items-center text-[22px]">
              <Link 
                href={navigation.main[0].path}
                className="w-full text-center py-2 hover:bg-gray-900 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {navigation.main[0].name}
              </Link>
              <Link 
                href={navigation.main[1].path}
                className="w-full text-center py-2 hover:bg-gray-900 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {navigation.main[1].name}
              </Link>
              <Link 
                href={navigation.main[2].path}
                className="w-full text-center py-2 hover:bg-gray-900 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {navigation.main[2].name}
              </Link>
              <Link 
                href={navigation.main[3].path}
                className="w-full text-center py-2 hover:bg-gray-900 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {navigation.main[3].name}
              </Link>
              <Link 
                href={navigation.main[4].path}
                className="w-full text-center py-2 hover:bg-gray-900 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {navigation.main[4].name}
              </Link>
              <Link 
                href={navigation.main[5].path}
                className="w-full text-center py-2 hover:bg-gray-900 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {navigation.main[5].name}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}