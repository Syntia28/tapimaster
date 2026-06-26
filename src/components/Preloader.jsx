"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Preloader.module.css";

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [rpm, setRpm] = useState(0); // 0 to 8000
  const [shiftLight, setShiftLight] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user has already loaded the page in this session
    if (typeof window !== "undefined") {
      const hasLoaded = sessionStorage.getItem("tapi-loaded");
      if (hasLoaded) {
        setShow(false);
        return;
      }
    }

    // Animation sequences
    // 1. Acelerate to Redline (0ms - 800ms)
    const accelInterval = setInterval(() => {
      setRpm((prev) => {
        if (prev >= 7200) {
          clearInterval(accelInterval);
          return 7200;
        }
        return prev + 360;
      });
    }, 40);

    // 2. Redline shift light blinking (800ms - 1300ms)
    let shiftLightBlink;
    const shiftLightTimeout = setTimeout(() => {
      setRpm(7400);
      setShiftLight(true);
      shiftLightBlink = setInterval(() => {
        setShiftLight((prev) => !prev);
      }, 80);
    }, 850);

    // 3. Drop to Idle and Fade Out (1300ms - 2200ms)
    const dropTimeout = setTimeout(() => {
      clearInterval(shiftLightBlink);
      setShiftLight(false);
      
      // Decelerate to idle RPM (800 RPM)
      const decelInterval = setInterval(() => {
        setRpm((prev) => {
          if (prev <= 800) {
            clearInterval(decelInterval);
            return 800;
          }
          return prev - 400;
        });
      }, 30);
    }, 1300);

    // Complete loading sequence
    const endTimeout = setTimeout(() => {
      setShow(false);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("tapi-loaded", "true");
      }
    }, 2100);

    return () => {
      clearInterval(accelInterval);
      clearTimeout(shiftLightTimeout);
      clearInterval(shiftLightBlink);
      clearTimeout(dropTimeout);
      clearTimeout(endTimeout);
    };
  }, []);

  if (!mounted || !show) return null;

  // Convert RPM value (0 to 8000) to rotation angle for gauge needle
  // -220 degrees represents 0 RPM, +40 degrees represents 8000 RPM
  const getNeedleRotation = () => {
    const minAngle = -220;
    const maxAngle = 40;
    const angleRange = maxAngle - minAngle;
    return minAngle + (rpm / 8000) * angleRange;
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.preloaderContainer}
          exit={{ 
            opacity: 0,
            y: "-100vh",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Subtle grid decorative background */}
          <div className={styles.gridOverlay} />

          <div className={styles.content}>
            {/* Shift Light Indicator LED */}
            <div className={`${styles.shiftLight} ${shiftLight ? styles.shiftLightActive : ""}`}>
              <span>SHIFT</span>
            </div>

            {/* Tachometer Dial SVG */}
            <div className={styles.gaugeWrapper}>
              <svg className={styles.gaugeSvg} viewBox="0 0 200 200" fill="none">
                {/* Dial background arc */}
                <path
                  d="M 40 160 A 80 80 0 1 1 160 160"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                
                {/* Redline arc (starts at 6500 RPM, approx 140deg of sweep) */}
                <path
                  d="M 125 43 A 80 80 0 0 1 160 160"
                  stroke="var(--accent-red)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  opacity="0.75"
                />

                {/* Ticks and RPM numbers */}
                {Array.from({ length: 9 }).map((_, i) => {
                  const angle = -220 + i * 32.5; // Sweep angle from 0 to 8
                  const radians = (angle * Math.PI) / 180;
                  const x1 = 100 + 72 * Math.cos(radians);
                  const y1 = 100 + 72 * Math.sin(radians);
                  const x2 = 100 + 80 * Math.cos(radians);
                  const y2 = 100 + 80 * Math.sin(radians);
                  const textX = 100 + 55 * Math.cos(radians);
                  const textY = 100 + 55 * Math.sin(radians) + 4; // adjustment

                  const isRedline = i >= 7;

                  return (
                    <g key={i}>
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={isRedline ? "var(--accent-red)" : "rgba(255,255,255,0.4)"}
                        strokeWidth={isRedline ? "2" : "1.5"}
                      />
                      <text
                        x={textX}
                        y={textY}
                        fill={isRedline ? "var(--accent-red)" : "#ffffff"}
                        fontSize="11"
                        fontWeight="800"
                        fontFamily="var(--font-heading)"
                        textAnchor="middle"
                        opacity={isRedline ? "0.9" : "0.7"}
                      >
                        {i}
                      </text>
                    </g>
                  );
                })}

                {/* Center Hub */}
                <circle cx="100" cy="100" r="12" fill="#121216" stroke="#222" strokeWidth="2.5" />

                {/* Tachometer needle with spring physical rotation */}
                <line
                  x1="100"
                  y1="100"
                  x2="100"
                  y2="30"
                  stroke="var(--accent-red)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  style={{
                    transform: `rotate(${getNeedleRotation()}deg)`,
                    transformOrigin: "100px 100px",
                    transition: "transform 0.05s ease-out",
                  }}
                />
                
                {/* Secondary needle caps */}
                <circle cx="100" cy="100" r="4" fill="var(--accent-red)" />
              </svg>

              {/* Gauge central labels */}
              <div className={styles.gaugeLabels}>
                <span className={styles.revsCount}>{Math.round(rpm)}</span>
                <span className={styles.gaugeUnit}>RPM</span>
              </div>
            </div>

            {/* Brand Logo & Loading Text */}
            <div className={styles.brandContainer}>
              <h3 className={styles.brandTitle}>TAPI<span>MASTER</span></h3>
              <p className={styles.brandTagline}>INICIANDO MOTOR DE CABINA</p>
              <div className={styles.loadingBarWrapper}>
                <div className={styles.loadingBar} style={{ width: `${(rpm / 7400) * 100}%` }} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
