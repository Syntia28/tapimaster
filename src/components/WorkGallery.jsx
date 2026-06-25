"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./WorkGallery.module.css";

const GALLERY_ITEMS = [
  {
    id: 1,
    image: "/images/downloads/AdobeStock_1134428926.jpeg",
    category: "asientos",
    title: "Butacas Deportivas Diamond Stitch",
    material: "Cuero Americano Premium",
  },
  {
    id: 2,
    image: "/images/downloads/AdobeStock_1453597035_Editorial_Use_Only.jpeg",
    category: "asientos",
    title: "Cabina Ejecutiva Genuina",
    material: "Cuero Natural de Importación",
  },
  {
    id: 3,
    image: "/images/downloads/AdobeStock_1720048693.jpeg",
    category: "puertas",
    title: "Paneles Laterales de Puerta",
    material: "Tacto Cuero Americano",
  },
  {
    id: 4,
    image: "/images/downloads/AdobeStock_1740380285_Editorial_Use_Only.jpeg",
    category: "volantes",
    title: "Volante Deportivo con Costura Cruzada",
    material: "Cuero Natural Microperforado",
  },
  {
    id: 5,
    image: "/images/downloads/AdobeStock_2038520273.jpeg",
    category: "asientos",
    title: "Asiento Confort Reconstruido",
    material: "Cuero Americano Mate",
  },
  {
    id: 6,
    image: "/images/downloads/AdobeStock_2040182756.jpeg",
    category: "asientos",
    title: "Butacas con Costuras Rojas",
    material: "Tacto Cuero Negro",
  },
  {
    id: 7,
    image: "/images/downloads/AdobeStock_2043987453.jpeg",
    category: "consolas",
    title: "Consola Central y Fuelle de Cambios",
    material: "Pranna Sintético Reforzado",
  },
  {
    id: 8,
    image: "/images/downloads/AdobeStock_786454159.jpeg",
    category: "asientos",
    title: "Asientos Pick-Up Alta Resistencia",
    material: "Pranna Impermeable Gris",
  },
];

const CATEGORIES = [
  { id: "todos", name: "Todos los Trabajos" },
  { id: "asientos", name: "Asientos" },
  { id: "volantes", name: "Volantes" },
  { id: "puertas", name: "Paneles de Puerta" },
  { id: "consolas", name: "Consolas & Accesorios" },
];

export default function WorkGallery() {
  const [filter, setFilter] = useState("todos");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems =
    filter === "todos"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === filter);

  const openLightbox = (index) => {
    // Find index in the filtered items array to allow correct slider controls in Lightbox
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="galeria" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.subtitle}>Portafolio Real</span>
        <h2 className={styles.title}>Nuestros Trabajos</h2>
        <p className={styles.description}>
          Galería de autos reales tapizados en nuestro taller en Cajamarca. La calidad final de nuestras costuras y acabados habla por nosotros.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className={styles.filterContainer}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.filterBtn} ${filter === cat.id ? styles.filterBtnActive : ""}`}
            onClick={() => setFilter(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid of Items */}
      <motion.div layout className={styles.galleryGrid}>
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className={styles.galleryItem}
              onClick={() => openLightbox(index)}
            >
              <div
                className={styles.itemImage}
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className={styles.itemOverlay}>
                <span className={styles.itemCategory}>{item.category}</span>
                <h4 className={styles.itemTitle}>{item.title}</h4>
                <p className={styles.itemMaterial}>{item.material}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.lightboxOverlay}
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className={styles.lightboxContent}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button className={styles.lightboxClose} onClick={closeLightbox}>
                <X size={20} />
                <span>Cerrar</span>
              </button>

              {/* Navigation Arrows */}
              <button
                className={`${styles.lightboxArrow} ${styles.lightboxLeft}`}
                onClick={handlePrevImage}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className={`${styles.lightboxArrow} ${styles.lightboxRight}`}
                onClick={handleNextImage}
              >
                <ChevronRight size={24} />
              </button>

              {/* Main Image */}
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className={styles.lightboxImage}
              />

              {/* Title & description */}
              <div className={styles.lightboxInfo}>
                <h4 className={styles.lightboxTitle}>{filteredItems[lightboxIndex].title}</h4>
                <p className={styles.lightboxSub}>
                  Línea: {filteredItems[lightboxIndex].material} ({filteredItems[lightboxIndex].category.toUpperCase()})
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
