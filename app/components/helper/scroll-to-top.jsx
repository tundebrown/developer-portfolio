"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const SCROLL_THRESHOLD = 50;

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onClickBtn = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={onClickBtn}
      aria-label="Scroll to top"
      className={`
        fixed bottom-8 right-6 z-50
        w-10 h-10 rounded-full
        flex items-center justify-center
        bg-indigo-600 border border-indigo-500/40
        text-white
        shadow-[0_0_20px_rgba(99,102,241,0.4)]
        hover:bg-indigo-500
        hover:shadow-[0_0_28px_rgba(99,102,241,0.6)]
        hover:-translate-y-1
        transition-all duration-300 ease-out
        ${visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
    >
      <FaArrowUp size={14} />
    </button>
  );
};

export default ScrollToTop;