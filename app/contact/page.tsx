"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
  // Client-side state to make the UI feel alive before we connect the backend
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate a network request for the UI
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-studio-bg flex flex-col selection:bg-studio-primary/20 selection:text-studio-primary">
      <Navbar />

      <section className="relative flex-grow py-12 md:py-24 px-6 md:px-12 flex items-center justify-center">
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-96 bg-[#111827] z-0 rounded-b-[3rem] md:rounded-b-[5rem]" />
        
        <div className="relative z-10 w-full max-w-6xl bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Column: Contact Information & Vibe */}
          <div className="w-full lg:w-5/12 bg-[#111827] text-white p-10 md:p-16 flex flex-col justify-between relative overflow-hidden">
            {/* Subtle overlay image to make the dark section feel premium */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay">
              <Image
                src="https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=800&auto=format&fit=crop"
                alt="Calm Texture"
                fill
                className="object-cover"
                unoptimized={true}
              />
            </div>
            
            <div className="relative z-10">
              <span className="text-studio-primary font-bold tracking-widest uppercase text-sm mb-4 block">
                Reach Out
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                Let's begin your journey.
              </h1>
              <p className="text-gray-400 text-lg font-light leading-relaxed mb-12">
                Whether you have questions about our programs, want to book a private session, or invite us for a corporate workshop, we are here to listen.
              </p>

              <ul className="space-y-8 text-lg font-light">
                {/* Phone */}
                <li className="flex items-start group">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-6 group-hover:bg-studio-primary/20 transition-colors duration-300 flex-shrink-0">
                    <svg className="w-5 h-5 text-studio-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Call Us</p>
                    <a href="tel:+919876543210" className="text-white hover:text-studio-primary transition-colors outline-none focus:text-studio-primary block">
                      +91 98765 43210
                    </a>
                  </div>
                </li>
                
                {/* Email */}
                <li className="flex items-start group">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-6 group-hover:bg-studio-primary/20 transition-colors duration-300 flex-shrink-0">
                    <svg className="w-5 h-5 text-studio-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Email Us</p>
                    <a href="mailto:support@jogire.com" className="text-white hover:text-studio-primary transition-colors outline-none focus:text-studio-primary block break-all">
                      support@jogire.com
                    </a>
                  </div>
                </li>

                {/* Location */}
                <li className="flex items-start group">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-6 group-hover:bg-studio-primary/20 transition-colors duration-300 flex-shrink-0">
                    <svg className="w-5 h-5 text-studio-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Location</p>
                    <p className="text-gray-300">Based in India.<br/>Practicing globally via virtual studio.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: The Form */}
          <div className="w-full lg:w-7/12 p-10 md:p-16 bg-white relative">
            
            {/* Success Overlay (Shows when isSuccess is true) */}
            <div className={`absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-10 text-center transition-all duration-500 ${isSuccess ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-500">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-3xl font-extrabold text-studio-text mb-4">Message Sent!</h3>
              <p className="text-studio-muted text-lg font-light max-w-sm">
                Thank you for reaching out. A member of the Jogire team will get back to you within 24 hours.
              </p>
            </div>

            <h2 className="text-3xl font-extrabold text-studio-text mb-8">Send us a message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-studio-text ml-1">Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="John Doe"
                    // text-base is critical here to prevent iOS from automatically zooming in when users tap the input!
                    className="w-full bg-gray-50 border border-gray-200 text-studio-text text-base px-5 py-4 rounded-xl focus:outline-none focus:border-studio-primary focus:ring-4 focus:ring-studio-primary/10 transition-all placeholder-gray-400"
                  />
                </div>

                {/* Phone Input */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-bold text-studio-text ml-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="+91 98765 43210"
                    className="w-full bg-gray-50 border border-gray-200 text-studio-text text-base px-5 py-4 rounded-xl focus:outline-none focus:border-studio-primary focus:ring-4 focus:ring-studio-primary/10 transition-all placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-studio-text ml-1">Email Address <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="john@example.com"
                  className="w-full bg-gray-50 border border-gray-200 text-studio-text text-base px-5 py-4 rounded-xl focus:outline-none focus:border-studio-primary focus:ring-4 focus:ring-studio-primary/10 transition-all placeholder-gray-400"
                />
              </div>

              {/* Service Interest Dropdown */}
              <div className="space-y-2">
                <label htmlFor="service" className="text-sm font-bold text-studio-text ml-1">What are you interested in?</label>
                <div className="relative">
                  <select
                    id="service"
                    className="w-full bg-gray-50 border border-gray-200 text-studio-text text-base px-5 py-4 rounded-xl focus:outline-none focus:border-studio-primary focus:ring-4 focus:ring-studio-primary/10 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled defaultValue="">Select a program...</option>
                    <option value="personal">Online Personal Classes (1-on-1)</option>
                    <option value="group">Online Group Classes</option>
                    <option value="diet">Diet Counselling (Aahar)</option>
                    <option value="corporate">Corporate & Society Workshops</option>
                    <option value="retreats">Yoga Retreats</option>
                    <option value="other">General Inquiry / Other</option>
                  </select>
                  {/* Custom Arrow for select */}
                  <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              {/* Message Textarea */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-studio-text ml-1">Your Message <span className="text-red-500">*</span></label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Tell us about your goals, health conditions, or how we can help you..."
                  className="w-full bg-gray-50 border border-gray-200 text-studio-text text-base px-5 py-4 rounded-xl focus:outline-none focus:border-studio-primary focus:ring-4 focus:ring-studio-primary/10 transition-all placeholder-gray-400 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-studio-text text-white font-bold text-lg py-4 rounded-xl hover:bg-studio-primary focus:bg-studio-primary active:scale-[0.98] transition-all duration-300 shadow-lg outline-none flex items-center justify-center disabled:opacity-70 disabled:active:scale-100"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>

          </div>
        </div>
      </section>
    </main>
  );
}