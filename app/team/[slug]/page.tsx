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
    <main className="bg-studio-bg relative min-h-screen">
      <Navbar />

      {/* Decorative Background Element */}
      <div className="absolute top-0 left-0 z-0 h-[60vh] w-full rounded-b-[4rem] border-b border-orange-100/50 bg-gradient-to-b from-orange-50 to-white" />

      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24 md:px-12">
        {/* Back Button */}
        <div className="animate-in fade-in slide-in-from-bottom-4 mb-8 duration-700">
          <Link
            href="/#team"
            className="text-studio-muted hover:text-studio-primary group inline-flex items-center rounded-full border border-gray-200 bg-white/50 px-5 py-2.5 text-sm font-semibold tracking-wider uppercase shadow-sm backdrop-blur-md transition-all hover:bg-white hover:shadow-md"
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
            Back to Team
          </Link>
        </div>

        {/* The Split Layout */}
        <div className="flex flex-col items-start gap-8 md:flex-row lg:gap-12">
          {/* LEFT COLUMN: Sticky Image Card (FIXED FOR MOBILE) */}
          <div className="animate-in fade-in slide-in-from-left-8 relative w-full shrink-0 overflow-hidden rounded-[2.5rem] shadow-2xl duration-700 md:sticky md:top-28 md:w-5/12 lg:w-2/5">
            {/* Height is bound to 60vh max on mobile, viewport-calc on desktop */}
            <div className="relative aspect-[4/5] max-h-[60vh] w-full md:aspect-auto md:h-[calc(100vh-10rem)] md:max-h-[800px]">
              <Image
                src={member.image}
                alt={`${member.name} - ${member.role}`}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-top transition-transform duration-1000 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
            </div>
          </div>

          {/* RIGHT COLUMN: Scrolling Bio Info */}
          <div className="animate-in fade-in slide-in-from-right-8 fill-mode-both w-full rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-xl delay-150 duration-700 md:w-7/12 md:p-12 lg:w-3/5 lg:p-16">
            <div className="mb-8">
              <span className="text-studio-primary mb-4 inline-block rounded-full border border-orange-100 bg-orange-50 px-4 py-1.5 text-xs font-bold tracking-widest uppercase shadow-sm">
                {member.role}
              </span>
              <h1 className="text-studio-text mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
                {member.name}
              </h1>

              {/* Highlight Quote */}
              <blockquote className="text-studio-muted border-studio-primary rounded-r-2xl border-l-4 bg-orange-50/30 py-3 pl-6 text-xl leading-relaxed font-light italic md:text-2xl">
                "{member.quote}"
              </blockquote>
            </div>

            <hr className="mb-10 border-gray-100" />

            {/* Credentials Section */}
            <div className="mb-12">
              <h3 className="text-studio-text mb-6 flex items-center text-xl font-bold tracking-tight">
                <svg
                  className="text-studio-primary mr-3 h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.956 11.956 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Credentials & Certifications
              </h3>
              <ul className="space-y-4">
                {member.credentials.map((cred, i) => (
                  <li key={i} className="group flex items-start">
                    <div className="bg-studio-primary/80 mt-2 mr-4 h-2 w-2 flex-shrink-0 rounded-full transition-transform group-hover:scale-150" />
                    <span className="text-studio-muted text-lg leading-relaxed">{cred}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Full Biography Section */}
            <div>
              <h3 className="text-studio-text mb-6 text-xl font-bold tracking-tight">
                About {member.name.split(" ")[0]}
              </h3>
              <div className="text-studio-muted space-y-6 text-lg leading-relaxed font-light">
                {member.fullBio.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Call to Action for Free Session */}
            <div className="mt-16 rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center transition-colors hover:bg-orange-50/50">
              <p className="text-studio-text mb-6 text-lg font-medium">
                Ready to start your journey with our experts?
              </p>
              <Link
                href="/book"
                className="bg-studio-text hover:bg-studio-primary inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold text-white shadow-lg shadow-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Book a Free Consultation
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
