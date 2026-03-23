"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// 1. Enterprise Validation Schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string()
    .optional()
    .refine((val) => !val || /^\+?[0-9\s\-()]{7,15}$/.test(val), {
      message: "Phone number can only contain numbers, spaces, and + - ()",
    }),
  service_interest: z.string().min(1, "Please select an interest."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

// Infer TypeScript types directly from the Zod schema
type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [globalError, setGlobalError] = useState("");

  // 2. Initialize React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service_interest: "",
      message: "",
    }
  });

  // 3. The heavily validated submit handler
  const onSubmit = async (data: ContactFormValues) => {
    setGlobalError("");
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Server rejected the request.");
      }

      setIsSuccess(true);
      reset(); // Instantly clears the form safely via RHF
      setTimeout(() => setIsSuccess(false), 5000);
      
    } catch (error) {
      console.error("Submission error:", error);
      setGlobalError("Unable to connect to the server. Please check your connection.");
    }
  };

  return (
    <main className="min-h-screen bg-studio-bg flex flex-col selection:bg-studio-primary/20 selection:text-studio-primary">
      <Navbar />

      <section className="relative flex-grow py-12 md:py-24 px-6 md:px-12 flex items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-96 bg-[#111827] z-0 rounded-b-[3rem] md:rounded-b-[5rem]" />
        
        <div className="relative z-10 w-full max-w-6xl bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Column (Unchanged Visuals) */}
          <div className="w-full lg:w-5/12 bg-[#111827] text-white p-10 md:p-16 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 mix-blend-overlay">
              <Image src="https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=800&auto=format&fit=crop" alt="Calm Texture" fill sizes="50vw" className="object-cover" />
            </div>
            <div className="relative z-10">
              <span className="text-studio-primary font-bold tracking-widest uppercase text-sm mb-4 block">Reach Out</span>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Let's begin your journey.</h1>
              <p className="text-gray-400 text-lg font-light leading-relaxed mb-12">Whether you have questions about our programs, want to book a private session, or invite us for a corporate workshop, we are here to listen.</p>
            </div>
          </div>

          {/* Right Column: The Zod-Validated Form */}
          <div className="w-full lg:w-7/12 p-10 md:p-16 bg-white relative">
            
            {/* Success Overlay */}
            <div className={`absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-10 text-center transition-all duration-500 ${isSuccess ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-500">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-3xl font-extrabold text-studio-text mb-4">Message Sent!</h3>
              <p className="text-studio-muted text-lg font-light max-w-sm">Thank you for reaching out. A member of the Jogire team will get back to you within 24 hours.</p>
            </div>

            <h2 className="text-3xl font-extrabold text-studio-text mb-8">Send us a message</h2>
            
            {globalError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                {globalError}
              </div>
            )}
            
            {/* We pass handleSubmit from RHF, which intercepts the form and runs Zod first */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-studio-text ml-1">Full Name <span className="text-red-500">*</span></label>
                  <input
                    id="name"
                    {...register("name")}
                    placeholder="John Doe"
                    className={`w-full bg-gray-50 border text-studio-text text-base px-5 py-4 rounded-xl focus:outline-none focus:ring-4 transition-all ${errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:border-studio-primary focus:ring-studio-primary/10'}`}
                  />
                  {errors.name && <p className="text-red-500 text-xs ml-1 mt-1">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-bold text-studio-text ml-1">Phone Number</label>
                  <input
                    id="phone"
                    {...register("phone")}
                    placeholder="+91 98765 43210"
                    className={`w-full bg-gray-50 border text-studio-text text-base px-5 py-4 rounded-xl focus:outline-none focus:ring-4 transition-all ${errors.phone ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:border-studio-primary focus:ring-studio-primary/10'}`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs ml-1 mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-studio-text ml-1">Email Address <span className="text-red-500">*</span></label>
                <input
                  id="email"
                  {...register("email")}
                  placeholder="john@example.com"
                  className={`w-full bg-gray-50 border text-studio-text text-base px-5 py-4 rounded-xl focus:outline-none focus:ring-4 transition-all ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:border-studio-primary focus:ring-studio-primary/10'}`}
                />
                {errors.email && <p className="text-red-500 text-xs ml-1 mt-1">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="service_interest" className="text-sm font-bold text-studio-text ml-1">What are you interested in?</label>
                <div className="relative">
                  <select
                    id="service_interest"
                    {...register("service_interest")}
                    className={`w-full bg-gray-50 border text-studio-text text-base px-5 py-4 rounded-xl focus:outline-none focus:ring-4 transition-all appearance-none cursor-pointer ${errors.service_interest ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:border-studio-primary focus:ring-studio-primary/10'}`}
                  >
                    <option value="" disabled>Select a program...</option>
                    <option value="Online Personal Classes">Online Personal Classes (1-on-1)</option>
                    <option value="Online Group Classes">Online Group Classes</option>
                    <option value="Diet Counselling">Diet Counselling (Aahar)</option>
                    <option value="Corporate Workshops">Corporate & Society Workshops</option>
                    <option value="Yoga Retreats">Yoga Retreats</option>
                    <option value="General Inquiry">General Inquiry / Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
                {errors.service_interest && <p className="text-red-500 text-xs ml-1 mt-1">{errors.service_interest.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-studio-text ml-1">Your Message <span className="text-red-500">*</span></label>
                <textarea
                  id="message"
                  {...register("message")}
                  rows={4}
                  placeholder="Tell us about your goals, health conditions, or how we can help you..."
                  className={`w-full bg-gray-50 border text-studio-text text-base px-5 py-4 rounded-xl focus:outline-none focus:ring-4 transition-all resize-none ${errors.message ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:border-studio-primary focus:ring-studio-primary/10'}`}
                />
                {errors.message && <p className="text-red-500 text-xs ml-1 mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-studio-text text-white font-bold text-lg py-4 rounded-xl hover:bg-studio-primary focus:bg-studio-primary active:scale-[0.98] transition-all duration-300 shadow-lg outline-none flex items-center justify-center disabled:opacity-70 disabled:active:scale-100"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Sending...
                  </span>
                ) : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}