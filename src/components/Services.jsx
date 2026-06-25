"use client";

import { Check, X, ArrowRight, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./Services.module.css";

const SERVICES = [
  {
    id: "economica",
    name: "Línea Económica",
    priceRange: "Ahorro & Funcionalidad",
    description: "Tapizado limpio y resistente para presupuestos ajustados. Diseñado para conductores que buscan restaurar la estética básica del vehículo de forma duradera.",
    features: [
      { text: "Materiales: Pranna sintético o tela estándar", active: true },
      { text: "Costura lineal simple de alta tensión", active: true },
      { text: "Limpieza estructural y remoción de óxido", active: true },
      { text: "Garantía de 1 año en costuras", active: true },
      { text: "Restauración anatómica de espumas", active: false },
      { text: "Tapizado de paneles de puertas y timón", active: false },
    ],
    popular: false,
    ctaMessage: "Hola%20TapiMaster,%20quiero%20cotizar%20el%20tapizado%20L%C3%ADnea%20Econ%C3%B3mica%20para%20mi%20auto."
  },
  {
    id: "regular",
    name: "Línea Regular",
    priceRange: "Estilo & Confort Diario",
    description: "La opción preferida de los particulares. Ofrece el balance perfecto entre suavidad, resistencia al calor solar de la sierra y personalización de costuras.",
    features: [
      { text: "Materiales: Tacto Cuero o Americano Estándar", active: true },
      { text: "Costuras deportivas con colores contrastados", active: true },
      { text: "Restauración y nivelación parcial de espumas", active: true },
      { text: "Garantía de 3 años contra agrietamiento", active: true },
      { text: "Tapizado de cabeceras y apoyabrazos", active: true },
      { text: "Tapizado de paneles de puertas y timón", active: false },
    ],
    popular: true,
    ctaMessage: "Hola%20TapiMaster,%20quiero%20cotizar%20el%20tapizado%20L%C3%ADnea%20Regular%20para%20mi%20auto."
  },
  {
    id: "premium",
    name: "Línea Premium",
    priceRange: "Exclusividad & Alta Costura",
    description: "Para quienes exigen lo mejor. Acabado de lujo con Cuero Natural o Cuero Americano de alto calibre. Confección anatómica a la medida exacta del asiento.",
    features: [
      { text: "Materiales: Cuero Natural o Americano Premium", active: true },
      { text: "Diseño personalizado (Rombo, F-Sport o Clásico)", active: true },
      { text: "Restauración anatómica completa de espumas", active: true },
      { text: "Costura doble deportiva reforzada (Stitching)", active: true },
      { text: "Tapizado de puertas, fuelles, consolas y timón", active: true },
      { text: "Garantía de 5 años por escrito completa", active: true },
    ],
    popular: false,
    ctaMessage: "Hola%20TapiMaster,%20quiero%20cotizar%20el%20tapizado%20L%C3%ADnea%20Premium%20para%20mi%20auto."
  }
];

export default function Services() {
  return (
    <section id="servicios" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.subtitle}>Nuestras Líneas</span>
        <h2 className={styles.title}>Nivel de Servicio</h2>
        <p className={styles.description}>
          Ofrecemos soluciones a medida según tus necesidades y presupuesto. Compara nuestras líneas de tapizado y elige el confort que tu auto merece.
        </p>
      </div>

      <div className={styles.grid}>
        {SERVICES.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className={`light-panel ${styles.card} ${service.popular ? styles.cardPremium : ""}`}
          >
            {service.popular && <span className={styles.popularBadge}>Más Solicitado</span>}
            {service.id === "premium" && <span className={styles.popularBadge} style={{ background: "linear-gradient(135deg, #eab308 0%, #ca8a04 100%)", color: "black" }}>Exclusivo</span>}

            <div className={styles.cardHeader}>
              <h3 className={styles.serviceName}>{service.name}</h3>
              <span className={styles.servicePriceRange}>{service.priceRange}</span>
            </div>

            <p className={styles.serviceDesc}>{service.description}</p>

            <div className={styles.featuresList}>
              {service.features.map((feature, fIndex) => (
                <div key={fIndex} className={styles.featureItem}>
                  {feature.active ? (
                    <Check size={18} className={styles.featureIcon} />
                  ) : (
                    <X size={18} className={styles.featureIcon} style={{ color: "var(--text-muted)" }} />
                  )}
                  <span className={feature.active ? styles.featureText : styles.featureTextMuted}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.cardFooter}>
              <a
                href={`https://wa.me/51976543210?text=${service.ctaMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-sporty ${styles.ctaBtn} ${!service.popular && service.id !== "premium" ? "btn-sporty-secondary" : "stitching-border"}`}
              >
                <MessageSquare size={16} />
                <span>Elegir {service.name.split(" ")[1]}</span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
