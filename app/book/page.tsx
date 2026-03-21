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
            brandColor: "#d67952" 
          } 
        },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, []);

  return (
    <main className="min-h-screen bg-studio-bg flex flex-col selection:bg-studio-primary/20 selection:text-studio-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full pt-20 pb-32 md:pt-28 md:pb-48 bg-[#111827] overflow-hidden">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=1200&auto=format&fit=crop"
            alt="Calm Atmosphere"
            fill
            className="object-cover"
            unoptimized={true}
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111827] z-10" />

        <div className="relative z-20 max-w-4xl mx-auto px-6 md:px-12 text-center text-white">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-400 hover:text-white focus:text-white active:scale-95 transition-all duration-300 mb-8 text-sm font-bold tracking-wider uppercase group outline-none"
          >
            <svg className="w-5 h-5 mr-2 transform transition-transform group-hover:-translate-x-1 group-focus:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Book Your Free Consultation
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Take the first step toward conscious living. Choose a time below for a 30-minute discovery session with our experts.
          </p>
        </div>
      </section>

      {/* The Booking Interface (Expanded Width for Weekly View) */}
      <section className="relative z-30 px-4 md:px-12 pb-24 flex-grow -mt-20 md:-mt-32">
        {/* CHANGED: max-w-5xl to max-w-7xl to give the calendar room to breathe */}
        <div className="max-w-7xl mx-auto bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Side: Sidebar (Shrunk to 1/4 width on desktop) */}
          <div className="w-full lg:w-1/4 bg-orange-50/50 p-6 md:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col justify-between">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-studio-text mb-6">
                What to expect
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-sm mr-3 md:mr-4 flex-shrink-0 text-studio-primary">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-studio-text text-sm md:text-base mb-1">30-Minute Video Call</h4>
                    <p className="text-xs md:text-sm text-studio-muted font-light leading-relaxed">A relaxed chat via Google Meet.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-sm mr-3 md:mr-4 flex-shrink-0 text-studio-primary">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-studio-text text-sm md:text-base mb-1">Personalized Assessment</h4>
                    <p className="text-xs md:text-sm text-studio-muted font-light leading-relaxed">Evaluating your goals and Aahar.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-sm mr-3 md:mr-4 flex-shrink-0 text-studio-primary">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-studio-text text-sm md:text-base mb-1">Actionable Next Steps</h4>
                    <p className="text-xs md:text-sm text-studio-muted font-light leading-relaxed">Leave with clarity on your path.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 pt-6 border-t border-orange-100 hidden lg:block">
              <p className="text-sm text-studio-muted italic font-medium">
                "Healing is a journey of collaboration. We guide you, but you take the steps."
              </p>
            </div>
          </div>

          {/* Right Side: Cal.com Embed (Expanded to 3/4 width) */}
          <div className="w-full lg:w-3/4 p-2 md:p-6 min-h-[600px] flex items-center justify-center bg-white relative">
            <Cal 
              calLink="divesh-sharma-3ssl2q/demo-class?layout=month_view&theme=light" 
              calOrigin="https://cal.eu" 
              style={{width:"100%", height:"100%", overflow:"scroll"}}
              config={{layout: 'month_view', theme: 'light'}} 
              className="w-full h-full rounded-xl"
            />
          </div>
        </div>
      </section>
    </main>
  );
}