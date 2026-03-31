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
    <main className="bg-studio-bg flex min-h-screen flex-col">
      <Navbar />

      {/* Aesthetic Top Background Banner */}
      <div className="absolute top-0 left-0 z-0 h-[60vh] w-full rounded-b-[4rem] bg-[#111827]" />

      <section className="relative z-10 mx-auto max-w-5xl flex-grow px-6 pt-24 pb-24 md:px-12">
        {/* Navigation Back */}
        <Link
          href="/gurus"
          className="group mb-10 inline-flex items-center text-sm font-bold tracking-wider text-gray-300 uppercase transition-colors hover:text-white"
        >
          <svg
            className="mr-2 h-5 w-5 transform transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Gurus
        </Link>

        <div className="overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-2xl">
          {/* Hero Header for the Guru */}
          <div className="flex flex-col items-center border-b border-gray-100 bg-orange-50/30 p-8 md:flex-row md:p-12 lg:p-16">
            <div className="relative mb-8 h-48 w-48 flex-shrink-0 overflow-hidden rounded-full border-4 border-white shadow-lg md:mr-12 md:mb-0 md:h-64 md:w-64">
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
              <h1 className="text-studio-text mb-4 text-4xl font-extrabold md:text-5xl">
                {guru.name}
              </h1>
              <p className="text-studio-primary text-xl font-medium italic md:text-2xl">
                {guru.subtitle}
              </p>
            </div>
          </div>

          {/* The Content Engine */}
          <div className="prose prose-lg md:prose-xl text-studio-muted prose-headings:text-studio-text prose-a:text-studio-primary max-w-none p-8 md:p-12 lg:p-16">
            {guru.content.map((section, index) => {
              if (section.type === "heading") {
                return (
                  <h2
                    key={index}
                    className="text-studio-text mt-12 mb-6 text-2xl font-bold md:text-3xl"
                  >
                    {section.text}
                  </h2>
                );
              }

              if (section.type === "paragraph") {
                return (
                  <p key={index} className="mb-6 leading-relaxed font-light">
                    {section.text}
                  </p>
                );
              }

              if (section.type === "list") {
                return (
                  <ul key={index} className="mb-8 space-y-4">
                    {section.items?.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="bg-studio-primary mt-2.5 mr-4 h-2 w-2 flex-shrink-0 rounded-full" />
                        <span className="leading-relaxed font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              if (section.type === "quote") {
                return (
                  <blockquote
                    key={index}
                    className="border-studio-primary text-studio-text my-10 rounded-r-2xl border-l-4 bg-gray-50 py-4 pl-6 text-xl leading-relaxed font-medium italic md:text-2xl"
                  >
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
