"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { programsData } from "@/lib/data";

const Programs = () => {
  return (
    <section id="programs" className="py-24 px-6 md:px-12 bg-studio-bg overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-studio-primary font-bold tracking-wider uppercase text-sm mb-3 block">
              Our Offerings
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-studio-text mb-6">
              Specialized Programs
            </h2>
            <p className="text-studio-muted max-w-2xl mx-auto text-lg md:text-xl font-light">
              Discover your path. From personalized online sessions to immersive retreats, we have curated experiences for every step of your journey.
            </p>
          </div>
        </ScrollReveal>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {programsData.map((program, index) => (
            <ScrollReveal key={program.id} delay={index * 100}>
              
              {/* Refined Card: Removed the bulky button, made the whole card a tactile element */}
              <div 
                tabIndex={0}
                style={{ WebkitTapHighlightColor: 'transparent' }}
                className="group bg-studio-bg rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl focus:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 focus:-translate-y-2 active:scale-[0.98] border border-gray-100 flex flex-col h-full focus:outline-none cursor-pointer"
              >
                
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-200">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 group-focus:scale-110"
                    unoptimized={true}
                  />
                  {/* Format Badge (Replaces Category) */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-studio-text shadow-sm uppercase tracking-wider">
                    {program.format}
                  </div>
                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-sm flex items-center tracking-wide">
                    <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {program.duration}
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl md:text-2xl font-bold text-studio-text mb-3 group-hover:text-studio-primary group-focus:text-studio-primary transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-studio-muted text-base leading-relaxed mb-6 flex-grow">
                    {program.description}
                  </p>
                  
                  {/* Sleek Animated Link */}
                  {/* FIX: Updated the href to use the dynamic slug route */}
                  <Link 
                    href={`/programs/${program.slug}`} 
                    className="mt-auto pt-4 flex items-center text-studio-primary font-bold transition-all duration-300 group-hover:text-studio-accent group-focus:text-studio-accent outline-none"
                  >
                    <span className="mr-2">Explore Program</span>
                    <svg 
                      className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-2 group-focus:translate-x-2" 
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* THE NEW DEDICATED CTA BANNER */}
        <ScrollReveal delay={200}>
          <div className="mt-20 bg-orange-50 border border-orange-100 rounded-[2.5rem] p-8 md:p-14 flex flex-col lg:flex-row items-center justify-between text-center lg:text-left shadow-sm">
            <div className="max-w-2xl mb-8 lg:mb-0 lg:pr-8">
              <h3 className="text-3xl md:text-4xl font-bold text-studio-text mb-4">
                Not sure where to start?
              </h3>
              <p className="text-lg text-studio-muted leading-relaxed">
                Book a free consultation session with our experts. We will assess your goals, health conditions, and guide you to the perfect program.
              </p>
            </div>
            <Link 
              href="#book-session" 
              className="whitespace-nowrap bg-studio-primary text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-studio-accent focus:bg-studio-accent focus:outline-none focus:ring-4 focus:ring-orange-200 transition-all duration-300 shadow-lg transform hover:-translate-y-1 active:scale-95"
            >
              Book Free Session
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default Programs;