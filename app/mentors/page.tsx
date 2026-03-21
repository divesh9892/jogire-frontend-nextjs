import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { mentorsData } from "@/lib/mentorsData";

export const metadata = {
  title: "Our Mentors | Jogire",
  description: "Meet the guiding light of Jogire. We are deeply honored to be guided by Dr. Chinmay Pandya, bridging the realms of science and spirituality.",
};

export default function MentorsPage() {
  return (
    <main className="min-h-screen bg-studio-bg flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 to-studio-bg z-10" />
        </div>
        
        <div className="relative z-20 max-w-4xl mx-auto px-6 md:px-12 text-center">
          <span className="text-studio-primary font-bold tracking-wider uppercase text-sm mb-4 block">
            Guiding Light
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-studio-text mb-6">
            Our Mentors
          </h1>
          <p className="text-lg md:text-2xl text-studio-muted font-light leading-relaxed">
            We are deeply honored to be guided by the wisdom and visionary leadership of {mentorsData.name}.
          </p>
        </div>
      </section>

      {/* Editorial Content Section */}
      <section className="px-6 md:px-12 pb-24 flex-grow">
        <div className="max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Section 1: Introduction (Image Top, Text Below on Mobile | Image Left, Text Right on Desktop) */}
          <div className="flex flex-col lg:flex-row border-b border-gray-100">
            <div className="w-full lg:w-2/5 relative min-h-[400px] lg:min-h-full">
              <Image
                src={mentorsData.images[0]}
                alt={mentorsData.name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top"
                priority
                unoptimized={true}
              />
            </div>
            <div className="w-full lg:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-studio-text mb-2">
                {mentorsData.name}
              </h2>
              <p className="text-lg text-studio-primary font-bold mb-1">
                {mentorsData.title}
              </p>
              <p className="text-sm text-studio-muted font-medium mb-8">
                {mentorsData.credentials}
              </p>
              
              <div className="prose prose-lg text-studio-muted font-light leading-relaxed max-w-none">
                {mentorsData.sections[0].content.map((block, idx) => (
                  <p key={idx} className="mb-6">{block.text}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Contributions & Leadership (Full Width Text with Styled List) */}
          <div className="p-8 md:p-12 lg:p-16 bg-gray-50 border-b border-gray-100">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-studio-text mb-8 text-center md:text-left">
                {mentorsData.sections[1].heading}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-12">
                {mentorsData.sections[1].content[0].items?.map((item, idx) => {
                  // Split the bold title from the description if it contains a dash
                  const parts = item.split("–");
                  return (
                    <div key={idx} className="flex items-start mb-4">
                      <span className="w-2 h-2 mt-2.5 mr-4 bg-studio-primary rounded-full flex-shrink-0" />
                      <p className="text-studio-muted text-base leading-relaxed">
                        {parts.length > 1 ? (
                          <>
                            <strong className="text-studio-text">{parts[0].trim()}</strong> – {parts.slice(1).join("–").trim()}
                          </>
                        ) : (
                          item
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 3: Global Impact (Image Right, Text Left on Desktop) */}
          <div className="flex flex-col-reverse lg:flex-row">
            <div className="w-full lg:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-studio-text mb-6">
                {mentorsData.sections[2].heading}
              </h2>
              
              <div className="prose prose-lg text-studio-muted font-light leading-relaxed max-w-none mb-10">
                <p className="mb-6">{mentorsData.sections[2].content[0].text}</p>
                <p>{mentorsData.sections[2].content[1].text}</p>
              </div>

              <div className="bg-orange-50 rounded-2xl p-8 border border-orange-100">
                <h3 className="text-xl font-bold text-studio-text mb-4">
                  {mentorsData.sections[2].content[2].text}
                </h3>
                <ul className="space-y-3">
                  {mentorsData.sections[2].content[3].items?.map((award, idx) => {
                     const parts = award.split("–");
                     return (
                        <li key={idx} className="flex items-start">
                          <svg className="w-6 h-6 text-studio-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          <span className="text-studio-muted text-base">
                             {parts.length > 1 ? (
                                <>
                                  <strong className="text-studio-text">{parts[0].trim()}</strong> – {parts.slice(1).join("–").trim()}
                                </>
                             ) : (
                               award
                             )}
                          </span>
                        </li>
                     );
                  })}
                </ul>
              </div>
            </div>
            
            <div className="w-full lg:w-2/5 relative min-h-[400px] lg:min-h-full">
              {/* Using the third image from your array for this section */}
              <Image
                src={mentorsData.images[2]} 
                alt="Global Impact"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
                unoptimized={true}
              />
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}