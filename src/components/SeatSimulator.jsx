"use client";

import { useState } from "react";
import { CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./SeatSimulator.module.css";

const LEATHERS = [
  {
    id: "negro",
    name: "Negro Carbón",
    type: "Cuero Americano",
    desc: "Negro mate profundo con grano medio. Deportividad y elegancia insuperable.",
    centerGrad: ["#34343d", "#1a1a20"],
    sideGrad: ["#23232a", "#0f0f12"],
    bgHex: "#1a1a1c",
  },
  {
    id: "beige",
    name: "Beige Confort",
    type: "Tacto Cuero Premium",
    desc: "Tono cálido y luminoso. Perfecto para climas soleados como Cajamarca.",
    centerGrad: ["#f7eedf", "#d2beab"],
    sideGrad: ["#eedcc7", "#c0ab96"],
    bgHex: "#e3d4c5",
  },
  {
    id: "marron",
    name: "Marrón Habanero",
    type: "Cuero Natural Genuino",
    desc: "Lujo ejecutivo con pátina natural y aroma premium.",
    centerGrad: ["#895837", "#4a2c1a"],
    sideGrad: ["#70462b", "#2c1a12"],
    bgHex: "#663e26",
  }
];

const STITCHES = [
  { id: "rojo", name: "Rojo Competizione", hex: "#dc2626" },
  { id: "dorado", name: "Oro Champagne", hex: "#d4af37" },
  { id: "negro", name: "Negro Sigilo", hex: "#111111" }
];

const STITCH_STYLES = [
  { id: "linear", name: "Clásico Lineal", desc: "Costuras elegantes y sobrias" },
  { id: "diamond", name: "Rombo Deportivo", desc: "Acolchado diamante premium" },
  { id: "fsport", name: "F-Sport Ribbed", desc: "Estilo superdeportivo" }
];

export default function SeatSimulator() {
  const [leather, setLeather] = useState(LEATHERS[0]);
  const [stitch, setStitch] = useState(STITCHES[0]);
  const [stitchStyle, setStitchStyle] = useState(STITCH_STYLES[0].id);

  const handleWhatsAppQuote = () => {
    const styleName = STITCH_STYLES.find(s => s.id === stitchStyle)?.name || "";
    const message = `Hola TapiMaster!\nQuiero cotizar esta combinación:\n\n• Cuero: ${leather.name} (${leather.type})\n• Costura: ${stitch.name}\n• Estilo: ${styleName}`;
    window.open(`https://wa.me/51992855239?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section className={styles.section} id="simulador">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>CONFIGURADOR 3D PREMIUM</span>
          <h2 className={styles.title}>Diseña Tu Interior de Lujo</h2>
          <p className={styles.description}>
            Experimenta en tiempo real cómo se vería tu asiento con diferentes cueros, colores de costura y estilos de acolchado.
          </p>
        </div>

        <div className={styles.layoutGrid}>
          {/* PREVIEW DEL ASIENTO */}
          <div className={styles.previewCanvas}>
            <div className={styles.canvasGlow}
              style={{
                background: stitch.id === "rojo"
                  ? "radial-gradient(circle, rgba(220,38,38,0.45) 0%, transparent 70%)"
                  : stitch.id === "dorado"
                    ? "radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)"
                    : "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)"
              }}
            />

            <motion.svg
              key={`${leather.id}-${stitch.id}-${stitchStyle}`}
              className={styles.seatSvg}
              viewBox="0 0 400 520"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <defs>
                <linearGradient id="centerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={leather.centerGrad[0]} />
                  <stop offset="100%" stopColor={leather.centerGrad[1]} />
                </linearGradient>
                <linearGradient id="sideGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={leather.sideGrad[0]} />
                  <stop offset="100%" stopColor={leather.sideGrad[1]} />
                </linearGradient>

                <filter id="leather3d" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feSpecularLighting specularExponent="18" lightingColor="#ffffff">
                    <fePointLight x="160" y="80" z="130" />
                  </feSpecularLighting>
                  <feComposite in="SourceGraphic" in2="specular" operator="arithmetic" k2="1.1" />
                </filter>
              </defs>

              {/* Asiento Completo Mejorado */}
              <g filter="url(#leather3d)">
                {/* Respaldo Lateral */}
                <path d="M 120 80 Q 70 170 70 290 Q 80 340 125 340 L 275 340 Q 325 340 330 290 Q 325 170 270 80 Z"
                  fill="url(#sideGrad)" stroke="#111" strokeWidth="12" strokeLinejoin="round" />

                {/* Respaldo Centro */}
                <path d="M 145 95 Q 200 85 255 95 L 265 295 Q 200 315 135 295 Z"
                  fill="url(#centerGrad)" stroke="#0a0a0a" strokeWidth="6" />

                {/* Costuras Respaldo */}
                {stitchStyle === "linear" && (
                  <>
                    <path d="M 155 135 Q 200 130 245 135" stroke={stitch.hex} strokeWidth="4" strokeDasharray="5,3" />
                    <path d="M 152 180 Q 200 175 248 180" stroke={stitch.hex} strokeWidth="4" strokeDasharray="5,3" />
                    <path d="M 148 225 Q 200 220 252 225" stroke={stitch.hex} strokeWidth="4" strokeDasharray="5,3" />
                  </>
                )}

                {stitchStyle === "diamond" && (
                  <path d="M 145 95 Q 200 85 255 95 L 265 295 Q 200 315 135 295 Z" fill="#ffffff" fillOpacity="0.08" stroke={stitch.hex} strokeWidth="2" />
                )}

                {/* Base del Asiento */}
                <path d="M 95 355 Q 50 390 55 445 Q 65 480 115 480 L 285 480 Q 340 480 345 445 Q 350 395 300 355 Z"
                  fill="url(#sideGrad)" stroke="#111" strokeWidth="12" strokeLinejoin="round" />

                {/* Centro Base */}
                <path d="M 130 360 Q 200 355 270 360 L 280 445 Q 200 465 120 445 Z"
                  fill="url(#centerGrad)" stroke="#0a0a0a" strokeWidth="6" />

                {/* Costuras Base */}
                {stitchStyle === "linear" && (
                  <path d="M 140 390 Q 200 385 260 390" stroke={stitch.hex} strokeWidth="4" strokeDasharray="5,3" />
                )}
              </g>

              {/* Detalles finales */}
              <circle cx="200" cy="280" r="8" fill="#111" />
            </motion.svg>


          </div>

          {/* PANEL DE CONTROL */}
          <div className={styles.controlPanel}>
            <div className={styles.panelBody}>
              <div className={styles.panelHeader}>
                <div className={styles.brand}>TAPI•CONFIGURATOR PRO</div>
                <h3>Crea Tu Combinación Perfecta</h3>
                <p>Personaliza tu asiento en tiempo real</p>
              </div>

              {/* 1. Cuero */}
              <div className={styles.optionSection}>
                <div className={styles.sectionLabel}>1. Material del Cuero</div>
                <div className={styles.leatherGrid}>
                  {LEATHERS.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => setLeather(item)}
                      className={`${styles.leatherCard} ${leather.id === item.id ? styles.active : ""}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <div className={styles.swatch} style={{ backgroundColor: item.bgHex }} />
                      <div className={styles.info}>
                        <strong>{item.name}</strong>
                        <span>{item.type}</span>
                      </div>
                      {leather.id === item.id && <CheckCircle2 className={styles.checkIcon} />}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* 2. Costura */}
              <div className={styles.optionSection}>
                <div className={styles.sectionLabel}>2. Color de Costura</div>
                <div className={styles.stitchRow}>
                  {STITCHES.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => setStitch(item)}
                      className={`${styles.stitchBtn} ${stitch.id === item.id ? styles.active : ""}`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className={styles.colorDot} style={{ backgroundColor: item.hex }} />
                      {item.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* 3. Estilo */}
              <div className={styles.optionSection}>
                <div className={styles.sectionLabel}>3. Estilo de Costura</div>
                {STITCH_STYLES.map((style) => (
                  <motion.button
                    key={style.id}
                    onClick={() => setStitchStyle(style.id)}
                    className={`${styles.styleBtn} ${stitchStyle === style.id ? styles.active : ""}`}
                    whileHover={{ x: 10 }}
                  >
                    <strong>{style.name}</strong>
                    <span>{style.desc}</span>
                  </motion.button>
                ))}
              </div>

              <motion.button
                className={styles.quoteBtn}
                onClick={handleWhatsAppQuote}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageCircle size={22} />
                COTIZAR ESTA COMBINACIÓN
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}