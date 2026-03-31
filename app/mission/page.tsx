import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Our Mission | Jogire",
  description:
    "From Compulsive Bhogi to Conscious Bhogi. Discover how Jogire is transforming modern indulgence into a path for holistic healing and spiritual evolution.",
};

export default function MissionPage() {
  return (
    <main className="bg-studio-bg selection:bg-studio-primary/20 selection:text-studio-primary flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section: Immersive & Cinematic */}
      <section className="relative flex h-[70vh] min-h-[600px] w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2000&auto=format&fit=crop"
            alt="Yoga in Nature"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#111827] via-[#111827]/70 to-transparent" />
        </div>

        <div className="relative z-20 mx-auto mt-24 max-w-4xl px-6 text-center">
          <span className="text-studio-primary mb-4 block text-sm font-bold tracking-widest uppercase drop-shadow-md">
            The Jogire Philosophy
          </span>
          <h1 className="mb-6 text-5xl leading-tight font-extrabold text-white drop-shadow-xl md:text-7xl">
            Empowering Lives <br className="hidden md:block" /> Through Conscious Living
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed font-light text-gray-200 drop-shadow-md md:text-2xl">
            Bridging ancient wisdom with modern lifestyles to foster inner peace and outer strength.
          </p>
        </div>
      </section>

      {/* The Core Conflict: The Modern Struggle */}
      <section className="relative z-20 -mt-10 rounded-t-[3rem] bg-white px-6 py-24 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] md:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-studio-text mb-10 text-3xl font-extrabold md:text-5xl">
            The Modern Struggle: <br className="hidden md:block" />
            <span className="text-studio-primary">Indulgence Without Awareness</span>
          </h2>
          <div className="prose prose-lg md:prose-xl text-studio-muted mx-auto leading-relaxed font-light">
            <p>
              Today, our lifestyles are shaped by impulse, emotional reactivity, and digital
              overstimulation. We consume—not just food, but experiences, relationships, and
              information—in ways that disconnect us from ourselves.
            </p>
            <p>
              This disconnection manifests as chronic gut issues, anxiety, burnout, metabolic
              issues, and spiritual emptiness. At the same time, many who turn toward spirituality
              are not driven by a deep, inner thirst for truth, but by social media trends or life
              setbacks.
            </p>
            <blockquote className="border-studio-primary text-studio-text my-10 rounded-r-2xl border-l-4 bg-orange-50 py-4 pl-6 text-xl font-medium italic md:text-2xl">
              "They attempt to renounce the world forcefully, leading to a cycle of guilt and
              suppression where neither the material nor the spiritual path brings fulfillment."
            </blockquote>
          </div>
        </div>
      </section>

      {/* The Solution: Conscious Bhoga */}
      <section className="bg-studio-bg border-t border-gray-100 px-6 py-24 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 lg:flex-row">
          <div className="order-2 w-full lg:order-1 lg:w-1/2">
            <h2 className="text-studio-text mb-6 text-3xl font-extrabold md:text-4xl">
              Our Realization: <br />
              <span className="text-studio-primary">Conscious Bhoga is the Key</span>
            </h2>
            <div className="text-studio-muted space-y-6 text-lg leading-relaxed font-light">
              <p>
                At Jogire, we do not see <em>bhoga</em> (sensory pleasure) as the enemy. We see it
                as a gateway—a tool that, when approached consciously, can become a catalyst for
                personal growth, healing, and spiritual evolution.
              </p>
              <p>
                We believe the solution is not repression but transformation. Rather than asking
                people to give up the world, we teach them how to live in it with absolute clarity,
                balance, and awareness.
              </p>
              <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <p className="text-studio-text font-medium italic">
                  "We guide individuals to infuse consciousness into their pleasures, turning
                  indulgence from a source of suffering into a path of self-realization."
                </p>
              </div>
            </div>
          </div>

          <div className="relative order-1 w-full lg:order-2 lg:w-1/2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl md:aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
                alt="Meditation and Awareness"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="bg-studio-primary/10 absolute inset-0 mix-blend-multiply" />
            </div>
            <div className="absolute -bottom-8 -left-8 -z-10 h-32 w-32 rounded-full bg-orange-100 opacity-60 blur-2xl" />
          </div>
        </div>
      </section>

      {/* Founder's Journey */}
      <section className="border-t border-gray-100 bg-white px-6 py-24 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <span className="text-studio-primary mb-3 block text-sm font-bold tracking-wider uppercase">
              The Genesis
            </span>
            <h2 className="text-studio-text mb-6 text-3xl font-extrabold md:text-5xl">
              From Suffering to Service
            </h2>
          </div>

          <div className="prose prose-lg md:prose-xl text-studio-muted mx-auto leading-relaxed font-light">
            <p>
              Our mission was born from real, lived experience. Our founder battled with
              debilitating gut health problems, mental distress, and a profound sense of spiritual
              disconnection. He explored every major system of healing—Ayurveda, Allopathy,
              Homeopathy, Siddha—but found no lasting solution.
            </p>
            <p>
              It was only through a holistic lifestyle transformation, combining{" "}
              <strong>Yoga, Mindfulness, and Conscious Eating (Aahar)</strong>, that a miraculous
              shift occurred. This personal healing journey not only restored his health but
              awakened a deeper calling: to help others break free from similar cycles of suffering.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="bg-[#111827] px-6 py-24 text-white md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-3xl font-extrabold md:text-5xl">Our Core Values</h2>
            <p className="mx-auto max-w-2xl text-lg font-light text-gray-400 md:text-xl">
              The pillars that support everything we do at Jogire.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Authenticity",
                desc: "Rooted in the timeless traditions of yoga, we honor its origins while adapting it for today.",
              },
              {
                title: "Empowerment",
                desc: "We equip individuals with practical tools to take charge of their health and happiness.",
              },
              {
                title: "Community",
                desc: "Together, we grow stronger—connecting people through shared values and conscious practices.",
              },
              {
                title: "Balance",
                desc: "Harmony in mind, body, and spirit is the undeniable foundation of a fulfilling life.",
              },
            ].map((value, idx) => (
              <div
                key={idx}
                tabIndex={0} // Allows the div to receive focus on mobile taps
                className="hover:border-studio-primary focus:border-studio-primary active:border-studio-primary group rounded-[2rem] border border-gray-700 bg-[#1f2937] p-8 transition-all duration-300 outline-none active:scale-[0.97]"
              >
                <div className="bg-studio-primary/20 group-active:bg-studio-primary/40 mb-6 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 group-focus:scale-110">
                  <span className="bg-studio-primary h-4 w-4 rounded-full transition-transform group-active:scale-90" />
                </div>
                <h3 className="group-focus:text-studio-primary mb-3 text-2xl font-bold text-white transition-colors">
                  {value.title}
                </h3>
                <p className="leading-relaxed font-light text-gray-400">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW FLOATING ISLAND CTA 
        This replaces the harsh full-bleed orange section. It sits gracefully 
        on the studio-bg and acts as a beautiful transition into the dark footer.
      */}
      <section className="bg-studio-bg border-t border-gray-200 px-6 py-24 md:px-12">
        <div className="bg-studio-primary relative mx-auto max-w-5xl overflow-hidden rounded-[3rem] p-10 text-center shadow-2xl md:p-16">
          {/* Background Pattern/Texture overlaying the orange card */}
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          ></div>

          <div className="relative z-10">
            <h2 className="mb-6 text-4xl font-extrabold text-white drop-shadow-md md:text-5xl lg:text-6xl">
              Be A Part of Our Mission
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed font-light text-orange-50 md:text-xl">
              Join us on this conscious revolution. From compulsive bhogi to conscious bhogi—let’s
              walk this journey together.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/#programs"
                className="text-studio-primary inline-block rounded-full bg-white px-10 py-4 font-bold shadow-xl transition-all duration-300 outline-none hover:bg-gray-50 active:scale-95"
              >
                Explore Programs
              </Link>
              <Link
                href="/contact"
                className="hover:text-studio-primary focus:text-studio-primary inline-block rounded-full border-2 border-white bg-transparent px-10 py-4 font-bold text-white transition-all duration-300 outline-none hover:bg-white focus:bg-white active:scale-95"
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
