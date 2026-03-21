import React from "react";
import ScrollReveal from "./ScrollReveal";

const focusAreas = [
  {
    id: 1,
    title: "Gut Health (Agni)",
    description: "Restore your microbiome and digestive fire through targeted asanas and holistic Aahar guidance.",
    icon: (
      // Fire symbol representing Agni / Digestion
      <svg className="w-7 h-7" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Mental Health",
    description: "Calm the nervous system, reduce chronic anxiety, and find clarity through guided pranayama and dhyana.",
    icon: (
      // Sparkles representing clarity, peace, and mindfulness
      <svg className="w-7 h-7" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Metabolic Health",
    description: "Regulate weight, blood sugar, and energy levels with dynamic yoga flows and lifestyle shifts.",
    icon: (
      // Thunderbolt moved here to represent energy and metabolism
      <svg className="w-7 h-7" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Chronic Back Pain",
    description: "Strengthen your core and naturally decompress your spine with safe, therapeutic alignments.",
    icon: (
      // Standing human figure representing posture and spine
      <svg className="w-7 h-7" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2a2 2 0 100 4 2 2 0 000-4zM6 9l4 2v11h2v-6h2v6h2V11l4-2V7h-4.5L12 9l-3.5-2H6v2z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "PCOD / PCOS",
    description: "Balance hormones and improve reproductive health through highly specialized restorative practices.",
    icon: (
      // Crescent Moon representing natural feminine cycles and balance
      <svg className="w-7 h-7" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "General Fitness",
    description: "Build holistic strength, lasting flexibility, and vital endurance for a vibrant, pain-free daily life.",
    icon: (
      // Heart representing overall health, vitality, and cardio
      <svg className="w-7 h-7" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

const WhatWeDo = () => {
  return (
    <section aria-labelledby="what-we-do-heading" className="py-24 px-6 md:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <span className="text-studio-primary font-bold tracking-wider uppercase text-sm mb-3 block">
              Areas of Healing
            </span>
            <h2 id="what-we-do-heading" className="text-4xl md:text-5xl font-extrabold text-studio-text mb-6">
              What We Do
            </h2>
            <p className="text-studio-muted max-w-2xl mx-auto text-lg md:text-xl font-light">
              True wellness is not one-size-fits-all. We focus on specific health outcomes to help you heal naturally from the inside out.
            </p>
          </div>
        </ScrollReveal>

        {/* Bento Box Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {focusAreas.map((area) => (
            <ScrollReveal key={area.id}>
              
              {/* MOBILE FIRST: Tactile interactions, Focus tracking, and smooth borders */}
              <div 
                tabIndex={0}
                style={{ WebkitTapHighlightColor: 'transparent' }}
                className="group flex flex-col p-8 rounded-[2rem] bg-gray-50 hover:bg-orange-50 focus:bg-orange-50 transition-colors duration-500 border border-gray-100 hover:border-orange-200 focus:border-orange-200 active:scale-[0.98] cursor-pointer focus:outline-none h-full"
              >
                <div className="flex items-center mb-5">
                  <div className="w-12 h-12 rounded-full bg-white text-studio-primary flex items-center justify-center shadow-sm group-hover:scale-110 group-focus:scale-110 transition-transform duration-500">
                    {area.icon}
                  </div>
                  <h3 className="text-xl font-bold text-studio-text ml-4 group-hover:text-studio-primary group-focus:text-studio-primary transition-colors">
                    {area.title}
                  </h3>
                </div>
                
                <p className="text-studio-muted leading-relaxed text-base">
                  {area.description}
                </p>
              </div>

            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhatWeDo;