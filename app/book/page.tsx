"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Cal, { getCalApi } from "@calcom/embed-react";

export default function BookSessionPage() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ embedJsUrl: "https://cal.eu/embed/embed.js" });
      cal("ui", {
        styles: {
          branding: {
            brandColor: "#d67952",
          },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <main className="bg-studio-bg selection:bg-studio-primary/20 selection:text-studio-primary flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#111827] pt-20 pb-32 md:pt-28 md:pb-48">
        <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay">
          <Image
            src="https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=1200&auto=format&fit=crop"
            alt="Calm Atmosphere"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-[#111827]" />

        <div className="relative z-20 mx-auto max-w-4xl px-6 text-center text-white md:px-12">
          <Link
            href="/"
            className="group mb-8 inline-flex items-center text-sm font-bold tracking-wider text-gray-400 uppercase transition-all duration-300 outline-none hover:text-white focus:text-white active:scale-95"
          >
            <svg
              className="mr-2 h-5 w-5 transform transition-transform group-hover:-translate-x-1 group-focus:-translate-x-1"
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
            Back to Home
          </Link>

          <h1 className="mb-6 text-4xl font-extrabold drop-shadow-lg md:text-5xl lg:text-6xl">
            Book Your Free Consultation
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed font-light text-gray-300 md:text-xl">
            Take the first step toward conscious living. Choose a time below for a 30-minute
            discovery session with our experts.
          </p>
        </div>
      </section>

      {/* The Booking Interface (Expanded Width for Weekly View) */}
      <section className="relative z-30 -mt-20 flex-grow px-4 pb-24 md:-mt-32 md:px-12">
        {/* CHANGED: max-w-5xl to max-w-7xl to give the calendar room to breathe */}
        <div className="mx-auto flex max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-2xl md:rounded-[3rem] lg:flex-row">
          {/* Left Side: Sidebar (Shrunk to 1/4 width on desktop) */}
          <div className="flex w-full flex-col justify-between border-b border-gray-100 bg-orange-50/50 p-6 md:p-8 lg:w-1/4 lg:border-r lg:border-b-0 lg:p-10">
            <div>
              <h3 className="text-studio-text mb-6 text-xl font-bold md:text-2xl">
                What to expect
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="text-studio-primary mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm md:mr-4 md:h-10 md:w-10">
                    <svg
                      className="h-4 w-4 md:h-5 md:w-5"
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
                  </div>
                  <div>
                    <h4 className="text-studio-text mb-1 text-sm font-bold md:text-base">
                      30-Minute Video Call
                    </h4>
                    <p className="text-studio-muted text-xs leading-relaxed font-light md:text-sm">
                      A relaxed chat via Google Meet.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="text-studio-primary mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm md:mr-4 md:h-10 md:w-10">
                    <svg
                      className="h-4 w-4 md:h-5 md:w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-studio-text mb-1 text-sm font-bold md:text-base">
                      Personalized Assessment
                    </h4>
                    <p className="text-studio-muted text-xs leading-relaxed font-light md:text-sm">
                      Evaluating your goals and Aahar.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="text-studio-primary mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm md:mr-4 md:h-10 md:w-10">
                    <svg
                      className="h-4 w-4 md:h-5 md:w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-studio-text mb-1 text-sm font-bold md:text-base">
                      Actionable Next Steps
                    </h4>
                    <p className="text-studio-muted text-xs leading-relaxed font-light md:text-sm">
                      Leave with clarity on your path.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 hidden border-t border-orange-100 pt-6 lg:block">
              <p className="text-studio-muted text-sm font-medium italic">
                "Healing is a journey of collaboration. We guide you, but you take the steps."
              </p>
            </div>
          </div>

          {/* Right Side: Cal.com Embed (Expanded to 3/4 width) */}
          <div className="relative flex min-h-[600px] w-full items-center justify-center bg-white p-2 md:p-6 lg:w-3/4">
            <Cal
              calLink="divesh-sharma-3ssl2q/demo-class?layout=month_view&theme=light"
              calOrigin="https://cal.eu"
              style={{ width: "100%", height: "100%", overflow: "scroll" }}
              config={{ layout: "month_view", theme: "light" }}
              className="h-full w-full rounded-xl"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
