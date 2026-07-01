"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Check, Car, Shield, Palette, Star, Diamond, Bolt, Award, Crown, Phone, MessageSquare, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Contact.module.css";

const MATERIALS = [
  { value: "pranna", label: "Pranna", desc: "Sintético resistente, ideal para uso diario y climas exigentes.", badge: "Económico", badgeType: "eco", icon: <Shield size={24} /> },
  { value: "tacto-cuero", label: "Tacto Cuero", desc: "Suavidad premium con acabado tipo cuero y alta flexibilidad.", badge: null, badgeType: null, icon: <Palette size={24} /> },
  { value: "cuero-americano", label: "Cuero Americano", desc: "Gama media-alta. Durabilidad y elegancia comprobada.", badge: "Más elegido", badgeType: "pop", icon: <Star size={24} /> },
  { value: "cuero-natural", label: "Cuero Genuino Natural", desc: "Lo mejor. Textura auténtica, exclusiva para alta gama.", badge: "Premium", badgeType: "top", icon: <Diamond size={24} /> },
];

const SERVICES = [
  { value: "economica", label: "Línea Económica", desc: "Renovación limpia y funcional al mejor precio.", badge: "Accesible", badgeType: "eco", icon: <Bolt size={24} />, wide: false },
  { value: "regular", label: "Línea Regular", desc: "Equilibrio perfecto: calidad, detalle y valor.", badge: "Recomendado", badgeType: "pop", icon: <Award size={24} />, wide: false },
  { value: "premium", label: "Línea Premium — Alta Gama", desc: "Costuras especiales, diseños exclusivos, espumas de alta densidad. Para quien no acepta menos.", badge: "Exclusivo", badgeType: "top", icon: <Crown size={24} />, wide: true },
];

const MATERIAL_NAMES = { pranna: "Pranna (Sintético)", "tacto-cuero": "Tacto Cuero", "cuero-americano": "Cuero Americano", "cuero-natural": "Cuero Genuino Natural" };
const SERVICE_NAMES = { economica: "Línea Económica", regular: "Línea Regular", premium: "Línea Premium (Alta Gama)" };

const STEPS = ["Material", "Acabado", "Tus datos", "Resumen"];

export default function Contact() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ material: "", service: "", name: "", phone: "", car: "", notes: "" });

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const buildWA = () => {
    const msg = `Hola TapiMaster! Mi nombre es ${form.name}. Quiero cotizar un tapizado para mi vehículo ${form.car}.\n\n*Detalles:*\n- *Material:* ${MATERIAL_NAMES[form.material]}\n- *Servicio:* ${SERVICE_NAMES[form.service]}\n- *Mi teléfono:* ${form.phone}${form.notes ? `\n- *Notas:* ${form.notes}` : ""}`;
    return `https://wa.me/51992855239?text=${encodeURIComponent(msg)}`;
  };

  const handleSend = () => {
    setDone(true);
    setTimeout(() => window.open(buildWA(), "_blank"), 1200);
  };

  const progress = done ? 100 : step * 25;

  return (
    <section id="contacto" className={styles.section}>
      <div className={styles.grid}>

        {/* LEFT: Info + Map */}
        <div className={styles.infoColumn}>
          <div className={styles.header}>
            <span className={styles.subtitle}>Encuéntranos</span>
            <h2 className={styles.title}>Visita Nuestro Taller</h2>
          </div>
          <p className={styles.introText}>
            Estamos ubicados en una zona accesible de Cajamarca. Ven con tu vehículo para una cotización presencial y una muestra directa de nuestros cueros y costuras.
          </p>
          <div className={styles.contactList}>
            {[
              { icon: "📍", label: "Dirección", value: "Jr. Mariscal Cáceres 1031, Cajamarca" },
              { icon: "📞", label: "Teléfono / WhatsApp", value: "+51 976 543 210" },
              { icon: "🕐", label: "Horario de Atención", value: "Lun - Sáb: 8:00 AM - 6:30 PM" },
            ].map(item => (
              <div key={item.label} className={styles.contactItem}>
                <div className={styles.iconWrapper}>{item.icon}</div>
                <div className={styles.itemInfo}>
                  <span className={styles.itemLabel}>{item.label}</span>
                  <span className={styles.itemValue}>{item.value}</span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.mapWrapper}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.505705353597!2d-78.51352462413346!3d-7.1593922713180435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cd4ce73663a8a3%3A0xe54ef9ee1d3db54!2sMariscal%20Caceres%201031%2C%20Cajamarca!5e0!3m2!1ses-419!2spe!4v1700000000000!5m2!1ses-419!2spe"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="TapiMaster Ubicación"
            />
          </div>

          {/* Social Media Section */}
          <motion.div 
            className={styles.socialsSection}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className={styles.socialsHeader}>
              <h4 className={styles.socialsTitle}>Síguenos en Redes Sociales</h4>
              <p className={styles.socialsSub}>Descubre nuestros trabajos, tips de cuidado y novedades</p>
            </div>
            <div className={styles.socialLinks}>
              <motion.a
                href="https://www.facebook.com/share/1CiS5Z45YM/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={styles.socialIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </div>
                <span className={styles.socialLabel}>Facebook</span>
              </motion.a>

              <motion.a
                href="https://www.tiktok.com/@tapimaster?_r=1&_t=ZS-97A7wBujRn6"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={styles.socialIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.05a8.16 8.16 0 004.77 1.52V7.12a4.85 4.85 0 01-1-.43z" />
                  </svg>
                </div>
                <span className={styles.socialLabel}>TikTok</span>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Stepper */}
        <div className={`light-panel ${styles.formCard}`}>

          {/* Stepper header */}
          <div className={styles.stepperHeader}>
            {STEPS.map((label, i) => {
              const n = i + 1;
              const isDone = !done && step > n;
              const isActive = !done && step === n;
              return (
                <div key={n} className={styles.stepDotWrap} style={{ display: "flex", alignItems: "center", flex: n < STEPS.length ? "1" : "0 0 auto" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div className={`${styles.stepDot} ${isDone ? styles.stepDone : ""} ${isActive ? styles.stepActive : ""}`}>
                      {isDone ? <Check size={14} /> : n}
                    </div>
                    <span className={`${styles.stepLabel} ${isActive ? styles.stepLabelActive : ""}`}>{label}</span>
                  </div>
                  {n < STEPS.length && <div className={`${styles.stepConnector} ${isDone ? styles.stepConnectorDone : ""}`} />}
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>

          <AnimatePresence mode="wait">

            {/* STEP 1: MATERIAL */}
            {step === 1 && !done && (
              <motion.div key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <p className={styles.panelTitle}>¿Qué material prefieres?</p>
                <p className={styles.panelSub}>Elige el cuero que mejor se adapta a tu estilo y presupuesto.</p>
                <div className={styles.optionGrid}>
                  {MATERIALS.map(m => (
                    <div key={m.value} className={`${styles.optionCard} ${form.material === m.value ? styles.optionSelected : ""}`} onClick={() => set("material", m.value)}>
                      <div className={styles.optIcon}>{m.icon}</div>
                      <div className={styles.optName}>{m.label}</div>
                      <div className={styles.optDesc}>{m.desc}</div>
                      {m.badge && <span className={`${styles.optBadge} ${styles[`badge-${m.badgeType}`]}`}>{m.badge}</span>}
                    </div>
                  ))}
                </div>
                <div className={styles.btnRow}>
                  <button className={styles.btnNext} disabled={!form.material} onClick={() => setStep(2)}>
                    Siguiente <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: ACABADO */}
            {step === 2 && !done && (
              <motion.div key="s2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <p className={styles.panelTitle}>Elige tu línea de acabado</p>
                <p className={styles.panelSub}>Cada línea define el nivel de detalle en costuras, espumas y terminaciones.</p>
                <div className={styles.optionGrid}>
                  {SERVICES.map(s => (
                    <div key={s.value} className={`${styles.optionCard} ${s.wide ? styles.optionCardWide : ""} ${form.service === s.value ? styles.optionSelected : ""}`} onClick={() => set("service", s.value)}>
                      <div style={{ display: "flex", alignItems: "center", gap: s.wide ? 16 : 0, flexDirection: s.wide ? "row" : "column", textAlign: s.wide ? "left" : "left" }}>
                        <div className={styles.optIcon} style={{ flexShrink: 0 }}>{s.icon}</div>
                        <div>
                          <div className={styles.optName}>{s.label}</div>
                          <div className={styles.optDesc}>{s.desc}</div>
                          {s.badge && <span className={`${styles.optBadge} ${styles[`badge-${s.badgeType}`]}`}>{s.badge}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.btnRow}>
                  <button className={styles.btnBack} onClick={() => setStep(1)}><ArrowLeft size={16} /> Atrás</button>
                  <button className={styles.btnNext} disabled={!form.service} onClick={() => setStep(3)}>Siguiente <ArrowRight size={16} /></button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: DATOS */}
            {step === 3 && !done && (
              <motion.div key="s3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <p className={styles.panelTitle}>Casi listo — tus datos</p>
                <p className={styles.panelSub}>Solo para enviarte la cotización por WhatsApp en segundos.</p>
                <div className={styles.fieldsRow}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="fname">Nombre</label>
                    <input className={styles.input} id="fname" type="text" placeholder="Juan Pérez" value={form.name} onChange={e => set("name", e.target.value)} required />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="fphone">WhatsApp</label>
                    <input className={styles.input} id="fphone" type="tel" placeholder="987 654 321" value={form.phone} onChange={e => set("phone", e.target.value)} required />
                  </div>
                  <div className={`${styles.fieldGroup} ${styles.fieldFull}`}>
                    <label className={styles.label} htmlFor="fcar">Auto / Año</label>
                    <input className={styles.input} id="fcar" type="text" placeholder="Toyota Hilux 2023" value={form.car} onChange={e => set("car", e.target.value)} required />
                  </div>
                  <div className={`${styles.fieldGroup} ${styles.fieldFull}`}>
                    <label className={styles.label} htmlFor="fnotes">Notas especiales (opcional)</label>
                    <textarea className={styles.textarea} id="fnotes" placeholder="Ej. Costuras rojas con diseño en rombo..." value={form.notes} onChange={e => set("notes", e.target.value)} />
                  </div>
                </div>
                <div className={styles.btnRow}>
                  <button className={styles.btnBack} onClick={() => setStep(2)}><ArrowLeft size={16} /> Atrás</button>
                  <button className={styles.btnNext} disabled={!form.name || !form.phone || !form.car} onClick={() => setStep(4)}>Ver resumen <ArrowRight size={16} /></button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: RESUMEN */}
            {step === 4 && !done && (
              <motion.div key="s4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <p className={styles.panelTitle}>Tu cotización lista</p>
                <p className={styles.panelSub}>Revisa los detalles y envíala directo a nuestro experto en WhatsApp.</p>
                <div className={styles.summaryCard}>
                  <div className={styles.summaryHeader}>
                    <div className={styles.summaryIcon}><Car size={20} /></div>
                    <div>
                      <div className={styles.summaryName}>{form.name}</div>
                      <div className={styles.summaryModel}>{form.car}</div>
                    </div>
                  </div>
                  <div className={styles.summaryRows}>
                    {[
                      { label: "Material", value: MATERIAL_NAMES[form.material], highlight: true },
                      { label: "Línea de acabado", value: SERVICE_NAMES[form.service] },
                      { label: "Contacto", value: form.phone },
                      ...(form.notes ? [{ label: "Notas", value: form.notes }] : []),
                    ].map((row, i) => (
                      <div key={i}>
                        {i > 0 && <div className={styles.summaryDivider} />}
                        <div className={styles.summaryRow}>
                          <span className={styles.summaryLabel}>{row.label}</span>
                          <span className={`${styles.summaryVal} ${row.highlight ? styles.summaryHighlight : ""}`}>{row.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.btnRow}>
                  <button className={styles.btnBack} onClick={() => setStep(3)}><ArrowLeft size={16} /> Editar</button>
                  <button className={`${styles.btnNext} ${styles.btnWA}`} onClick={handleSend}>
                    <MessageSquare size={16} /> Enviar a WhatsApp
                  </button>
                </div>
              </motion.div>
            )}

            {/* SUCCESS */}
            {done && (
              <motion.div key="done" initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={styles.successMessage}>
                <div className={styles.successIconWrapper}><CheckCircle2 size={36} /></div>
                <h3 className={styles.successTitle}>¡Cotización enviada!</h3>
                <p className={styles.successText}>Estamos abriendo WhatsApp para conectarte con nuestro especialista en Cajamarca. Te responderemos en minutos.</p>
                <a href={buildWA()} target="_blank" rel="noopener noreferrer" className={`btn-sporty stitching-border ${styles.btnNext} ${styles.btnWA}`}>
                  <MessageSquare size={16} /> Abrir WhatsApp manualmente
                </a>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}