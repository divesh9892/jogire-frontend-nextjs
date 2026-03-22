"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // UX Improvement: Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {/* MAIN NAVBAR */}
      <nav className="bg-studio-bg w-full z-40 sticky top-0 border-b border-gray-200 shadow-sm transition-all duration-300">
        
        {/* DESKTOP LAYOUT (Hidden on mobile) */}
        <div className="hidden lg:flex p-4 max-w-7xl mx-auto items-center justify-between">
          
          {/* Logo */}
          <div className="relative h-12 w-32 flex-shrink-0">
            <Link href="/" className="relative block h-12 w-32">
              <Image
                src="https://d20ld9c13m2eci.cloudfront.net/static/branding/logo.svg"
                alt="Jogire Logo"
                fill
                className="object-contain"
                sizes="128px"
                priority
              />
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="flex space-x-8 items-center text-studio-text">
            <Link href="/" className="hover:text-studio-primary font-semibold transition-colors">Home</Link>
            
            {/* About Us Dropdown */}
            <div className="relative group">
              <button
                onClick={toggleDropdown}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                className="hover:text-studio-primary font-semibold flex items-center focus:outline-none transition-colors py-2"
              >
                About Us
                <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${isDropdownOpen ? "rotate-180 text-studio-primary" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div 
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                className={`absolute left-1/2 -translate-x-1/2 top-full mt-0 w-56 bg-white rounded-xl shadow-xl transition-all duration-200 z-50 border border-gray-100 overflow-hidden ${isDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"}`}
              >
                <div className="py-2">
                  <Link href="/gurus" className="block px-5 py-2.5 text-sm text-studio-muted hover:bg-orange-50 hover:text-studio-primary transition-colors font-medium" onClick={() => setIsDropdownOpen(false)}>Our Gurus & Inspiration</Link>
                  <Link href="/mentors" className="block px-5 py-2.5 text-sm text-studio-muted hover:bg-orange-50 hover:text-studio-primary transition-colors font-medium" onClick={() => setIsDropdownOpen(false)}>Our Mentors</Link>
                  <Link href="/mission" className="block px-5 py-2.5 text-sm text-studio-muted hover:bg-orange-50 hover:text-studio-primary transition-colors font-medium" onClick={() => setIsDropdownOpen(false)}>Our Mission</Link>
                  <Link href="/#team" className="block px-5 py-2.5 text-sm text-studio-muted hover:bg-orange-50 hover:text-studio-primary transition-colors font-medium" onClick={() => setIsDropdownOpen(false)}>Our Team</Link>
                </div>
              </div>
            </div>

            {/* In-page Anchor Links */}
            <Link href="/#programs" className="hover:text-studio-primary font-semibold transition-colors">Services</Link>
            <Link href="/#testimonials" className="hover:text-studio-primary font-semibold transition-colors">Testimonials</Link>
            
            <Link href="/contact" className="bg-studio-primary text-white border-2 border-studio-primary px-6 py-2 rounded-full hover:bg-transparent hover:text-studio-primary transition-all duration-300 font-bold shadow-md active:scale-95">
              Contact Us
            </Link>
          </div>
        </div>

        {/* MOBILE LAYOUT (Hidden on desktop) */}
        <div className="flex lg:hidden p-4 items-center justify-center relative h-[72px]">
          
          {/* Centered Logo */}
          <Link href="/" onClick={() => setIsOpen(false)} className="relative block h-10 w-28">
            <Image
              src="https://d20ld9c13m2eci.cloudfront.net/static/branding/logo.svg"
              alt="Jogire Logo"
              fill
              className="object-contain"
              sizes="112px"
              priority
            />
          </Link>

          {/* Absolute Right-Aligned Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="absolute right-4 p-2 text-studio-primary focus:outline-none z-50 active:scale-90 transition-transform"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between items-end">
              <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? "w-6 rotate-45 translate-y-2.5" : "w-6"}`}></span>
              <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? "opacity-0" : "w-5"}`}></span>
              <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? "w-6 -rotate-45 -translate-y-2" : "w-4"}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* MOBILE SIDE DRAWER */}
      
      {/* Backdrop Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={toggleMenu}
        aria-hidden="true"
      />

      {/* Drawer Content */}
      <div className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col lg:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        
        {/* Drawer Header (Upgraded to use Logo instead of text) */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-studio-bg">
          <div className="relative h-8 w-24">
            <Image
              src="https://d20ld9c13m2eci.cloudfront.net/static/branding/logo.svg"
              alt="Jogire Logo"
              fill
              className="object-contain"
              sizes="96px"
            />
          </div>
          <button onClick={toggleMenu} className="p-2 text-gray-400 hover:text-studio-primary bg-white rounded-full shadow-sm active:scale-95 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex-1 overflow-y-auto py-6 px-5 flex flex-col space-y-2">
          <Link href="/" className="px-4 py-3 text-lg font-bold text-studio-text hover:bg-orange-50 hover:text-studio-primary rounded-xl transition-colors active:scale-[0.98]" onClick={toggleMenu}>Home</Link>
        
          {/* Mobile Accordion for About Us */}
          <div className="flex flex-col w-full"> 
            <button 
              onClick={toggleDropdown} 
              className="flex items-center justify-between px-4 py-3 text-lg font-bold text-studio-text hover:bg-orange-50 hover:text-studio-primary rounded-xl transition-colors w-full text-left focus:outline-none active:scale-[0.98]"
            >
              About Us
              <svg className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180 text-studio-primary" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isDropdownOpen ? "max-h-[400px] opacity-100 mt-1 mb-2" : "max-h-0 opacity-0"
              }`}
            >
              <div className="pl-8 pr-4 py-2 flex flex-col space-y-1 border-l-2 border-orange-100 ml-6">
                <Link href="/gurus" className="py-2.5 text-studio-muted font-medium hover:text-studio-primary transition-colors" onClick={toggleMenu}>Our Gurus & Inspiration</Link>
                <Link href="/mentors" className="py-2.5 text-studio-muted font-medium hover:text-studio-primary transition-colors" onClick={toggleMenu}>Our Mentors</Link>
                <Link href="/mission" className="py-2.5 text-studio-muted font-medium hover:text-studio-primary transition-colors" onClick={toggleMenu}>Our Mission</Link>
                <Link href="/#team" className="py-2.5 text-studio-muted font-medium hover:text-studio-primary transition-colors" onClick={toggleMenu}>Our Team</Link>
              </div>
            </div>
          </div>

          <Link href="/#programs" className="px-4 py-3 text-lg font-bold text-studio-text hover:bg-orange-50 hover:text-studio-primary rounded-xl transition-colors active:scale-[0.98]" onClick={toggleMenu}>Services</Link>
          <Link href="/#testimonials" className="px-4 py-3 text-lg font-bold text-studio-text hover:bg-orange-50 hover:text-studio-primary rounded-xl transition-colors active:scale-[0.98]" onClick={toggleMenu}>Testimonials</Link>
        </div>

        {/* Drawer Footer (Sticky at bottom) */}
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <Link href="/contact" className="flex items-center justify-center w-full bg-studio-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-studio-accent transition-colors shadow-lg active:scale-95" onClick={toggleMenu}>
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;