import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { gurusData } from "@/lib/gurusData";

export const metadata = {
  title: "Our Gurus & Inspiration | Jogire",
  description:
    "Discover the timeless wisdom of the spiritual masters, from Shiva (Adiyogi) to modern sages, who inspire the holistic yoga practices at Jogire.",
};

export default function GurusPage() {
  return (
    <main className="bg-studio-bg flex min-h-screen flex-col">
      <Navbar />

      <section className="flex-grow px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <span className="text-studio-primary mb-3 block text-sm font-bold tracking-wider uppercase">
              The Lineage
            </span>
            <h1 className="text-studio-text mb-6 text-4xl font-extrabold md:text-5xl lg:text-6xl">
              Our Gurus & Inspiration
            </h1>
            <p className="text-studio-muted mx-auto max-w-2xl text-lg leading-relaxed font-light md:text-xl">
              Celebrating the profound wisdom of the spiritual masters who laid the foundation for
              true yogic transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 xl:grid-cols-4">
            {gurusData.map((guru) => (
              <Link
                href={`/gurus/${guru.slug}`}
                key={guru.id}
                // MOBILE FIX: Added focus states and active:scale-[0.98] for tactile tap feedback
                className="group flex transform flex-col overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm transition-all duration-300 outline-none hover:-translate-y-2 hover:shadow-2xl focus:-translate-y-2 focus:shadow-2xl active:scale-[0.98]"
              >
                <div className="relative w-full overflow-hidden bg-gray-100 pt-[100%] sm:pt-[120%]">
                  <Image
                    src={guru.image}
                    alt={guru.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 group-focus:scale-105"
                  />

                  {/* Desktop Only Dark Overlay */}
                  <div className="absolute inset-0 hidden bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-60 group-focus:opacity-60 md:block" />

                  {/* Desktop Only 'Read Bio' Pill */}
                  <div className="absolute inset-0 z-20 hidden items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus:opacity-100 md:flex">
                    <span className="rounded-full border border-white/30 bg-white/20 px-6 py-2.5 text-sm font-bold tracking-wider text-white uppercase shadow-lg backdrop-blur-md">
                      View Profile
                    </span>
                  </div>
                </div>

                <div className="relative z-10 flex flex-grow flex-col items-center justify-center bg-white p-6 text-center md:p-8">
                  <h2 className="text-studio-text group-hover:text-studio-primary group-focus:text-studio-primary text-xl font-bold transition-colors">
                    {guru.name}
                  </h2>
                  <p className="text-studio-muted mt-2 mb-6 text-sm font-medium">{guru.subtitle}</p>

                  {/* MOBILE FIX: Permanently visible CTA that animates on interaction */}
                  <div className="text-studio-primary group-hover:text-studio-accent group-focus:text-studio-accent mt-auto flex items-center text-sm font-bold tracking-wider uppercase transition-colors">
                    <span>Read Bio</span>
                    <svg
                      className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1 group-focus:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
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
