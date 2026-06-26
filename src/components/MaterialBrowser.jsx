"use client";

import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, ShieldAlert, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./MaterialBrowser.module.css";

const MATERIALS = [
  {
    id: "pranna",
    name: "Pranna",
    badge: "Sintético Premium",
    badgeType: "synthetic",
    description: "Siente la robustez y frescura de la Pranna. Un sintético automotriz de alta ingeniería formulado para soportar el tránsito pesado diario sin perder su color o textura original. Diseñado para resistir la abrasión en camionetas de trabajo y vehículos comerciales.",
    benefits: [
      { title: "Durabilidad Extrema: ", desc: "Resistencia superior al frotamiento constante y tensiones mecánicas." },
      { title: "Mantenimiento Cero: ", desc: "100% impermeable. Se limpia al instante con un paño húmedo y jabón suave." },
      { title: "Tránsito Pesado: ", desc: "Ideal para minería, camionetas pickup y flotas de alto recorrido." }
    ],
    warranty: "2 Años de Garantía",
    gallery: [
      { url: "/images/real/trabajo5_consola_bellows.png", label: "Tapizado en Pranna Negro", sub: "Consola de alta resistencia" },
      { url: "/images/real/trabajo6_asientos_pick_up.png", label: "Butacas de Trabajo en Pranna", sub: "Durabilidad garantizada en Cajamarca" }
    ]
  },
  {
    id: "tacto-cuero",
    name: "Tacto Cuero",
    badge: "Sintético Flexible",
    badgeType: "synthetic",
    description: "Experimenta la suavidad táctil y el confort del Tacto Cuero. Un material flexible con base textil que emula la textura del cuero premium, adaptándose ergonómicamente a tus butacas para un viaje placentero y suave.",
    benefits: [
      { title: "Relación Costo-Beneficio: ", desc: "Aspecto elegante y premium con una inversión inteligente y moderada." },
      { title: "Protección UV Integrada: ", desc: "Formulado para resistir la radiación de Cajamarca sin resecarse ni agrietarse." },
      { title: "Confort y Suavidad: ", desc: "Excelente elasticidad que incrementa la comodidad de los pasajeros." }
    ],
    warranty: "3 Años de Garantía",
    gallery: [
      { url: "/images/real/trabajo2_asiento_accent.png", label: "Butacas Deportivas en Tacto Cuero", sub: "Costuras rojas deportivas reforzadas" },
      { url: "/images/real/trabajo4_puerta_pranna.png", label: "Tapizado Completo en Tacto Cuero", sub: "Renovación total de interiores" }
    ]
  },
  {
    id: "cuero-americano",
    name: "Cuero Americano",
    badge: "Sintético de Alta Gama",
    badgeType: "premium",
    description: "Descubre la imponente presencia del Cuero Americano. Un revestimiento de calibre grueso con acabado mate y grano pronunciado que evoca el lujo clásico con un rendimiento térmico sobresaliente, ideal para climas cambiantes.",
    benefits: [
      { title: "Calibre Grueso y Firme: ", desc: "Mayor espesor que proporciona costuras de relieve pronunciado muy estéticas." },
      { title: "Textura Fotorrealista: ", desc: "Grano grabado de alta resolución que compite directamente con el cuero natural." },
      { title: "Retardante de Llama: ", desc: "Material con certificación ignífuga y alta resistencia a la fricción." }
    ],
    warranty: "4 Años de Garantía",
    gallery: [
      { url: "/images/real/trabajo1_asiento_hilux.png", label: "Interior Luxury en Cuero Americano", sub: "Detalle de costuras tipo rombo" },
      { url: "/images/real/trabajo2_asiento_accent.png", label: "Asientos y Apoyabrazos Americano", sub: "Acabado mate de alta costura" }
    ]
  },
  {
    id: "cuero-natural",
    name: "Cuero Natural",
    badge: "Exclusivo Genuino",
    badgeType: "genuine",
    description: "Siente el aroma del cuero legítimo de importación. Cuero 100% genuino de vacuno seleccionado que respira de forma natural, templándose en el frío y manteniéndose fresco bajo el calor de la sierra cajamarquina.",
    benefits: [
      { title: "Transpirabilidad Natural: ", desc: "Permite la circulación de aire, evitando la acumulación de calor corporal." },
      { title: "Aroma y Lujo Supremo: ", desc: "Textura inimitable y fragancia de cuero auténtico de gama ejecutiva." },
      { title: "Inversión para Toda la Vida: ", desc: "Durabilidad superior a una década con la pátina elegante que da el tiempo." }
    ],
    warranty: "5 Años de Garantía Completa",
    gallery: [
      { url: "/images/real/trabajo1_asiento_hilux.png", label: "Tapizado en Cuero Legítimo de Exportación", sub: "Costuras dobles y tacto premium" },
      { url: "/images/real/trabajo3_volante_rio.png", label: "Detalles en Cuero Natural Cosido a Mano", sub: "Volante y palanca de cambios" }
    ]
  }
];

export default function MaterialBrowser() {
  const [activeTab, setActiveTab] = useState("pranna");
  const [galleryIndexes, setGalleryIndexes] = useState({
    pranna: 0,
    "tacto-cuero": 0,
    "cuero-americano": 0,
    "cuero-natural": 0,
  });

  // Magnifier State
  const [hovering, setHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, percentX: 50, percentY: 50, clientX: 0, clientY: 0 });

  const activeMaterial = MATERIALS.find((m) => m.id === activeTab);
  const currentImgIndex = galleryIndexes[activeTab];

  const handlePrevImage = () => {
    setGalleryIndexes((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab] === 0 ? activeMaterial.gallery.length - 1 : prev[activeTab] - 1,
    }));
  };

  const handleNextImage = () => {
    setGalleryIndexes((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab] === activeMaterial.gallery.length - 1 ? 0 : prev[activeTab] + 1,
    }));
  };

  const getBadgeClass = (type) => {
    switch (type) {
      case "synthetic":
        return styles.badgeSynthetic;
      case "premium":
        return styles.badgePremium;
      case "genuine":
        return styles.badgeGenuine;
      default:
        return styles.badgeSynthetic;
    }
  };

  // Magnifier mouse tracker
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({
      x,
      y,
      percentX: (x / rect.width) * 100,
      percentY: (y / rect.height) * 100,
      clientX: e.clientX,
      clientY: e.clientY
    });
  };

  // Get dynamic CSS filter to shift color of macro leather texture
  const getFilterForMaterial = (id) => {
    switch (id) {
      case "pranna":
        // Fine black tech synthetic look
        return "brightness(0.7) contrast(1.15) grayscale(1)";
      case "tacto-cuero":
        // Soft matte black
        return "brightness(0.9) contrast(0.9)";
      case "cuero-americano":
        // Standard premium leather
        return "brightness(0.8) contrast(1.1)";
      case "cuero-natural":
        // Luxurious brown leather color shifting
        return "sepia(0.6) brightness(0.65) contrast(1.15) hue-rotate(15deg)";
      default:
        return "none";
    }
  };

  return (
    <section id="materiales" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.subtitle}>Con qué trabajamos</span>
        <h2 className={styles.title}>Nuestros Materiales Premium</h2>
        <p className={styles.description}>
          Seleccionamos únicamente materiales certificados de grado automotriz. Pasa el cursor sobre los paneles de detalles para magnificar la textura de alta costura.
        </p>
      </div>

      {/* Tabs Selector */}
      <div className={styles.tabsContainer}>
        {MATERIALS.map((material) => (
          <button
            key={material.id}
            className={`${styles.tabBtn} ${activeTab === material.id ? styles.tabBtnActive : ""}`}
            onClick={() => setActiveTab(material.id)}
          >
            {material.name}
          </button>
        ))}
      </div>

      {/* Dynamic Content Grid */}
      <div className={styles.contentGrid}>
        {/* Left Side Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMaterial.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className={`light-panel ${styles.detailsCard}`}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onMouseMove={handleMouseMove}
          >
            <div className={styles.materialHeader}>
              <h3 className={styles.materialName}>{activeMaterial.name}</h3>
              <span className={`${styles.badge} ${getBadgeClass(activeMaterial.badgeType)}`}>
                {activeMaterial.badge}
              </span>
            </div>

            <p className={styles.materialDesc}>{activeMaterial.description}</p>

            <div className={styles.benefitsList}>
              {activeMaterial.benefits.map((benefit, index) => (
                <div key={index} className={styles.benefitItem}>
                  <Check size={18} className={styles.benefitIcon} />
                  <p className={styles.benefitText}>
                    <span>{benefit.title}</span>
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className={styles.warrantyInfo}>
              <Award size={20} className={styles.benefitIcon} />
              <div>
                <span className={styles.warrantyLabel}>Resistencia & Garantía:</span>
                <p className={styles.warrantyValue}>{activeMaterial.warranty}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right Side Mini-Gallery Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeMaterial.id}-gallery-${currentImgIndex}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className={styles.galleryCard}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onMouseMove={handleMouseMove}
          >
            <div
              className={styles.galleryImage}
              style={{ backgroundImage: `url(${activeMaterial.gallery[currentImgIndex].url})` }}
            />
            <div className={styles.galleryOverlay}>
              <h4 className={styles.galleryLabel}>{activeMaterial.gallery[currentImgIndex].label}</h4>
              <p className={styles.gallerySub}>{activeMaterial.gallery[currentImgIndex].sub}</p>
            </div>

            {/* Navigation Arrows */}
            <div className={styles.galleryControls}>
              <button className={styles.galleryArrow} onClick={handlePrevImage} aria-label="Imagen anterior">
                <ChevronLeft size={20} />
              </button>
              <button className={styles.galleryArrow} onClick={handleNextImage} aria-label="Siguiente imagen">
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Dot Indicator */}
            <div className={styles.thumbsContainer}>
              {activeMaterial.gallery.map((_, index) => (
                <div
                  key={index}
                  className={`${styles.thumbDot} ${index === currentImgIndex ? styles.thumbDotActive : ""}`}
                  onClick={() => setGalleryIndexes((prev) => ({ ...prev, [activeTab]: index }))}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Magnifier Lens Portal */}
      <AnimatePresence>
        {hovering && (
          <motion.div
            className={styles.magnifierLens}
            style={{
              left: `${mousePos.clientX}px`,
              top: `${mousePos.clientY}px`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={styles.magnifierImage}
              style={{
                backgroundImage: "url('/images/textures/leather_macro.png')",
                backgroundPosition: `${mousePos.percentX}% ${mousePos.percentY}%`,
                filter: getFilterForMaterial(activeTab),
              }}
            />
            <div className={styles.magnifierIndicator}>Zoom Textura {activeMaterial.name}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
