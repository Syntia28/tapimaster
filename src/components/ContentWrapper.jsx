'use client';

import { useEffect, useRef } from 'react';
import styles from './ContentWrapper.module.css';

export default function ContentWrapper({ children }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // We want a very subtle diagonal gradient shift inspired by the Codepen bEqrYE effect.
    // The gradient animates between the light/cream tones of MaterialBrowser and the dark
    // tones of Services/Contact as the user scrolls deeper into the content.
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const viewportH = window.innerHeight;

      // The content starts at 100vh (below the fixed Hero).
      // We track progress within the content area.
      const contentStart = viewportH; // where wrapper begins
      const progress = Math.max(0, scrollTop - contentStart);

      // Normalise to a 0–1 range over 3 viewport heights of scroll
      const travelRange = viewportH * 3;
      const t = Math.min(1, progress / travelRange);

      // Subtle diagonal gradient that drifts from light warm tones → dark cool tones
      // Colors are very close to the section backgrounds so the change is whisper-soft
      const r1 = Math.round(lerp(248, 12, t));
      const g1 = Math.round(lerp(250, 8, t));
      const b1 = Math.round(lerp(252, 12, t));

      const r2 = Math.round(lerp(241, 18, t));
      const g2 = Math.round(lerp(245, 10, t));
      const b2 = Math.round(lerp(249, 16, t));

      // Only apply to the sections AFTER MaterialBrowser (bottom 60% of wrapper)
      // We use a layered gradient: solid base + a very subtle diagonal tint overlay
      const angle = 135 + t * 20; // angle drifts slightly as we scroll
      const stop = Math.round(40 + t * 20); // spread of the diagonal

      wrapper.style.setProperty(
        '--scroll-tint',
        `linear-gradient(${angle}deg,
          rgb(${r1},${g1},${b1}) 0%,
          rgb(${r1},${g1},${b1}) ${stop}%,
          rgb(${r2},${g2},${b2}) 100%)`
      );
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {children}
    </div>
  );
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}
