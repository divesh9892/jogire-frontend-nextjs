import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import Footer from "@/components/Footer";
import ServerWakeup from "@/components/ServerWakeup"
import { ClerkProvider } from '@clerk/nextjs'

// Load Geist fonts with CSS variables for Tailwind integration
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Ensures text is visible while font loads
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// High-quality SEO Metadata
export const metadata: Metadata = {
  title: "Jogire | Holistic Health & Wellness Studio",
  description: "Experience the perfect blend of ancient yogic wisdom, modern psychology, and clinical science tailored for your physical and mental growth.",
  keywords: ["Yoga", "Wellness", "Holistic Health", "Mental Health", "Online Yoga Classes", "PCOD Yoga", "Back Pain Yoga", "Jogire"],
  authors: [{ name: "Koushal Puri" }, { name: "Dhawal Prajapati" }],
  openGraph: {
    title: "Jogire | Holistic Health & Wellness Studio",
    description: "Experience the perfect blend of ancient yogic wisdom and modern wellness tailored for your growth.",
    type: "website",
    locale: "en_IN",
    siteName: "Jogire",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html
      lang="en"
      // Added scroll-smooth for anchor links and antialiased for crisp typography
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body 
        // flex-col ensures the Footer (when added) stays at the bottom of short pages
        // bg-studio-bg ensures the default background is our warm off-white
        // text-studio-text ensures the default text is our soft charcoal
        className="min-h-full flex flex-col bg-studio-bg text-studio-text overflow-x-hidden selection:bg-studio-primary/20 selection:text-studio-primary"
      >
        <ServerWakeup />
        {/* Main Content Area */}
        <div className="flex-grow flex flex-col">
          {children}
          <Footer />
        </div>

        
        {/* Global Widgets that persist across all pages */}
        <WhatsAppWidget />
        
      </body>
    </html>
    </ClerkProvider>
  );
}