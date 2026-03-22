"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Typewriter from "./Typewriter";

const heroSlides = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2000&auto=format&fit=crop",
    alt: "People practicing yoga in a serene studio",
  },
  {
    id: 2,
    src: "https://d20ld9c13m2eci.cloudfront.net/static/carousel/test2.jpg",
    alt: "A peaceful yoga studio setup with natural lighting",
  },
  {
    id: 3,
    src: "https://media.istockphoto.com/id/1830268749/photo/active-african-american-pregnant-woman-practicing-yoga-sitting-in-butterfly-or-konasana-pose.jpg?s=1024x1024&w=is&k=20&c=r9TDIYp9XEatEjSVTaPPSuWDy1ujBQ63snRj92FIKJU=",
    alt: "Pregnant woman practicing prenatal yoga in butterfly pose",
  },
  {
    id: 4,
    src: "https://media.istockphoto.com/id/1474998089/photo/woman-in-lotus-pose-yoga-studio.jpg?s=1024x1024&w=is&k=20&c=fEUd_CcvsXdaKN5MtwogpZ7-G3j8pqItl55rc-bphoA=",
    alt: "Woman meditating in full lotus pose finding inner peace",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const messages = [
    "Compromised physical and mental health for job, money, and family responsibilities? Join us to make yourself a priority.",
    "Reclaim your energy, focus, and inner peace. Your well-being matters.",
    "Start your journey from being a compulsive bhogi to a conscious bhogi.",
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  }, []);

 useEffect(() => {
    const slideInterval = setInterval(nextSlide, 7000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  // Touch Handlers for Mobile Swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide(); // Swiped left
    } else if (distance < -minSwipeDistance) {
      prevSlide(); // Swiped right
    }
  };

  return (
    // FIX 1: Changed min-h-[90vh] to min-h-[100dvh] (dynamic viewport height) 
    // to ensure it fills the screen perfectly on mobile browsers, accounting for address bars.
    <section 
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      
      {/* Background Carousel */}
      {heroSlides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={currentSlide !== index}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30 z-10" />

      {/* Hero Content Container 
          FIX 2: Added pb-24 (padding-bottom) to ensure content never hits the bottom indicators.
          Added pt-20 to push content down slightly on desktop for better vertical centering.
      */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col items-start justify-center h-full pt-20 pb-24 md:pb-32">
        <div className="max-w-3xl text-left animate-fade-in-up w-full">
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            Take charge of your health with{" "}
            <span className="text-studio-primary block mt-2 drop-shadow-md">Yoga, Mindfulness & Aahar</span>
          </h1>
          
          {/* FIX 3: Added a wrapper with a strict minimum height to prevent layout shifts 
              on mobile when the typewriter effect loops through sentences of different lengths.
          */}
          <div className="min-h-[120px] sm:min-h-[80px] md:min-h-[90px] mb-8">
            <Typewriter
              messages={messages}
              typingSpeed={50}
              deletingSpeed={30}
              pauseTime={4000}
              className="text-lg md:text-xl text-gray-200 font-light leading-relaxed max-w-2xl drop-shadow-sm"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="/book" 
              className="bg-studio-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-studio-accent transition-all duration-300 shadow-lg text-center transform hover:-translate-y-1 w-full sm:w-auto"
            >
              Book Free Session
            </Link>
            <Link 
              href="#programs-scroll" 
              className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-studio-text transition-all duration-300 text-center w-full sm:w-auto"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Indicators 
          FIX 4: Added a subtle dark pill background (bg-black/20 backdrop-blur-sm) behind the dots 
          so they are always visible and distinct from the rest of the UI.
          Lowered them slightly with bottom-6.
      */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-30 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 transition-all duration-500 rounded-full ${
              currentSlide === index ? "w-8 bg-studio-primary" : "w-2 bg-white/60 hover:bg-white"
            }`}
            aria-label={`Go to background slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;