import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { gurusData } from "@/lib/gurusData";

export const metadata = {
  title: "Our Gurus & Inspiration | Jogire",
  description: "Discover the timeless wisdom of the spiritual masters, from Shiva (Adiyogi) to modern sages, who inspire the holistic yoga practices at Jogire.",
};

export default function GurusPage() {
  return (
    <main className="min-h-screen bg-studio-bg flex flex-col">
      <Navbar />

      <section className="py-24 px-6 md:px-12 flex-grow">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-20">
            <span className="text-studio-primary font-bold tracking-wider uppercase text-sm mb-3 block">
              The Lineage
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-studio-text mb-6">
              Our Gurus & Inspiration
            </h1>
            <p className="text-lg md:text-xl text-studio-muted max-w-2xl mx-auto font-light leading-relaxed">
              Celebrating the profound wisdom of the spiritual masters who laid the foundation for true yogic transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
            {gurusData.map((guru) => (
              <Link 
                href={`/gurus/${guru.slug}`} 
                key={guru.id}
                // MOBILE FIX: Added focus states and active:scale-[0.98] for tactile tap feedback
                className="group flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl focus:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 focus:-translate-y-2 active:scale-[0.98] border border-gray-100 outline-none"
              >
                <div className="relative w-full pt-[100%] sm:pt-[120%] bg-gray-100 overflow-hidden">
                  <Image
                    src={guru.image}
                    alt={guru.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 group-focus:scale-105"
                  />
                  
                  {/* Desktop Only Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-60 group-focus:opacity-60 transition-opacity duration-300 hidden md:block" />
                  
                  {/* Desktop Only 'Read Bio' Pill */}
                  <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500 z-20">
                    <span className="bg-white/20 backdrop-blur-md text-white font-bold px-6 py-2.5 rounded-full border border-white/30 tracking-wider text-sm uppercase shadow-lg">
                      View Profile
                    </span>
                  </div>
                </div>
                
                <div className="p-6 md:p-8 bg-white flex-grow flex flex-col justify-center items-center text-center z-10 relative">
                  <h2 className="text-xl font-bold text-studio-text group-hover:text-studio-primary group-focus:text-studio-primary transition-colors">
                    {guru.name}
                  </h2>
                  <p className="text-sm text-studio-muted mt-2 font-medium mb-6">
                    {guru.subtitle}
                  </p>

                  {/* MOBILE FIX: Permanently visible CTA that animates on interaction */}
                  <div className="mt-auto flex items-center text-studio-primary font-bold text-sm uppercase tracking-wider transition-colors group-hover:text-studio-accent group-focus:text-studio-accent">
                    <span>Read Bio</span>
                    <svg 
                      className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1 group-focus:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}