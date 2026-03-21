"use client";

import React, { useState, useEffect } from "react";

interface TypewriterProps {
  messages: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({
  messages,
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseTime = 3000,
  className = "",
}) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingDelay, setTypingDelay] = useState(typingSpeed);

  useEffect(() => {
    const timer = setTimeout(() => {
      const i = loopNum % messages.length;
      const fullText = messages[i];

      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
        setTypingDelay(deletingSpeed);
      } else {
        setText(fullText.substring(0, text.length + 1));
        setTypingDelay(typingSpeed);
      }

      if (!isDeleting && text === fullText) {
        // Pause at the end of the sentence
        setTypingDelay(pauseTime);
        setIsDeleting(true);
      } else if (isDeleting && text === "") {
        // Move to the next sentence
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingDelay(500); // Short pause before starting the new sentence
      }
    }, typingDelay);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, messages, typingSpeed, deletingSpeed, pauseTime, typingDelay]);

  return (
    <div className={`min-h-[80px] md:min-h-[60px] ${className}`}>
      {text}
      <span className="animate-pulse border-r-2 border-current ml-1"></span>
    </div>
  );
};

export default Typewriter;