"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

// 10 Dummy Testimonials alternating the two provided videos
const mockTestimonials = [
  {
    id: "1",
    name: "Jaanu",
    caption: "Overcame chronic back pain after 6 months of guided practice.",
    preview_url: "https://d20ld9c13m2eci.cloudfront.net/static/testimonials/videos/jaanu.mp4",
    full_video_url: "https://d20ld9c13m2eci.cloudfront.net/static/testimonials/videos/jaanu.mp4",
    thumbnail_url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Parimala",
    caption: "Lost 15kg and managed metabolic health naturally.",
    preview_url: "https://d20ld9c13m2eci.cloudfront.net/static/testimonials/videos/parimala.mp4",
    full_video_url: "https://d20ld9c13m2eci.cloudfront.net/static/testimonials/videos/parimala.mp4",
    thumbnail_url: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Aarti S.",
    caption: "Found mental clarity and reduced severe anxiety.",
    preview_url: "https://d20ld9c13m2eci.cloudfront.net/static/testimonials/videos/jaanu.mp4",
    full_video_url: "https://d20ld9c13m2eci.cloudfront.net/static/testimonials/videos/jaanu.mp4",
    thumbnail_url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Rahul V.",
    caption: "Successfully managed PCOS symptoms through specific flows.",
    preview_url: "https://d20ld9c13m2eci.cloudfront.net/static/testimonials/videos/parimala.mp4",
    full_video_url: "https://d20ld9c13m2eci.cloudfront.net/static/testimonials/videos/parimala.mp4",
    thumbnail_url: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Sneha D.",
    caption: "Improved focus and productivity at work.",
    preview_url: "https://d20ld9c13m2eci.cloudfront.net/static/testimonials/videos/jaanu.mp4",
    full_video_url: "https://d20ld9c13m2eci.cloudfront.net/static/testimonials/videos/jaanu.mp4",
    thumbnail_url: "https://images.unsplash.com/photo-1614983646536-11f4d99e710b?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "6",
    name: "Priya Singh",
    caption: "A life-changing experience during the 7-day retreat.",
    preview_url: "https://d20ld9c13m2eci.cloudfront.net/static/testimonials/videos/parimala.mp4",
    full_video_url: "https://d20ld9c13m2eci.cloudfront.net/static/testimonials/videos/parimala.mp4",
    thumbnail_url: "https://images.unsplash.com/photo-1552286450-37b587b1c3e3?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "7",
    name: "Amit Patel",
    caption: "Regained flexibility I hadn't seen since my twenties.",
    preview_url: "https://d20ld9c13m2eci.cloudfront.net/static/testimonials/videos/jaanu.mp4",
    full_video_url: "https://d20ld9c13m2eci.cloudfront.net/static/testimonials/videos/jaanu.mp4",
    thumbnail_url: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "8",
    name: "Neha Gupta",
    caption: "The combination of Aahar and Yoga transformed my skin and energy.",
    preview_url: "https://d20ld9c13m2eci.cloudfront.net/static/testimonials/videos/parimala.mp4",
    full_video_url: "https://d20ld9c13m2eci.cloudfront.net/static/testimonials/videos/parimala.mp4",
    thumbnail_url: "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "9",
    name: "Kiran R.",
    caption: "My digestion has never been better thanks to the Agni practice.",
    preview_url: "https://d20ld9c13m2eci.cloudfront.net/static/testimonials/videos/jaanu.mp4",
    full_video_url: "https://d20ld9c13m2eci.cloudfront.net/static/testimonials/videos/jaanu.mp4",
    thumbnail_url: "https://images.unsplash.com/photo-1593164842264-854604db2260?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "10",
    name: "Vikram S.",
    caption: "Finally found peace in the middle of a chaotic corporate life.",
    preview_url: "https://d20ld9c13m2eci.cloudfront.net/static/testimonials/videos/parimala.mp4",
    full_video_url: "https://d20ld9c13m2eci.cloudfront.net/static/testimonials/videos/parimala.mp4",
    thumbnail_url: "https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=400&auto=format&fit=crop",
  },
];

const Testimonials = () => {
  const [activeVideo, setActiveVideo] = useState<typeof mockTestimonials[0] | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  // Array of refs to track all preview video elements
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // HTML5 Dialog Modal Logic
  useEffect(() => {
    if (activeVideo && modalRef.current) {
      modalRef.current.showModal();
      document.body.style.overflow = "hidden";
    } else if (modalRef.current) {
      modalRef.current.close();
      document.body.style.overflow = "auto";
    }
  }, [activeVideo]);

  // Intersection Observer for Auto-Play/Pause
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {
               console.log("Autoplay prevented by browser");
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 } 
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-studio-bg overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Centered Header Layout */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-studio-primary font-bold tracking-wider uppercase text-sm mb-3 block">
              Real Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-studio-text mb-6">
              What Our Clients Say
            </h2>
            <p className="text-studio-muted text-lg md:text-xl font-light">
              Hear how our community members transformed their lives through mindful practice and dedication.
            </p>
            
            {/* Centered Desktop Navigation Arrows */}
            <div className="hidden md:flex justify-center space-x-4 mt-8">
              <button onClick={() => scroll("left")} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-studio-muted hover:text-studio-primary hover:border-studio-primary transition-colors focus:outline-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={() => scroll("right")} className="w-12 h-12 rounded-full bg-studio-primary text-white flex items-center justify-center hover:bg-studio-accent transition-colors focus:outline-none shadow-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div 
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {mockTestimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                tabIndex={0}
                onClick={() => setActiveVideo(testimonial)}
                className="group relative flex-shrink-0 w-[75vw] md:w-[280px] lg:w-[320px] aspect-[9/16] rounded-[2rem] overflow-hidden snap-center cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 focus:-translate-y-2 focus:outline-none active:scale-[0.98]"
              >
                
                <Image
                  src={testimonial.thumbnail_url}
                  alt={testimonial.name}
                  fill
                  sizes="(max-width: 768px) 75vw, 320px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={testimonial.preview_url} 
                  muted
                  loop
                  playsInline
                  disablePictureInPicture
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 z-10"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-20" />

                <div className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 text-white">
                  <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                  <h3 className="text-white font-bold text-xl mb-1 drop-shadow-md">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-200 text-sm line-clamp-2 drop-shadow-sm font-light leading-relaxed">
                    {testimonial.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

      </div>

      <dialog 
        ref={modalRef}
        className="backdrop:bg-black/95 backdrop:backdrop-blur-md m-auto bg-transparent p-0 w-full max-w-4xl h-[90vh] md:h-[85vh] rounded-[2rem] overflow-hidden shadow-2xl"
        onClose={() => setActiveVideo(null)}
      >
        {activeVideo && (
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white w-12 h-12 rounded-full flex items-center justify-center border border-white/20 transition-colors focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <video
              src={activeVideo.full_video_url} 
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
              poster={activeVideo.thumbnail_url}
            />
          </div>
        )}
      </dialog>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;