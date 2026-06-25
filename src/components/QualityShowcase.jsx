"use client";

import { useState, useRef } from "react";
import { Play, X, Shield, Settings, Heart, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./QualityShowcase.module.css";

export default function QualityShowcase() {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const QUALITY_POINTS = [
    {
      icon: <Settings size={20} />,
      title: "Reconstrucción Anatómica Completa",
      description: "No nos limitamos a cambiar el material. Evaluamos la estructura metálica del asiento, rellenamos las espumas desgastadas y devolvemos la firmeza y soporte lumbar de fábrica."
    },
    {
      icon: <Heart size={20} />,
      title: "Costuras de Alta Densidad y Doble Hilo",
      description: "Utilizamos hilos sintéticos alemanes de alta resistencia a la tensión y la fricción. Costuras dobles reforzadas con una alineación exacta y deportiva hecha a mano."
    },
    {
      icon: <Shield size={20} />,
      title: "Garantía Escrita TapiMaster",
      description: "Nuestros trabajos cuentan con garantía de costura y adhesión de material. Nos enorgullece saber que tu tapizado durará años bajo el sol de Cajamarca sin despegarse ni romperse."
    }
  ];

  return (
    <section id="calidad" className={styles.section}>
      <div className={styles.grid}>
        {/* Left Column: Interactive Video Showcase */}
        <div className={styles.videoWrapper}>
          {/* Autoplaying background video preview */}
          <video
            ref={videoRef}
            className={styles.videoElement}
            src="https://assets.mixkit.co/videos/preview/mixkit-sewing-machine-stitching-a-leather-piece-41718-large.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className={styles.videoOverlay}>
            <span className={styles.videoTag}>En Acción</span>
            <h4 className={styles.videoTitle}>Proceso de Costura Premium</h4>
            <p className={styles.videoDesc}>Mira cómo confeccionamos cada panel a mano con precisión milimétrica.</p>
          </div>

          {/* Floating Play Button */}
          <button 
            className={styles.playBtn} 
            onClick={openModal}
            aria-label="Reproducir video de calidad a pantalla completa"
          >
            <Play size={28} fill="white" />
          </button>
        </div>

        {/* Right Column: Narrative details */}
        <div className={styles.infoContent}>
          <span className={styles.subtitle}>Saber Hacer & Calidad</span>
          <h2 className={styles.title}>¿Por qué elegir nuestro trabajo?</h2>
          <p className={styles.introText}>
            En Cajamarca, nos distinguimos por el cuidado de los detalles. La diferencia entre un tapizado común y uno premium radica en la preparación y el acabado artesanal.
          </p>

          <div className={styles.featuresGrid}>
            {QUALITY_POINTS.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={styles.featureCard}
              >
                <div className={styles.featureIconWrapper}>
                  {point.icon}
                </div>
                <div className={styles.featureText}>
                  <h4 className={styles.featureTitle}>{point.title}</h4>
                  <p className={styles.featureDesc}>{point.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.modalOverlay}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={closeModal}>
                <X size={18} />
                <span>Cerrar</span>
              </button>

              {/* Full screen video loop / larger size */}
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/5a2W6O4R778?autoplay=1&mute=1&loop=1&playlist=5a2W6O4R778"
                title="Tapicería Automotriz - Proceso de costura"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ border: "none" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
