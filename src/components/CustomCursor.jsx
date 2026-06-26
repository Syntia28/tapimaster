"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Framer Motion spring physical lag
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 280, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    // Detect touch device or small screen to disable custom cursor
    const checkMobileDevice = () => {
      const isTouch = ("ontouchstart" in window) || navigator.maxTouchPoints > 0;
      const isSmall = window.innerWidth <= 768;
      setIsMobile(isTouch || isSmall);
    };

    checkMobileDevice();
    window.addEventListener("resize", checkMobileDevice);

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    // Listen globally for mouseover on clickable/interactive items
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const clickable = target.closest("a, button, [role='button'], input, select, textarea, [data-cursor]");
      if (clickable) {
        setIsHovered(true);
        
        // Custom text based on element context
        let text = "Ir";
        if (clickable.tagName === "BUTTON") {
          text = "Elegir";
        }
        if (clickable.className.includes("whatsapp") || clickable.className.includes("quote")) {
          text = "Cotizar";
        } else if (clickable.className.includes("play") || clickable.className.includes("volume")) {
          text = "Ver";
        } else if (clickable.className.includes("arrow") || clickable.className.includes("Btn")) {
          text = "Ver";
        }
        
        const customText = clickable.getAttribute("data-cursor");
        if (customText) text = customText;

        setCursorText(text);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (!target) return;

      const clickable = target.closest("a, button, [role='button'], input, select, textarea, [data-cursor]");
      if (clickable) {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("resize", checkMobileDevice);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!mounted || isMobile) return null;

  return (
    <motion.div
      className={`${styles.cursorRing} ${isHovered ? styles.cursorHovered : ""} ${isVisible ? styles.cursorVisible : ""}`}
      style={{
        left: cursorX,
        top: cursorY,
      }}
    >
      {/* Sporty inner dot */}
      <div className={styles.cursorDot} />
      
      {/* Tiny descriptive helper tag */}
      {isHovered && cursorText && (
        <span className={styles.cursorTag}>{cursorText}</span>
      )}
    </motion.div>
  );
}
