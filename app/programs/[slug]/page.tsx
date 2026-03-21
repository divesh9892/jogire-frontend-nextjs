import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import { programsData } from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProgramDetail({ params }: PageProps) {
  const resolvedParams = await params;
  const program = programsData.find((p) => p.slug === resolvedParams.slug);

  if (!program) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-studio-bg">
      <Navbar />

      {/* Program Hero Section 
          FIX 1: Increased min-height to 70vh for more breathing room.
      */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src={program.image}
            alt={program.title}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
            unoptimized={true}
          />
          {/* Slightly darker gradient at the bottom so the white card pops more */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 z-10" />
        </div>

        {/* FIX 2: Added pb-32 (padding-bottom) so the text stays far away from the overlapping card below. */}
        <div className="relative z-20 max-w-4xl mx-auto w-full px-6 md:px-12 text-center text-white pb-32">
          
          <Link href="/#programs" className="inline-flex items-center text-gray-300 hover:text-white transition-colors mb-8 text-sm font-semibold tracking-wider uppercase group bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
            <svg className="w-4 h-4 mr-2 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Programs
          </Link>
          
          <div className="flex justify-center gap-3 mb-6">
            <span className="bg-studio-primary/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
              {program.format}
            </span>
            <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center border border-white/20 shadow-md">
              <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {program.duration}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight drop-shadow-xl max-w-3xl mx-auto">
            {program.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            {program.description}
          </p>
        </div>
      </section>

      {/* Program Details Content */}
      <section className="px-6 md:px-12 pb-24 max-w-4xl mx-auto">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-2xl border border-gray-100 -mt-24 relative z-30">
          
          <h2 className="text-3xl md:text-4xl font-bold text-studio-text mb-8">What to Expect</h2>
          <div className="prose prose-lg text-studio-muted mb-12 max-w-none">
            <p className="text-lg leading-relaxed mb-6">
              This is a placeholder for the detailed breakdown of the {program.title} course. Once connected to your backend, this section will automatically populate with specific details about breathwork, physical postures, and mindfulness techniques tailored to this exact offering.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div className="bg-white p-2 rounded-full shadow-sm mr-4 mt-1">
                  <svg className="w-5 h-5 text-studio-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-studio-text mb-1">Customized Assessment</h4>
                  <p className="text-sm">A thorough evaluation of your current physical capabilities and health history.</p>
                </div>
              </li>
              <li className="flex items-start bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div className="bg-white p-2 rounded-full shadow-sm mr-4 mt-1">
                  <svg className="w-5 h-5 text-studio-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-studio-text mb-1">Guided Practice</h4>
                  <p className="text-sm">Step-by-step instruction on proper alignment, breath control (pranayama), and focus.</p>
                </div>
              </li>
              <li className="flex items-start bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div className="bg-white p-2 rounded-full shadow-sm mr-4 mt-1">
                  <svg className="w-5 h-5 text-studio-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-studio-text mb-1">Deep Integration</h4>
                  <p className="text-sm">Ending with guided relaxation (Yoga Nidra) to lock in the physical and mental benefits.</p>
                </div>
              </li>
            </ul>
          </div>

          <hr className="border-gray-100 mb-12" />

          {/* Booking CTA */}
          <div className="text-center bg-orange-50 rounded-3xl p-8 md:p-12 border border-orange-100 shadow-inner">
            <h3 className="text-2xl md:text-3xl font-bold text-studio-text mb-4">Ready to start your journey?</h3>
            <p className="text-studio-muted mb-8 max-w-md mx-auto text-lg">
              Book a free consultation session today. We will discuss your goals and how this specific program can help you achieve them.
            </p>
            <Link 
              href="/#book-session" 
              className="inline-block bg-studio-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-studio-accent transition-all duration-300 shadow-lg transform hover:-translate-y-1 active:scale-95"
            >
              Book Your Free Session
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}