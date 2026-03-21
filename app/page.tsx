import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
// import Carousel from "@/components/Carousel";
import Programs from "@/components/Programs";
import WhyChooseUs from "@/components/WhyChooseUs";
import WhatWeDo from "@/components/WhatWeDo";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
     {/* <Carousel />*/}
     <WhyChooseUs />
     <WhatWeDo />
      <Programs />
      <Team />
      <Testimonials />
      <FAQ />
      
      {/* We will add the Hero component here next */}
      {/* <section className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-5xl font-bold text-studio-primary mb-4">
          Welcome to Jogire Yoga Studio
        </h1>
        <p className="text-xl text-studio-muted max-w-2xl">
          A living space for transformation.
        </p>
      </section> */}

    </main>
  );
}