import ScrollReveal from "./ScrollReveal";

const features = [
  {
    id: 1,
    title: "Rooted in Tradition",
    description: "Authentic classical yoga practices taught exactly as they were designed by the ancient yogic systems.",
    icon: (
      // Lotus / Meditation Icon
      <svg className="w-8 h-8" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Holistic Ecosystem",
    description: "We don't just focus on asanas. We integrate Yoga, Mindfulness, and Aahar (diet) for complete transformation.",
    icon: (
      // Infinity / Ecosystem Icon
      <svg className="w-8 h-8" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Expert Practitioners",
    description: "Learn from certified, deeply dedicated teachers who live the yogic lifestyle, not just instruct it.",
    icon: (
      // Badge / Certification Icon
      <svg className="w-8 h-8" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.956 11.956 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: 4,
    // THE NEW PILLAR
    title: "Community & Connection",
    description: "Practice from anywhere while drawing energy from a supportive, vibrant virtual community of mindful individuals.",
    icon: (
      // People / Community Icon
      <svg className="w-8 h-8" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

const WhyChooseUs = () => {
  return (
    <section 
      aria-labelledby="why-choose-us-heading" 
      className="py-24 px-6 md:px-12 bg-studio-bg border-b border-gray-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <span className="text-studio-primary font-bold tracking-wider uppercase text-sm mb-3 block">
              The Jogire Difference
            </span>
            <h2 id="why-choose-us-heading" className="text-4xl md:text-5xl font-extrabold text-studio-text mb-6">
              Why Choose Us?
            </h2>
            <p className="text-studio-muted max-w-2xl mx-auto text-lg md:text-xl font-light">
              Experience the perfect blend of ancient wisdom and modern wellness tailored for your physical and mental growth.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {features.map((feature) => (
            <ScrollReveal key={feature.id}>
              {/* Added h-full and flex-grow to children for perfect grid alignment */}
              <div 
                tabIndex={0} 
                style={{ WebkitTapHighlightColor: 'transparent' }} 
                className="group flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl transition-all duration-300 hover:bg-white focus:bg-white hover:shadow-xl focus:shadow-xl active:scale-[0.98] border border-transparent hover:border-gray-100 focus:border-gray-100 h-full focus:outline-none cursor-pointer sm:cursor-default"
              >
                
                <div className="w-20 h-20 rounded-2xl bg-orange-50 text-studio-primary flex items-center justify-center mb-6 transform transition-transform duration-500 group-hover:scale-110 group-focus:scale-110 group-hover:rotate-3 group-focus:rotate-3 shadow-sm border border-orange-100 flex-shrink-0">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-studio-text mb-3 group-hover:text-studio-primary group-focus:text-studio-primary transition-colors">
                  {feature.title}
                </h3>
                
                {/* flex-grow ensures the cards stretch equally even if text length varies */}
                <p className="text-studio-muted leading-relaxed text-sm md:text-base flex-grow">
                  {feature.description}
                </p>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;