"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import Link from "next/link";

// Refactored data structure to use React nodes instead of dangerous HTML strings
const faqs = [
  {
    question: "I've never done yoga before—can I still join?",
    answer: "Absolutely! JogiRe welcomes everyone, whether you're a beginner, intermediate, or advanced practitioner. Our sessions are designed to cater to all levels, with modifications and progressions to suit your needs. Our expert instructors will guide you step by step, ensuring you feel comfortable and confident on your yoga journey.",
  },
  {
    question: "Why JogiRe, and what makes it different from other platforms?",
    answer: (
      <>
        At JogiRe, we follow a holistic approach based on the Panchkosha Philosophy, which focuses on five layers of human existence:
        <ul className="list-disc pl-6 mt-3 mb-3 space-y-1 text-studio-muted">
          <li><strong>Annamaya Kosha</strong> – Physical health through diet and movement.</li> 
          <li><strong>Pranamaya Kosha</strong> – Energy balance through breathwork.</li> 
          <li><strong>Manomaya Kosha</strong> – Mental clarity and emotional well-being.</li> 
          <li><strong>Vijnanamaya Kosha</strong> – Self-awareness and wisdom.</li>
          <li><strong>Anandamaya Kosha</strong> – Inner peace and bliss.</li> 
        </ul>
        Unlike other platforms that focus only on physical fitness, JogiRe integrates yoga, breathwork, meditation, and lifestyle guidance to bring true transformation from the inside out.
      </>
    ),
  },
  {
    question: "What practices do you cover in your daily classes?",
    answer: (
      <>
        At JogiRe, we offer customized yoga practices targeting individual goals. Our daily classes include:
        <ul className="list-disc pl-6 mt-3 mb-3 space-y-1 text-studio-muted">
          <li><strong>Asanas (Yoga Poses)</strong> – To improve strength, flexibility, and posture.</li>
          <li><strong>Pranayama (Breathwork)</strong> – To enhance energy levels and mental clarity.</li>
          <li><strong>Mindfulness</strong> – To reduce stress and improve focus.</li>
          <li><strong>Relaxation Techniques</strong> – To restore balance and inner peace.</li>
        </ul>
        Each session provides a well-rounded yoga experience, ensuring steady progress for all levels.
      </>
    ),
  },
  {
    question: "Do you teach meditation?",
    answer: "Meditation is not just a practice—it is a state of being. At JogiRe, we prepare your body and mind to naturally enter a meditative state through yoga, breathwork, and mindfulness. Instead of forcing the mind to be still, we help you cultivate the right conditions for deep awareness and inner peace to arise effortlessly.",
  },
  {
    question: "What benefits can I expect as a member of the JogiRe community?",
    answer: (
      <>
        As a JogiRe member, you will experience:
        <ul className="list-disc pl-6 mt-3 mb-3 space-y-1 text-studio-muted">
          <li><strong>Personalized Yoga Practices</strong> – Tailored to your health and wellness goals.</li>
          <li><strong>Stress Relief & Mental Clarity</strong> – Techniques to help you stay calm and focused.</li>
          <li><strong>Better Energy & Vitality</strong> – Breathwork and movement for overall well-being.</li>
          <li><strong>A Supportive Community</strong> – Connect with like-minded individuals.</li>
          <li><strong>Sustainable Wellness</strong> – Develop habits for long-term health and inner peace.</li>
        </ul>
        JogiRe is about living yoga, not just practicing it.
      </>
    ),
  },
  {
    question: "What is the duration of a daily yoga session?",
    answer: "Our daily yoga sessions typically last between 45 to 60 minutes, ensuring a well-balanced practice that includes warm-up, asanas, breathwork, relaxation, and mindfulness.",
  },
  {
    question: "What is JogiRe?",
    answer: "JogiRe's mission is to promote sustainable wellness through a holistic approach, helping individuals become the healthiest version of themselves. We focus on yoga, balanced nutrition (Aahar), and mindful living to create lasting well-being.",
  },
  {
    question: "Where is JogiRe based?",
    answer: "JogiRe is based in India, the birthplace of yoga. While we primarily offer online sessions to our global community, we also conduct offline workshops, and immersive yoga retreats in beautiful locations.",
  },
  {
    question: "How many types of yoga forms/styles do you teach?",
    answer: (
      <>
        At JogiRe, we teach various traditional forms of yoga, including:
        <ul className="list-disc pl-6 mt-3 mb-3 space-y-1 text-studio-muted">
          <li><strong>Hatha Yoga</strong> – Traditional practice for balance, strength, and flexibility.</li>
          <li><strong>Vinyasa Yoga</strong> – Dynamic flow for mobility and endurance.</li> 
          <li><strong>Ashtanga Yoga</strong> – A structured, intense practice for strength and discipline.</li> 
        </ul>
        We integrate these styles to create the best experience for your body, mind, and goals.
      </>
    ),
  },
  {
    question: "Are your coaches certified?",
    answer: "Yes! Our coaches are highly certified, with many holding master’s degrees and scholarly expertise in yoga and wellness. They bring years of experience and deep knowledge to guide you safely on your wellness journey.",
  },
  {
    question: "How much does it cost for one yoga session?",
    answer: "The cost varies based on the type of session. Group classes are budget-friendly and ideal for community practice, while Private 1-on-1 sessions offer highly personalized guidance for deeper progress. We provide flexible pricing plans to make yoga accessible to everyone. Please book a free consultation so we can recommend the perfect plan for your goals.",
  },
];

const FAQ = () => {
  // Set the first FAQ to be open by default (good UX practice)
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-6 md:px-12 bg-studio-bg overflow-hidden border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        
        {/* Centered Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-studio-primary font-bold tracking-wider uppercase text-sm mb-3 block">
              Got Questions?
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-studio-text mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg md:text-xl text-studio-muted font-light">
              Everything you need to know about joining the JogiRe community.
            </p>
          </div>
        </ScrollReveal>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <ScrollReveal key={index} delay={index * 50}>
                <div 
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen ? "border-orange-200 shadow-md" : "border-gray-100 shadow-sm hover:border-gray-200 hover:shadow-md"
                  }`}
                >
                  <button
                    className="w-full px-6 py-5 md:px-8 md:py-6 flex justify-between items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-primary"
                    onClick={() => toggleAnswer(index)}
                    aria-expanded={isOpen}
                  >
                    <span className={`text-lg md:text-xl font-bold pr-4 transition-colors duration-300 ${isOpen ? "text-studio-primary" : "text-studio-text"}`}>
                      {faq.question}
                    </span>
                    
                    {/* Animated Plus/Minus Icon */}
                    <span className="flex-shrink-0 relative w-6 h-6 flex items-center justify-center">
                      <span className={`absolute w-4 h-0.5 bg-studio-primary transition-transform duration-300 ${isOpen ? "rotate-180 bg-studio-accent" : "rotate-0"}`} />
                      <span className={`absolute w-0.5 h-4 bg-studio-primary transition-transform duration-300 ${isOpen ? "rotate-90 bg-studio-accent opacity-0" : "rotate-0 opacity-100"}`} />
                    </span>
                  </button>

                  {/* Smooth CSS Grid Slide-Down Animation Trick */}
                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 md:px-8 md:pb-8 text-studio-muted leading-relaxed text-base md:text-lg font-light border-t border-gray-50 pt-4">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Contact Us CTA positioned below FAQs */}
        <ScrollReveal delay={200}>
          <div className="mt-16 text-center bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-bold text-studio-text mb-3">Still have questions?</h3>
            <p className="text-studio-muted mb-6">
              We are here to help. Reach out to us directly or book your free consultation session.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a 
                href="mailto:contact@jogire.com" 
                className="w-full sm:w-auto px-8 py-3.5 rounded-full border-2 border-studio-primary text-studio-primary font-bold hover:bg-orange-50 transition-colors duration-300"
              >
                Email Support
              </a>
              <Link 
                href="/book" 
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-studio-primary text-white font-bold hover:bg-studio-accent transition-colors duration-300 shadow-md"
              >
                Book Free Session
              </Link>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default FAQ;