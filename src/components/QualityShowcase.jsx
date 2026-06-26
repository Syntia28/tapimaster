"use client";

import { useState, useRef, useEffect } from "react";
import { Play, X, Shield, Settings, Heart, CheckCircle2, Volume2, VolumeX, MessageCircle, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./QualityShowcase.module.css";

export default function QualityShowcase() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(248);
  const [hearts, setHearts] = useState([]);
  const [tiltStyle, setTiltStyle] = useState({});

  const videoRef = useRef(null);
  const phoneRef = useRef(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    setLikeCount(prev => nextLiked ? prev + 1 : prev - 1);

    if (nextLiked) {
      const newHearts = Array.from({ length: 7 }).map((_, i) => ({
        id: Date.now() + i,
        left: Math.random() * 70 + 15,
        delay: i * 0.08,
        scale: Math.random() * 0.5 + 0.8,
      }));
      setHearts(prev => [...prev, ...newHearts]);

      setTimeout(() => {
        setHearts(prev => prev.filter(h => !newHearts.some(nh => nh.id === h.id)));
      }, 2200);
    }
  };

  // 3D Tilt
  const handleMouseMove = (e) => {
    if (!phoneRef.current) return;
    const rect = phoneRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setTiltStyle({
      transform: `perspective(1200px) rotateX(${y * -18}deg) rotateY(${x * 22}deg) scale(1.04)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)",
    });
  };

  const QUALITY_POINTS = [
    { icon: <Settings size={26} />, title: "Reconstrucción Anatómica", desc: "Espumas de alta densidad + soporte lumbar original." },
    { icon: <Heart size={26} />, title: "Alta Costura Premium", desc: "Doble pespunte con hilo alemán y alineación perfecta." },
    { icon: <Shield size={26} />, title: "Garantía de Lujo", desc: "5 años contra agrietamiento y decoloración por UV." }
  ];

  return (
    <section id="calidad" className={styles.section}>
      <div className={styles.bgAccent} />

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Celular Interactivo - Lado Izquierdo */}
          <div className={styles.phoneContainer}>
            <motion.div
              ref={phoneRef}
              className={styles.phoneFrame}
              style={tiltStyle}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              whileHover={{ scale: 1.02 }}
            >
              <div className={styles.phoneSpeaker} />

              <div className={styles.phoneInnerScreen}>
                <video
                  ref={videoRef}
                  className={styles.videoElement}
                  src="/videos/upholstery_process.mp4"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  onLoadedMetadata={(e) => e.target.playbackRate = 1.6}
                  suppressHydrationWarning
                />

                {/* Live Indicator */}
                <div className={styles.liveTag}>
                  <span className={styles.liveDot} /> EN VIVO • Taller TapiMaster
                </div>

                {/* Corazones voladores */}
                <AnimatePresence>
                  {hearts.map(h => (
                    <motion.div
                      key={h.id}
                      className={styles.flyingHeart}
                      initial={{ bottom: "25%", opacity: 0, scale: 0.5 }}
                      animate={{
                        bottom: "85%",
                        opacity: [0, 1, 1, 0],
                        scale: [0.6, h.scale, 0.7]
                      }}
                      exit={{ opacity: 0 }}
                      style={{ left: `${h.left}%` }}
                      transition={{ duration: 2.2, delay: h.delay }}
                    >
                      ❤️
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Acciones laterales estilo TikTok */}
                <div className={styles.sideActions}>
                  <button className={`${styles.actionBtn} ${isLiked ? styles.liked : ""}`} onClick={handleLike}>
                    <Heart size={28} fill={isLiked ? "#ff0044" : "none"} />
                    <span>{likeCount}</span>
                  </button>
                  <button className={styles.actionBtn}>
                    <MessageCircle size={28} />
                    <span>42</span>
                  </button>
                  <button className={styles.actionBtn}>
                    <Share2 size={28} />
                  </button>
                </div>

                {/* Volumen */}
                <button className={styles.volumeBtn} onClick={toggleMute}>
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>

                {/* Overlay de texto */}
                <div className={styles.videoOverlay}>
                  <h5>@tapimaster.cajamarca</h5>
                  <p>Costura artesanal en cuero legítimo • Precisión de alta gama 🔥</p>
                </div>

                {/* Botón Play Grande */}
                <motion.button
                  className={styles.playBtn}
                  onClick={openModal}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Play size={32} fill="white" />
                </motion.button>
              </div>
            </motion.div>

            <p className={styles.reelFootnote}>
              Pasa el mouse sobre el celular • Activa el sonido • Dale ❤️
            </p>
          </div>

          {/* Contenido Derecho */}
          <div className={styles.infoContent}>
            <span className={styles.subtitle}>CALIDAD QUE SE VE Y SE SIENTE</span>
            <h2 className={styles.title}>El Arte Detrás de Cada Costura</h2>
            <p className={styles.introText}>
              No solo tapizamos. Creamos experiencias de lujo para tu vehículo con materiales premium y mano de obra de élite.
            </p>

            <div className={styles.featuresGrid}>
              {QUALITY_POINTS.map((point, i) => (
                <motion.div
                  key={i}
                  className={styles.featureCard}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ scale: 1.03, x: 10 }}
                >
                  <div className={styles.featureIcon}>{point.icon}</div>
                  <div>
                    <h4>{point.title}</h4>
                    <p>{point.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Video */}
      <AnimatePresence>
        {isOpen && (
          <motion.div className={styles.modalOverlay} onClick={closeModal}>
            <motion.div className={styles.modalContent} onClick={e => e.stopPropagation()}>
              <button className={styles.closeBtn} onClick={closeModal}>
                <X size={24} /> Cerrar
              </button>
              <video className={styles.modalVideo} src="/videos/upholstery_process.mp4" autoPlay controls loop onLoadedMetadata={(e) => e.target.playbackRate = 1.6} suppressHydrationWarning />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}