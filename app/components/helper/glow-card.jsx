"use client"

import { useEffect } from 'react';

// Card whose border lights up towards the pointer. Disabled on touch and
// reduced-motion devices in card.scss, where it falls back to a plain card.
const GlowCard = ({ children, identifier, className = '' }) => {
  useEffect(() => {
    const CONTAINER = document.querySelector(`.glow-container-${identifier}`);
    const CARDS = document.querySelectorAll(`.glow-card-${identifier}`);
    if (!CONTAINER || window.matchMedia('(hover: none)').matches) return;

    const CONFIG = { proximity: 40, spread: 80, blur: 12, opacity: 0 };

    const UPDATE = (event) => {
      for (const CARD of CARDS) {
        const b = CARD.getBoundingClientRect();
        const near =
          event?.x > b.left - CONFIG.proximity &&
          event?.x < b.left + b.width + CONFIG.proximity &&
          event?.y > b.top - CONFIG.proximity &&
          event?.y < b.top + b.height + CONFIG.proximity;
        CARD.style.setProperty('--active', near ? 1 : CONFIG.opacity);

        let angle = (Math.atan2(event?.y - (b.top + b.height / 2), event?.x - (b.left + b.width / 2)) * 180) / Math.PI;
        angle = angle < 0 ? angle + 360 : angle;
        CARD.style.setProperty('--start', angle + 90);
      }
    };

    CONTAINER.style.setProperty('--blur', CONFIG.blur);
    CONTAINER.style.setProperty('--spread', CONFIG.spread);
    document.body.addEventListener('pointermove', UPDATE, { passive: true });
    return () => document.body.removeEventListener('pointermove', UPDATE);
  }, [identifier]);

  return (
    <div className={`glow-container-${identifier} glow-container`}>
      <article className={`glow-card glow-card-${identifier} surface-card relative h-fit w-full ${className}`}>
        <div className="glows" />
        {children}
      </article>
    </div>
  );
};

export default GlowCard;
