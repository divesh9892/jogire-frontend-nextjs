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
    <main className="bg-studio-bg min-h-screen">
      <Navbar />

      {/* Program Hero Section 
          FIX 1: Increased min-height to 70vh for more breathing room.
      */}
      <section className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src={program.image}
            alt={program.title}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          {/* Slightly darker gradient at the bottom so the white card pops more */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>

        {/* FIX 2: Added pb-32 (padding-bottom) so the text stays far away from the overlapping card below. */}
        <div className="relative z-20 mx-auto w-full max-w-4xl px-6 pb-32 text-center text-white md:px-12">
          <Link
            href="/#programs"
            className="group mb-8 inline-flex items-center rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm font-semibold tracking-wider text-gray-300 uppercase backdrop-blur-sm transition-colors hover:text-white"
          >
            <svg
              className="mr-2 h-4 w-4 transform transition-transform group-hover:-translate-x-1"
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
            Back to Programs
          </Link>

          <div className="mb-6 flex justify-center gap-3">
            <span className="bg-studio-primary/90 rounded-full px-4 py-1.5 text-xs font-bold tracking-wider uppercase shadow-md backdrop-blur-md">
              {program.format}
            </span>
            <span className="flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-wider uppercase shadow-md backdrop-blur-md">
              <svg
                className="mr-1.5 h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {program.duration}
            </span>
          </div>

          <h1 className="mx-auto mb-6 max-w-3xl text-4xl leading-tight font-extrabold drop-shadow-xl md:text-5xl lg:text-6xl">
            {program.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed font-light text-gray-200 drop-shadow-lg md:text-xl">
            {program.description}
          </p>
        </div>
      </section>

      {/* Program Details Content */}
      <section className="mx-auto max-w-4xl px-6 pb-24 md:px-12">
        <div className="relative z-30 -mt-24 rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-2xl md:p-12 lg:p-16">
          <h2 className="text-studio-text mb-8 text-3xl font-bold md:text-4xl">What to Expect</h2>
          <div className="prose prose-lg text-studio-muted mb-12 max-w-none">
            <p className="mb-6 text-lg leading-relaxed">
              This is a placeholder for the detailed breakdown of the {program.title} course. Once
              connected to your backend, this section will automatically populate with specific
              details about breathwork, physical postures, and mindfulness techniques tailored to
              this exact offering.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <div className="mt-1 mr-4 rounded-full bg-white p-2 shadow-sm">
                  <svg
                    className="text-studio-primary h-5 w-5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-studio-text mb-1 font-bold">Customized Assessment</h4>
                  <p className="text-sm">
                    A thorough evaluation of your current physical capabilities and health history.
                  </p>
                </div>
              </li>
              <li className="flex items-start rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <div className="mt-1 mr-4 rounded-full bg-white p-2 shadow-sm">
                  <svg
                    className="text-studio-primary h-5 w-5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-studio-text mb-1 font-bold">Guided Practice</h4>
                  <p className="text-sm">
                    Step-by-step instruction on proper alignment, breath control (pranayama), and
                    focus.
                  </p>
                </div>
              </li>
              <li className="flex items-start rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <div className="mt-1 mr-4 rounded-full bg-white p-2 shadow-sm">
                  <svg
                    className="text-studio-primary h-5 w-5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-studio-text mb-1 font-bold">Deep Integration</h4>
                  <p className="text-sm">
                    Ending with guided relaxation (Yoga Nidra) to lock in the physical and mental
                    benefits.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <hr className="mb-12 border-gray-100" />

          {/* Booking CTA */}
          <div className="rounded-3xl border border-orange-100 bg-orange-50 p-8 text-center shadow-inner md:p-12">
            <h3 className="text-studio-text mb-4 text-2xl font-bold md:text-3xl">
              Ready to start your journey?
            </h3>
            <p className="text-studio-muted mx-auto mb-8 max-w-md text-lg">
              Book a free consultation session today. We will discuss your goals and how this
              specific program can help you achieve them.
            </p>
            <Link
              href="/#book-session"
              className="bg-studio-primary hover:bg-studio-accent inline-block transform rounded-full px-10 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 active:scale-95"
            >
              Book Your Free Session
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
