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
      <div className="absolute top-0 left-0 z-0 h-[50vh] w-full rounded-b-[4rem] border-b border-orange-100 bg-orange-50" />

      <section className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-24 md:px-12">
        {/* Back Button */}
        <Link
          href="/#team"
          className="text-studio-muted hover:text-studio-primary group mb-8 inline-flex items-center rounded-full border border-gray-200 bg-white/50 px-5 py-2.5 text-sm font-semibold tracking-wider uppercase shadow-sm backdrop-blur-md transition-colors"
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

        {/* The Split Profile Card */}
        <div className="flex flex-col overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-xl md:flex-row">
          {/* Left Column: Portrait */}
          <div className="relative aspect-square w-full bg-gray-100 md:aspect-auto md:min-h-[700px] md:w-2/5">
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
          <div className="flex w-full flex-col justify-center bg-white p-8 md:w-3/5 md:p-12 lg:p-16">
            <div className="mb-8">
              <span className="text-studio-primary mb-3 inline-block rounded-full border border-orange-100 bg-orange-50 px-4 py-1.5 text-sm font-bold tracking-widest uppercase">
                {member.role}
              </span>
              <h1 className="text-studio-text mb-4 text-4xl font-extrabold md:text-5xl">
                {member.name}
              </h1>
              {/* Highlight Quote */}
              <blockquote className="text-studio-muted border-studio-primary rounded-r-2xl border-l-4 bg-gray-50 py-2 pl-5 text-xl font-light italic md:text-2xl">
                "{member.quote}"
              </blockquote>
            </div>

            <hr className="mb-8 border-gray-100" />

            {/* Credentials Section */}
            <div className="mb-10">
              <h3 className="text-studio-text mb-5 flex items-center text-xl font-bold">
                <svg
                  className="text-studio-primary mr-2 h-6 w-6"
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
              <ul className="space-y-3">
                {member.credentials.map((cred, i) => (
                  <li key={i} className="flex items-start">
                    <div className="bg-studio-primary mt-1.5 mr-3 h-2 w-2 flex-shrink-0 rounded-full" />
                    <span className="text-studio-muted leading-relaxed">{cred}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Full Biography Section */}
            <div>
              <h3 className="text-studio-text mb-4 text-xl font-bold">
                About {member.name.split(" ")[0]}
              </h3>
              <div className="text-studio-muted space-y-5 text-lg leading-relaxed font-light">
                {member.fullBio.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Call to Action for Free Session */}
            <div className="mt-12 border-t border-gray-100 pt-8">
              <p className="text-studio-muted mb-4 font-medium">
                Ready to start your journey with our experts?
              </p>
              <Link
                href="/book"
                className="bg-studio-text hover:bg-studio-primary inline-block rounded-xl px-8 py-4 font-bold text-white shadow-md transition-colors duration-300"
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
