import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import siteData from '@/data/siteData.json';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { personal, business, navigation, services } = siteData;

    return (
        <footer className="text-white py-6 px-4 md:px-8 lg:px-16">
            <div className="max-w-[1440px] mx-auto flex flex-wrap border-t md:border-none pt-12 border-[#333]">
                {/* Logo and copyright section */}
                <div className="hidden md:flex flex-col space-y-4 w-full lg:w-[35%] pr-0 lg:pr-8 mb-8 lg:mb-0">
                    <div className="flex flex-col items-start">
                        <Image
                            src={business.logo}
                            alt={`${business.name} Logo`}
                            width={80}
                            height={60}
                            className="w-[80px] h-[60px] object-contain"
                            priority
                        />
                        <h2 className="text-xl font-bold mt-3">{business.name}</h2>
                        <p className="text-sm text-gray-400 mt-3 max-w-xs">{business.tagline}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-400">{currentYear} © - Made by <span className="font-bold">{personal.name}</span></p>
                        <p className="text-sm text-gray-400">All rights reserved</p>
                    </div>
                </div>

                {/* Navigation sections */}
                <div className="w-full lg:w-[65%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center md:text-left">
                    {/* Services section */}
                    <div>
                        <h3 className="font-bold mb-3">Services</h3>
                        <ul className="space-y-2">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <Link href={service.path} className="text-gray-300 hover:text-white transition duration-300">
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links section */}
                    <div>
                        <h3 className="font-bold mb-3">Links</h3>
                        <ul className="space-y-2">
                            {navigation.main.map((item, index) => (
                                <li key={index}>
                                    <Link href={item.path} className="text-gray-300 hover:text-white transition duration-300">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact and Social section */}
                    <div className="md:col-span-2 lg:col-span-1 mt-6 md:mt-8 lg:mt-0">
                        <h3 className="font-bold text-lg mb-3">Contact me</h3>
                        <ul className="space-y-2">
                            <li className="text-gray-300 hover:text-white transition duration-300">{personal.email}</li>
                            <li className="text-gray-300 hover:text-white transition duration-300">{personal.phone}</li>
                        </ul>

                        {/* Newsletter Signup */}
                        <div className="mt-8 p-4 bg-[#111] rounded-md border border-[#333] md:bg-transparent md:p-0 md:border-0 md:rounded-none">
                            <h3 className="font-bold text-lg mb-3">Join our newsletter</h3>
                            <form className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="bg-[#1a1a1a] border border-[#333] text-white text-sm px-4 py-3 md:py-2 rounded-md md:rounded-sm focus:outline-none focus:border-gray-400 w-full max-w-full md:max-w-[200px] lg:max-w-[160px]"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="text-sm bg-[#333] text-white border border-[#444] px-4 py-3 md:py-2 w-full md:w-auto rounded-md md:rounded-sm hover:bg-[#444] md:hover:bg-gray-200 md:bg-white md:text-black md:border-transparent transition duration-300 whitespace-nowrap"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center justify-center mt-6 md:mt-12 gap-4 md:border-t md:border-[#333] md:pt-6">
                <Link href={personal.socialLinks.upwork} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 rounded-full bg-[#ffffff] text-black hover:opacity-80 transition duration-300">
                    <SiUpwork size={18} />
                </Link>
                <Link href={personal.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 rounded-full bg-[#ffffff] text-black hover:opacity-80 transition duration-300">
                    <FaFacebookF size={18} />
                </Link>
                <Link href={personal.socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 rounded-full bg-[#ffffff] text-black hover:opacity-80 transition duration-300">
                    <FaGithub size={18} />
                </Link>
                <Link href={personal.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 rounded-full bg-[#ffffff] text-black hover:opacity-80 transition duration-300">
                    <FaLinkedinIn size={18} />
                </Link>
            </div>

            {/* Mobile logo and copyright - shown only on mobile at the bottom */}
            <div className="md:hidden flex flex-col items-center mt-12 pt-12 md:pt-6 border-t border-[#333]">
                <Image
                    src={business.logo}
                    alt={`${business.name} Logo`}
                    width={80}
                    height={60}
                    className="w-[80px] h-[60px] object-contain"
                    priority
                />
                <h2 className="text-2xl font-bold mt-6 mb-4">{business.name}</h2>

                <div className="text-center">
                    <p className="text-sm text-gray-400">{currentYear} © - Made by <span className="font-bold">{personal.name}</span></p>
                    <p className="text-sm text-gray-400">All rights reserved</p>
                </div>
            </div>
        </footer>
    );
}