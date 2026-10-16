"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const SCROLL_THRESHOLD = 400;

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onClickBtn = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      type="button"
      onClick={onClickBtn}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
      className={`neu-button fixed bottom-6 right-5 z-40 grid h-11 w-11 place-items-center rounded-full
        transition-[opacity,transform] duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      <FaArrowUp size={14} aria-hidden="true" />
    </button>
  );
};

export default ScrollToTop;
