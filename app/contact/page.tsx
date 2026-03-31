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
  phone: z
    .string()
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
    },
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
    <main className="bg-studio-bg selection:bg-studio-primary/20 selection:text-studio-primary flex min-h-screen flex-col">
      <Navbar />

      <section className="relative flex flex-grow items-center justify-center px-6 py-12 md:px-12 md:py-24">
        <div className="absolute top-0 left-0 z-0 h-96 w-full rounded-b-[3rem] bg-[#111827] md:rounded-b-[5rem]" />

        <div className="relative z-10 flex w-full max-w-6xl flex-col overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-2xl md:rounded-[3rem] lg:flex-row">
          {/* Left Column (Unchanged Visuals) */}
          <div className="relative flex w-full flex-col justify-between overflow-hidden bg-[#111827] p-10 text-white md:p-16 lg:w-5/12">
            <div className="absolute inset-0 opacity-20 mix-blend-overlay">
              <Image
                src="https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=800&auto=format&fit=crop"
                alt="Calm Texture"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
            <div className="relative z-10">
              <span className="text-studio-primary mb-4 block text-sm font-bold tracking-widest uppercase">
                Reach Out
              </span>
              <h1 className="mb-6 text-4xl font-extrabold md:text-5xl">
                Let's begin your journey.
              </h1>
              <p className="mb-12 text-lg leading-relaxed font-light text-gray-400">
                Whether you have questions about our programs, want to book a private session, or
                invite us for a corporate workshop, we are here to listen.
              </p>
            </div>
          </div>

          {/* Right Column: The Zod-Validated Form */}
          <div className="relative w-full bg-white p-10 md:p-16 lg:w-7/12">
            {/* Success Overlay */}
            <div
              className={`absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 p-10 text-center backdrop-blur-sm transition-all duration-500 ${isSuccess ? "visible opacity-100" : "pointer-events-none invisible opacity-0"}`}
            >
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-500">
                <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-studio-text mb-4 text-3xl font-extrabold">Message Sent!</h3>
              <p className="text-studio-muted max-w-sm text-lg font-light">
                Thank you for reaching out. A member of the Jogire team will get back to you within
                24 hours.
              </p>
            </div>

            <h2 className="text-studio-text mb-8 text-3xl font-extrabold">Send us a message</h2>

            {globalError && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
                {globalError}
              </div>
            )}

            {/* We pass handleSubmit from RHF, which intercepts the form and runs Zod first */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-studio-text ml-1 text-sm font-bold">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    {...register("name")}
                    placeholder="John Doe"
                    className={`text-studio-text w-full rounded-xl border bg-gray-50 px-5 py-4 text-base transition-all focus:ring-4 focus:outline-none ${errors.name ? "border-red-400 focus:border-red-500 focus:ring-red-500/10" : "focus:border-studio-primary focus:ring-studio-primary/10 border-gray-200"}`}
                  />
                  {errors.name && (
                    <p className="mt-1 ml-1 text-xs text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-studio-text ml-1 text-sm font-bold">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    {...register("phone")}
                    placeholder="+91 98765 43210"
                    className={`text-studio-text w-full rounded-xl border bg-gray-50 px-5 py-4 text-base transition-all focus:ring-4 focus:outline-none ${errors.phone ? "border-red-400 focus:border-red-500 focus:ring-red-500/10" : "focus:border-studio-primary focus:ring-studio-primary/10 border-gray-200"}`}
                  />
                  {errors.phone && (
                    <p className="mt-1 ml-1 text-xs text-red-500">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-studio-text ml-1 text-sm font-bold">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  {...register("email")}
                  placeholder="john@example.com"
                  className={`text-studio-text w-full rounded-xl border bg-gray-50 px-5 py-4 text-base transition-all focus:ring-4 focus:outline-none ${errors.email ? "border-red-400 focus:border-red-500 focus:ring-red-500/10" : "focus:border-studio-primary focus:ring-studio-primary/10 border-gray-200"}`}
                />
                {errors.email && (
                  <p className="mt-1 ml-1 text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="service_interest"
                  className="text-studio-text ml-1 text-sm font-bold"
                >
                  What are you interested in?
                </label>
                <div className="relative">
                  <select
                    id="service_interest"
                    {...register("service_interest")}
                    className={`text-studio-text w-full cursor-pointer appearance-none rounded-xl border bg-gray-50 px-5 py-4 text-base transition-all focus:ring-4 focus:outline-none ${errors.service_interest ? "border-red-400 focus:border-red-500 focus:ring-red-500/10" : "focus:border-studio-primary focus:ring-studio-primary/10 border-gray-200"}`}
                  >
                    <option value="" disabled>
                      Select a program...
                    </option>
                    <option value="Online Personal Classes">
                      Online Personal Classes (1-on-1)
                    </option>
                    <option value="Online Group Classes">Online Group Classes</option>
                    <option value="Diet Counselling">Diet Counselling (Aahar)</option>
                    <option value="Corporate Workshops">Corporate & Society Workshops</option>
                    <option value="Yoga Retreats">Yoga Retreats</option>
                    <option value="General Inquiry">General Inquiry / Other</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-gray-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                {errors.service_interest && (
                  <p className="mt-1 ml-1 text-xs text-red-500">
                    {errors.service_interest.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-studio-text ml-1 text-sm font-bold">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  {...register("message")}
                  rows={4}
                  placeholder="Tell us about your goals, health conditions, or how we can help you..."
                  className={`text-studio-text w-full resize-none rounded-xl border bg-gray-50 px-5 py-4 text-base transition-all focus:ring-4 focus:outline-none ${errors.message ? "border-red-400 focus:border-red-500 focus:ring-red-500/10" : "focus:border-studio-primary focus:ring-studio-primary/10 border-gray-200"}`}
                />
                {errors.message && (
                  <p className="mt-1 ml-1 text-xs text-red-500">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-studio-text hover:bg-studio-primary focus:bg-studio-primary flex w-full items-center justify-center rounded-xl py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 outline-none active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
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
