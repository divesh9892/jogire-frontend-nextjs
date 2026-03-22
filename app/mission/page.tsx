import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Our Mission | Jogire",
  description: "From Compulsive Bhogi to Conscious Bhogi. Discover how Jogire is transforming modern indulgence into a path for holistic healing and spiritual evolution.",
};

export default function MissionPage() {
  return (
    <main className="min-h-screen bg-studio-bg flex flex-col selection:bg-studio-primary/20 selection:text-studio-primary">
      <Navbar />

      {/* Hero Section: Immersive & Cinematic */}
      <section className="relative w-full h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2000&auto=format&fit=crop"
            alt="Yoga in Nature"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/70 to-transparent z-10" />
        </div>
        
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center mt-24">
          <span className="text-studio-primary font-bold tracking-widest uppercase text-sm mb-4 block drop-shadow-md">
            The Jogire Philosophy
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-xl">
            Empowering Lives <br className="hidden md:block"/> Through Conscious Living
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Bridging ancient wisdom with modern lifestyles to foster inner peace and outer strength.
          </p>
        </div>
      </section>

      {/* The Core Conflict: The Modern Struggle */}
      <section className="py-24 px-6 md:px-12 bg-white relative z-20 -mt-10 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-studio-text mb-10">
            The Modern Struggle: <br className="hidden md:block"/>
            <span className="text-studio-primary">Indulgence Without Awareness</span>
          </h2>
          <div className="prose prose-lg md:prose-xl text-studio-muted mx-auto font-light leading-relaxed">
            <p>
              Today, our lifestyles are shaped by impulse, emotional reactivity, and digital overstimulation. We consume—not just food, but experiences, relationships, and information—in ways that disconnect us from ourselves.
            </p>
            <p>
              This disconnection manifests as chronic gut issues, anxiety, burnout, metabolic issues, and spiritual emptiness. At the same time, many who turn toward spirituality are not driven by a deep, inner thirst for truth, but by social media trends or life setbacks. 
            </p>
            <blockquote className="border-l-4 border-studio-primary pl-6 py-4 my-10 bg-orange-50 rounded-r-2xl italic font-medium text-studio-text text-xl md:text-2xl">
              "They attempt to renounce the world forcefully, leading to a cycle of guilt and suppression where neither the material nor the spiritual path brings fulfillment."
            </blockquote>
          </div>
        </div>
      </section>

      {/* The Solution: Conscious Bhoga */}
      <section className="py-24 px-6 md:px-12 bg-studio-bg border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-extrabold text-studio-text mb-6">
              Our Realization: <br/>
              <span className="text-studio-primary">Conscious Bhoga is the Key</span>
            </h2>
            <div className="space-y-6 text-lg text-studio-muted font-light leading-relaxed">
              <p>
                At Jogire, we do not see <em>bhoga</em> (sensory pleasure) as the enemy. We see it as a gateway—a tool that, when approached consciously, can become a catalyst for personal growth, healing, and spiritual evolution.
              </p>
              <p>
                We believe the solution is not repression but transformation. Rather than asking people to give up the world, we teach them how to live in it with absolute clarity, balance, and awareness.
              </p>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-8">
                <p className="font-medium text-studio-text italic">
                  "We guide individuals to infuse consciousness into their pleasures, turning indulgence from a source of suffering into a path of self-realization."
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 order-1 lg:order-2 relative">
            <div className="aspect-[4/5] md:aspect-square relative rounded-[2.5rem] overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
                alt="Meditation and Awareness"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-studio-primary/10 mix-blend-multiply" />
            </div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-orange-100 rounded-full -z-10 blur-2xl opacity-60" />
          </div>

        </div>
      </section>

      {/* Founder's Journey */}
      <section className="py-24 px-6 md:px-12 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-studio-primary font-bold tracking-wider uppercase text-sm mb-3 block">
              The Genesis
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-studio-text mb-6">
              From Suffering to Service
            </h2>
          </div>
          
          <div className="prose prose-lg md:prose-xl text-studio-muted mx-auto font-light leading-relaxed">
            <p>
              Our mission was born from real, lived experience. Our founder battled with debilitating gut health problems, mental distress, and a profound sense of spiritual disconnection. He explored every major system of healing—Ayurveda, Allopathy, Homeopathy, Siddha—but found no lasting solution.
            </p>
            <p>
              It was only through a holistic lifestyle transformation, combining <strong>Yoga, Mindfulness, and Conscious Eating (Aahar)</strong>, that a miraculous shift occurred. This personal healing journey not only restored his health but awakened a deeper calling: to help others break free from similar cycles of suffering. 
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="py-24 px-6 md:px-12 bg-[#111827] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
              Our Core Values
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light">
              The pillars that support everything we do at Jogire.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Authenticity", desc: "Rooted in the timeless traditions of yoga, we honor its origins while adapting it for today." },
              { title: "Empowerment", desc: "We equip individuals with practical tools to take charge of their health and happiness." },
              { title: "Community", desc: "Together, we grow stronger—connecting people through shared values and conscious practices." },
              { title: "Balance", desc: "Harmony in mind, body, and spirit is the undeniable foundation of a fulfilling life." }
            ].map((value, idx) => (
              <div 
                key={idx} 
                tabIndex={0} // Allows the div to receive focus on mobile taps
                className="bg-[#1f2937] p-8 rounded-[2rem] border border-gray-700 hover:border-studio-primary focus:border-studio-primary active:border-studio-primary active:scale-[0.97] transition-all duration-300 group outline-none"
              >
                <div className="w-12 h-12 bg-studio-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-focus:scale-110 group-active:bg-studio-primary/40 transition-all duration-300">
                  <span className="w-4 h-4 bg-studio-primary rounded-full group-active:scale-90 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-focus:text-studio-primary transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-400 font-light leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW FLOATING ISLAND CTA 
        This replaces the harsh full-bleed orange section. It sits gracefully 
        on the studio-bg and acts as a beautiful transition into the dark footer.
      */}
      <section className="py-24 px-6 md:px-12 bg-studio-bg border-t border-gray-200">
        <div className="max-w-5xl mx-auto bg-studio-primary rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          
          {/* Background Pattern/Texture overlaying the orange card */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-md">
              Be A Part of Our Mission
            </h2>
            <p className="text-lg md:text-xl text-orange-50 mb-10 font-light leading-relaxed max-w-2xl mx-auto">
              Join us on this conscious revolution. From compulsive bhogi to conscious bhogi—let’s walk this journey together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#programs"
                className="inline-block bg-white text-studio-primary font-bold py-4 px-10 rounded-full hover:bg-gray-50 active:scale-95 transition-all duration-300 shadow-xl outline-none"
              >
                Explore Programs
              </Link>
              <Link
                href="/contact"
                className="inline-block bg-transparent border-2 border-white text-white font-bold py-4 px-10 rounded-full hover:bg-white hover:text-studio-primary focus:bg-white focus:text-studio-primary active:scale-95 transition-all duration-300 outline-none"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}