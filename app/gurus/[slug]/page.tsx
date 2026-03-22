import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import { gurusData } from "@/lib/gurusData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic SEO metadata for each specific Guru!
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const guru = gurusData.find((g) => g.slug === resolvedParams.slug);
  
  if (!guru) return { title: "Guru Not Found" };
  const snippet = guru.content[0]?.text || "Discover the timeless wisdom of this spiritual master.";

  return {
    title: `${guru.name} | Jogire Spiritual Lineage`,
    description: snippet.substring(0, 150) + "...", // Extracts a perfect SEO snippet
  };
}

export default async function GuruProfilePage({ params }: PageProps) {
  const resolvedParams = await params;
  const guru = gurusData.find((g) => g.slug === resolvedParams.slug);

  if (!guru) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-studio-bg flex flex-col">
      <Navbar />

      {/* Aesthetic Top Background Banner */}
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-[#111827] z-0 rounded-b-[4rem]" />

      <section className="relative z-10 pt-24 pb-24 px-6 md:px-12 max-w-5xl mx-auto flex-grow">
        
        {/* Navigation Back */}
        <Link 
          href="/gurus" 
          className="inline-flex items-center text-gray-300 hover:text-white transition-colors mb-10 text-sm font-bold tracking-wider uppercase group"
        >
          <svg className="w-5 h-5 mr-2 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Gurus
        </Link>

        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
          
          {/* Hero Header for the Guru */}
          <div className="flex flex-col md:flex-row items-center p-8 md:p-12 lg:p-16 border-b border-gray-100 bg-orange-50/30">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0 mb-8 md:mb-0 md:mr-12">
              <Image
                src={guru.image}
                alt={guru.name}
                fill
                sizes="(max-width: 768px) 192px, 256px"
                className="object-cover object-top"
                priority
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-extrabold text-studio-text mb-4">
                {guru.name}
              </h1>
              <p className="text-xl md:text-2xl text-studio-primary font-medium italic">
                {guru.subtitle}
              </p>
            </div>
          </div>

          {/* The Content Engine */}
          <div className="p-8 md:p-12 lg:p-16 prose prose-lg md:prose-xl text-studio-muted max-w-none prose-headings:text-studio-text prose-a:text-studio-primary">
            {guru.content.map((section, index) => {
              if (section.type === "heading") {
                return <h2 key={index} className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-studio-text">{section.text}</h2>;
              }
              
              if (section.type === "paragraph") {
                return <p key={index} className="leading-relaxed mb-6 font-light">{section.text}</p>;
              }
              
              if (section.type === "list") {
                return (
                  <ul key={index} className="space-y-4 mb-8">
                    {section.items?.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="w-2 h-2 mt-2.5 mr-4 bg-studio-primary rounded-full flex-shrink-0" />
                        <span className="font-light leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              
              if (section.type === "quote") {
                return (
                  <blockquote key={index} className="border-l-4 border-studio-primary pl-6 py-4 my-10 bg-gray-50 rounded-r-2xl italic font-medium text-studio-text text-xl md:text-2xl leading-relaxed">
                    "{section.text}"
                  </blockquote>
                );
              }
              
              return null;
            })}
          </div>

        </div>
      </section>
    </main>
  );
}