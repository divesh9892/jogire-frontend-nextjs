import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import { teamData } from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function TeamMemberProfile({ params }: PageProps) {
  const resolvedParams = await params;
  const member = teamData.find((m) => m.slug === resolvedParams.slug);

  if (!member) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-studio-bg relative">
      <Navbar />

      {/* Decorative Background Element */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-orange-50 z-0 rounded-b-[4rem] border-b border-orange-100" />

      <section className="relative z-10 pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto">
        
        {/* Back Button */}
        <Link 
          href="/#team" 
          className="inline-flex items-center text-studio-muted hover:text-studio-primary transition-colors mb-8 text-sm font-semibold tracking-wider uppercase group bg-white/50 px-5 py-2.5 rounded-full backdrop-blur-md border border-gray-200 shadow-sm"
        >
          <svg className="w-4 h-4 mr-2 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Team
        </Link>

        {/* The Split Profile Card */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Column: Portrait */}
          <div className="relative w-full md:w-2/5 aspect-square md:aspect-auto md:min-h-[700px] bg-gray-100">
            <Image
              src={member.image}
              alt={`${member.name} - ${member.role}`}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Right Column: Bio & Info */}
          <div className="p-8 md:p-12 lg:p-16 w-full md:w-3/5 flex flex-col justify-center bg-white">
            
            <div className="mb-8">
              <span className="inline-block text-studio-primary font-bold tracking-widest uppercase text-sm mb-3 bg-orange-50 px-4 py-1.5 rounded-full border border-orange-100">
                {member.role}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-studio-text mb-4">
                {member.name}
              </h1>
              {/* Highlight Quote */}
              <blockquote className="text-xl md:text-2xl font-light italic text-studio-muted border-l-4 border-studio-primary pl-5 py-2 bg-gray-50 rounded-r-2xl">
                "{member.quote}"
              </blockquote>
            </div>

            <hr className="border-gray-100 mb-8" />

            {/* Credentials Section */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-studio-text mb-5 flex items-center">
                <svg className="w-6 h-6 mr-2 text-studio-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.956 11.956 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                Credentials & Certifications
              </h3>
              <ul className="space-y-3">
                {member.credentials.map((cred, i) => (
                  <li key={i} className="flex items-start">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-studio-primary mr-3 flex-shrink-0" />
                    <span className="text-studio-muted leading-relaxed">{cred}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Full Biography Section */}
            <div>
              <h3 className="text-xl font-bold text-studio-text mb-4">
                About {member.name.split(" ")[0]}
              </h3>
              <div className="space-y-5 text-studio-muted leading-relaxed text-lg font-light">
                {member.fullBio.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Call to Action for Free Session */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <p className="text-studio-muted mb-4 font-medium">Ready to start your journey with our experts?</p>
              <Link 
                href="/book" 
                className="inline-block bg-studio-text text-white px-8 py-4 rounded-xl font-bold hover:bg-studio-primary transition-colors duration-300 shadow-md"
              >
                Book a Free Consultation
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}