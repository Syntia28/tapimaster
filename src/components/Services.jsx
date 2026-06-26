"use client";

import { Check, X, ArrowRight, MessageSquare, Award, Zap, Crown } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./Services.module.css";

const SERVICES = [
  {
    id: "economica",
    icon: Zap,
    name: "Línea Económica",
    priceRange: "Ahorro Inteligente",
    description: "Restauración funcional y duradera. Ideal para presupuestos ajustados sin sacrificar calidad.",
    features: [
      { text: "Materiales: Pranna sintético o tela estándar", active: true },
      { text: "Costura lineal simple de alta tensión", active: true },
      { text: "Limpieza estructural y remoción de óxido", active: true },
      { text: "Garantía de 1 año en costuras", active: true },
      { text: "Restauración anatómica de espumas", active: false },
      { text: "Tapizado de paneles y timón", active: false },
    ],
    popular: false,
    ctaMessage: "Hola%20TapiMaster,%20quiero%20cotizar%20el%20tapizado%20L%C3%ADnea%20Econ%C3%B3mica%20para%20mi%20auto."
  },
  {
    id: "regular",
    icon: Award,
    name: "Línea Regular",
    priceRange: "El Favorito",
    description: "El equilibrio perfecto entre confort, estilo y durabilidad. La opción más elegida por nuestros clientes.",
    features: [
      { text: "Materiales: Tacto Cuero o Americano Estándar", active: true },
      { text: "Costuras deportivas contrastadas", active: true },
      { text: "Restauración parcial de espumas", active: true },
      { text: "Garantía de 3 años", active: true },
      { text: "Tapizado de cabeceras y apoyabrazos", active: true },
      { text: "Paneles de puertas", active: false },
    ],
    popular: true,
    ctaMessage: "Hola%20TapiMaster,%20quiero%20cotizar%20el%20tapizado%20L%C3%ADnea%20Regular%20para%20mi%20auto."
  },
  {
    id: "premium",
    icon: Crown,
    name: "Línea Premium",
    priceRange: "Lujo & Exclusividad",
    description: "Lo mejor de lo mejor. Cuero natural de alta gama, diseño personalizado y acabados de alta costura.",
    features: [
      { text: "Cuero Natural o Americano Premium", active: true },
      { text: "Diseño personalizado (Rombo, F-Sport, etc)", active: true },
      { text: "Restauración anatómica completa", active: true },
      { text: "Costura doble reforzada premium", active: true },
      { text: "Tapizado completo (puertas, consolas, timón)", active: true },
      { text: "Garantía de 5 años por escrito", active: true },
    ],
    popular: false,
    ctaMessage: "Hola%20TapiMaster,%20quiero%20cotizar%20el%20tapizado%20L%C3%ADnea%20Premium%20para%20mi%20auto."
  }
];

export default function Services() {
  return (
    <section id="servicios" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.subtitle}>NUESTRAS LÍNEAS</span>
        <h2 className={styles.title}>Elige tu Nivel de Confort</h2>
        <p className={styles.description}>
          Tres niveles pensados para diferentes necesidades y presupuestos. Todos con la calidad TapiMaster.
        </p>
      </div>

      <div className={styles.grid}>
        {SERVICES.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -12 }}
              className={`${styles.card} ${service.popular ? styles.cardPopular : ""} ${service.id === "premium" ? styles.cardPremium : ""}`}
            >
              {service.popular && (
                <div className={styles.popularBadge}>
                  <span>MÁS SOLICITADO</span>
                </div>
              )}

              <div className={styles.cardIcon}>
                <Icon size={52} strokeWidth={1.8} />
              </div>

              <div className={styles.cardHeader}>
                <h3 className={styles.serviceName}>{service.name}</h3>
                <span className={styles.priceRange}>{service.priceRange}</span>
              </div>

              <p className={styles.serviceDesc}>{service.description}</p>

              <div className={styles.featuresList}>
                {service.features.map((feature, i) => (
                  <div key={i} className={styles.featureItem}>
                    {feature.active ? (
                      <Check className={styles.checkIcon} size={20} />
                    ) : (
                      <X className={styles.xIcon} size={20} />
                    )}
                    <span className={feature.active ? "" : styles.muted}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <motion.a
                href={`https://wa.me/51992855239?text=${service.ctaMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaBtn}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageSquare size={18} />
                Cotizar esta línea
                <ArrowRight size={18} />
              </motion.a>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}