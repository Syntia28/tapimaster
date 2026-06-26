"use client";

import { motion } from "framer-motion";
import { Wrench, Layers, Scissors, Sparkles, ArrowRight } from "lucide-react";
import styles from "./LeatherPath.module.css";

const STEPS = [
  {
    step: "01",
    phase: "Desmontaje Quirúrgico",
    tagline: "Precisión Milimétrica",
    description: "Retiramos los asientos con cuidado quirúrgico, inspeccionamos la estructura metálica, eliminamos óxido y realizamos una limpieza profunda industrial.",
    icon: Wrench,
    details: "Protegemos todo el habitáculo antes de comenzar."
  },
  {
    step: "02",
    phase: "Esculpido Anatómico",
    tagline: "Confort Ergonómico",
    description: "Reconstruimos las espumas con material de alta densidad automotriz para recuperar el soporte lumbar y la forma original del asiento.",
    icon: Layers,
    details: "Viajes largos sin fatiga."
  },
  {
    step: "03",
    phase: "Alta Costura",
    tagline: "Artesanía de Lujo",
    description: "Cortamos cada panel con plantillas digitales y realizamos doble pespunte premium con hilos alemanes de alta tenacidad.",
    icon: Scissors,
    details: "Simetría perfecta y costuras deportivas."
  },
  {
    step: "04",
    phase: "El Toque Final",
    tagline: "Perfección & Protección",
    description: "Montamos todo con sensores de airbag, hidratamos el cuero y aplicamos protector UV premium contra el sol intenso de Cajamarca.",
    icon: Sparkles,
    details: "Entrega con aroma a cuero nuevo."
  }
];

export default function LeatherPath() {
  return (
    <section className={styles.section} id="proceso">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>EL PROCESO TAPI MASTER</span>
          <h2 className={styles.title}>De Asiento Viejo a Obra de Arte</h2>
          <p className={styles.description}>
            Cuatro etapas de artesanía extrema donde cada detalle importa.
            Esto es lo que diferencia un tapizado común de una cabina de lujo.
          </p>
        </div>

        <div className={styles.timeline}>
          <div className={styles.connectingLine} />

          <div className={styles.stepsGrid}>
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  className={styles.stepCard}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.12 }}
                  whileHover={{ y: -12 }}
                >
                  <div className={styles.nodeWrapper}>
                    <motion.div
                      className={styles.nodeIcon}
                      whileHover={{ scale: 1.2, rotate: 12 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Icon size={32} strokeWidth={1.8} />
                    </motion.div>
                    <div className={styles.nodeLine} />
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.cardHeader}>
                      <span className={styles.stepNumber}>{step.step}</span>
                      <div>
                        <span className={styles.tagline}>{step.tagline}</span>
                        <h4 className={styles.phaseTitle}>{step.phase}</h4>
                      </div>
                    </div>

                    <p className={styles.cardDesc}>{step.description}</p>

                    <div className={styles.cardFooter}>
                      <div className={styles.microDetailDot} />
                      <span className={styles.microDetailText}>{step.details}</span>
                    </div>
                  </div>

                  {idx < 3 && (
                    <div className={styles.desktopArrow}>
                      <ArrowRight size={22} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}