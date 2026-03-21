import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { teamData } from "@/lib/data";

const Team = () => {
  return (
    // bg-white cleanly separates it from the bg-studio-bg of the Programs section
    <section id="team" className="py-24 px-6 md:px-12 bg-white overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <span className="text-studio-primary font-bold tracking-wider uppercase text-sm mb-3 block">
              The Minds Behind Jogire
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-studio-text mb-6">
              Meet Our Team
            </h2>
            <p className="text-studio-muted max-w-2xl mx-auto text-lg md:text-xl font-light">
              Dedicated professionals combining ancient yogic wisdom, modern psychology, and clinical science to guide your journey.
            </p>
          </div>
        </ScrollReveal>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 justify-center">
          {teamData.map((member, index) => (
            <ScrollReveal key={member.id} delay={index * 100}>
              <div 
                tabIndex={0}
                style={{ WebkitTapHighlightColor: 'transparent' }}
                className="group bg-studio-bg rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl focus:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 focus:-translate-y-2 active:scale-[0.98] border border-gray-100 flex flex-col h-full focus:outline-none cursor-pointer"
              >
                
                {/* Image Wrapper */}
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 group-focus:scale-105"
                    unoptimized={true}
                  />
                  {/* Role Badge overlapping the image */}
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                     <span className="bg-white/90 backdrop-blur-md px-5 py-2 rounded-full text-xs font-bold text-studio-text shadow-lg uppercase tracking-wider border border-white/50">
                        {member.role}
                     </span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-8 flex flex-col flex-grow text-center">
                  <h3 className="text-2xl font-bold text-studio-text mb-3 group-hover:text-studio-primary group-focus:text-studio-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-studio-muted text-base leading-relaxed mb-6 flex-grow">
                    {member.description}
                  </p>
                  
                  {/* Dynamic Link */}
                  <Link 
                    href={`/team/${member.slug}`} 
                    className="mt-auto pt-4 flex items-center justify-center text-studio-primary font-bold transition-all duration-300 group-hover:text-studio-accent group-focus:text-studio-accent outline-none"
                  >
                    <span>View Profile</span>
                    <svg 
                      className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1 group-focus:translate-x-1" 
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

      </div>
    </section>
  );
};

export default Team;