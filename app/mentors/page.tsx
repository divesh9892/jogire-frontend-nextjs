import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { mentorsData } from "@/lib/mentorsData";

export const metadata = {
  title: "Our Mentors | Jogire",
  description:
    "Meet the guiding light of Jogire. We are deeply honored to be guided by Dr. Chinmay Pandya, bridging the realms of science and spirituality.",
};

export default function MentorsPage() {
  return (
    <main className="bg-studio-bg flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 z-0">
          <div className="to-studio-bg absolute inset-0 z-10 bg-gradient-to-b from-orange-50/50" />
        </div>

        <div className="relative z-20 mx-auto max-w-4xl px-6 text-center md:px-12">
          <span className="text-studio-primary mb-4 block text-sm font-bold tracking-wider uppercase">
            Guiding Light
          </span>
          <h1 className="text-studio-text mb-6 text-4xl font-extrabold md:text-6xl">Our Mentors</h1>
          <p className="text-studio-muted text-lg leading-relaxed font-light md:text-2xl">
            We are deeply honored to be guided by the wisdom and visionary leadership of{" "}
            {mentorsData.name}.
          </p>
        </div>
      </section>

      {/* Editorial Content Section */}
      <section className="flex-grow px-6 pb-24 md:px-12">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-xl">
          {/* Section 1: Introduction (Image Top, Text Below on Mobile | Image Left, Text Right on Desktop) */}
          <div className="flex flex-col border-b border-gray-100 lg:flex-row">
            <div className="relative min-h-[400px] w-full lg:min-h-full lg:w-2/5">
              <Image
                src={mentorsData.images[0]}
                alt={mentorsData.name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top"
                priority
              />
            </div>
            <div className="flex w-full flex-col justify-center p-8 md:p-12 lg:w-3/5 lg:p-16">
              <h2 className="text-studio-text mb-2 text-3xl font-extrabold md:text-4xl">
                {mentorsData.name}
              </h2>
              <p className="text-studio-primary mb-1 text-lg font-bold">{mentorsData.title}</p>
              <p className="text-studio-muted mb-8 text-sm font-medium">
                {mentorsData.credentials}
              </p>

              <div className="prose prose-lg text-studio-muted max-w-none leading-relaxed font-light">
                {mentorsData.sections[0].content.map((block, idx) => (
                  <p key={idx} className="mb-6">
                    {block.text}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Contributions & Leadership (Full Width Text with Styled List) */}
          <div className="border-b border-gray-100 bg-gray-50 p-8 md:p-12 lg:p-16">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-studio-text mb-8 text-center text-3xl font-bold md:text-left">
                {mentorsData.sections[1].heading}
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-12">
                {mentorsData.sections[1].content[0].items?.map((item, idx) => {
                  // Split the bold title from the description if it contains a dash
                  const parts = item.split("–");
                  return (
                    <div key={idx} className="mb-4 flex items-start">
                      <span className="bg-studio-primary mt-2.5 mr-4 h-2 w-2 flex-shrink-0 rounded-full" />
                      <p className="text-studio-muted text-base leading-relaxed">
                        {parts.length > 1 ? (
                          <>
                            <strong className="text-studio-text">{parts[0].trim()}</strong> –{" "}
                            {parts.slice(1).join("–").trim()}
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
            <div className="flex w-full flex-col justify-center p-8 md:p-12 lg:w-3/5 lg:p-16">
              <h2 className="text-studio-text mb-6 text-3xl font-bold">
                {mentorsData.sections[2].heading}
              </h2>

              <div className="prose prose-lg text-studio-muted mb-10 max-w-none leading-relaxed font-light">
                <p className="mb-6">{mentorsData.sections[2].content[0].text}</p>
                <p>{mentorsData.sections[2].content[1].text}</p>
              </div>

              <div className="rounded-2xl border border-orange-100 bg-orange-50 p-8">
                <h3 className="text-studio-text mb-4 text-xl font-bold">
                  {mentorsData.sections[2].content[2].text}
                </h3>
                <ul className="space-y-3">
                  {mentorsData.sections[2].content[3].items?.map((award, idx) => {
                    const parts = award.split("–");
                    return (
                      <li key={idx} className="flex items-start">
                        <svg
                          className="text-studio-primary mr-3 h-6 w-6 flex-shrink-0"
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
                        <span className="text-studio-muted text-base">
                          {parts.length > 1 ? (
                            <>
                              <strong className="text-studio-text">{parts[0].trim()}</strong> –{" "}
                              {parts.slice(1).join("–").trim()}
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

            <div className="relative min-h-[400px] w-full lg:min-h-full lg:w-2/5">
              {/* Using the third image from your array for this section */}
              <Image
                src={mentorsData.images[2]}
                alt="Global Impact"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
