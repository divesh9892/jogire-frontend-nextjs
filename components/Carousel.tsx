"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// Enterprise Pattern: Define data structures outside the component 
// or pass them as props to keep the component pure.
const carouselData = [
  {
    id: 1,
    src: "https://jogire.s3.ap-south-1.amazonaws.com/static/carousel/test2.jpg",
    alt: "A peaceful yoga studio setup with natural lighting",
  },
  {
    id: 2,
    src: "https://media.istockphoto.com/id/1830268749/photo/active-african-american-pregnant-woman-practicing-yoga-sitting-in-butterfly-or-konasana-pose.jpg?s=1024x1024&w=is&k=20&c=r9TDIYp9XEatEjSVTaPPSuWDy1ujBQ63snRj92FIKJU=",
    alt: "Pregnant woman practicing prenatal yoga in butterfly pose",
  },
  {
    id: 3,
    src: "https://media.istockphoto.com/id/1474998089/photo/woman-in-lotus-pose-yoga-studio.jpg?s=1024x1024&w=is&k=20&c=fEUd_CcvsXdaKN5MtwogpZ7-G3j8pqItl55rc-bphoA=",
    alt: "Woman meditating in full lotus pose finding inner peace",
  },
  {
    id: 4,
    src: "https://media.istockphoto.com/id/2149222806/photo/active-seniors-stretching-on-exercise-class-in-a-health-club.jpg?s=1024x1024&w=is&k=20&c=8jdaAO9NGGxoCJyH2HxHEAfir9WQUyf_HpLUXv-u_iM=",
    alt: "Active seniors participating in a group stretching and wellness class",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px) to trigger a slide change
  const minSwipeDistance = 50;

  // useCallback prevents these functions from being recreated on every render
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1));
  }, []);

  // Auto-play logic
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 6000); // 6 seconds is less aggressive than 5
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touch end to prevent false positives
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section 
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      aria-label="Yoga Studio Gallery"
    >
      <div 
        className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[400px] overflow-hidden rounded-3xl shadow-2xl group"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEndHandler}
      >
        {/* Carousel Track */}
        <div 
          className="flex w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {carouselData.map((slide, index) => (
            <div 
              key={slide.id} 
              className="relative w-full h-full flex-shrink-0"
              aria-hidden={currentIndex !== index} // SEO/A11y: Hide inactive slides from screen readers
            >
              {/* Next.js Image Component for SEO and Performance */}
              <Image
                src={slide.src}
                alt={slide.alt} // Crucial for SEO image search
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="object-cover"
                priority={index === 0} // Only preload the first image to save bandwidth
                loading={index === 0 ? "eager" : "lazy"}
                unoptimized={true}
              />
              {/* Dark Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
          ))}
        </div>

        {/* Static Text Content overlaying the carousel */}
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center text-white p-8 sm:p-12 z-20 pointer-events-none">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Discover Your Inner Strength
          </h2>
          <p className="text-lg sm:text-xl max-w-2xl font-light drop-shadow-md text-gray-100">
            A journey to a healthier and more peaceful you starts here.
          </p>
        </div>

        {/* Navigation Arrows (Visible on hover on desktop) */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-studio-primary backdrop-blur-md text-white p-3 sm:p-4 rounded-full shadow-lg z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white border border-white/20"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-studio-primary backdrop-blur-md text-white p-3 sm:p-4 rounded-full shadow-lg z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white border border-white/20"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </button>

        {/* Interactive Dot Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 transition-all duration-500 rounded-full ${
                currentIndex === index
                  ? "w-8 bg-studio-primary"
                  : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;