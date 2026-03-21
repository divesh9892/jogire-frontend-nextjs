"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number; // Allows us to stagger animations (e.g., 0ms, 100ms, 200ms)
}

const ScrollReveal = ({ children, delay = 0 }: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element comes into the viewport, make it visible
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Unobserve once it's visible so it doesn't animate every time you scroll up and down
          if (ref.current) observer.unobserve(ref.current); 
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1, // Triggers when 10% of the element is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;