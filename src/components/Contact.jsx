"use client";

import { useState } from "react";
import { MapPin, Phone, Clock, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./Contact.module.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    carModel: "",
    material: "cuero-americano",
    service: "regular",
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare WhatsApp Message
    const materialNames = {
      pranna: "Pranna",
      "tacto-cuero": "Tacto Cuero",
      "cuero-americano": "Cuero Americano",
      "cuero-natural": "Cuero Natural Genuino",
    };

    const serviceNames = {
      economica: "Línea Económica",
      regular: "Línea Regular",
      premium: "Línea Premium (Alta Gama)",
    };

    const whatsappMessage = `Hola TapiMaster!%20Mi%20nombre%20es%20${encodeURIComponent(formData.name)}.%20Quiero%20cotizar%20un%20tapizado%20para%20mi%20veh%C3%ADculo%20${encodeURIComponent(formData.carModel)}.%0A%0A*Detalles%20de%20Cotizaci%C3%B3n:*%0A- *Material:*%20${encodeURIComponent(materialNames[formData.material])}%0A- *Servicio:*%20${encodeURIComponent(serviceNames[formData.service])}%0A- *Mi%20Tel%C3%A9fono:*%20${encodeURIComponent(formData.phone)}${formData.notes ? `%0A- *Notas:*%20${encodeURIComponent(formData.notes)}` : ""}`;

    const whatsappUrl = `https://wa.me/51976543210?text=${whatsappMessage}`;

    setIsSubmitted(true);

    // After a delay, redirect to WhatsApp
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 1500);
  };

  return (
    <section id="contacto" className={styles.section}>
      <div className={styles.grid}>
        {/* Left Column: Info & Map */}
        <div className={styles.infoColumn}>
          <div className={styles.header}>
            <span className={styles.subtitle}>Encuéntranos</span>
            <h2 className={styles.title}>Visita Nuestro Taller</h2>
          </div>

          <p className={styles.introText}>
            Estamos ubicados en una zona accesible de Cajamarca. Ven con tu vehículo para una cotización presencial y una muestra directa de nuestros cueros y costuras.
          </p>

          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <div className={styles.iconWrapper}>
                <MapPin size={22} />
              </div>
              <div className={styles.itemInfo}>
                <span className={styles.itemLabel}>Dirección</span>
                <span className={styles.itemValue}>Jr. Mariscal Cáceres 1031, Cajamarca</span>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.iconWrapper}>
                <Phone size={22} />
              </div>
              <div className={styles.itemInfo}>
                <span className={styles.itemLabel}>Teléfono / WhatsApp</span>
                <span className={styles.itemValue}>+51 976 543 210</span>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.iconWrapper}>
                <Clock size={22} />
              </div>
              <div className={styles.itemInfo}>
                <span className={styles.itemLabel}>Horario de Atención</span>
                <span className={styles.itemValue}>Lun - Sáb: 8:00 AM - 6:30 PM</span>
              </div>
            </div>
          </div>

          {/* Interactive Google Map Embed centered on Mariscal Cáceres, Cajamarca */}
          <div className={styles.mapWrapper}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.505705353597!2d-78.51352462413346!3d-7.1593922713180435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cd4ce73663a8a3%3A0xe54ef9ee1d3db54!2sMariscal%20Caceres%201031%2C%20Cajamarca!5e0!3m2!1ses-419!2spe!4v1700000000000!5m2!1ses-419!2spe"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TapiMaster Ubicación Google Maps"
            />
          </div>
        </div>

        {/* Right Column: Quote Form */}
        <div className={`light-panel ${styles.formCard}`}>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <h3 className={styles.formTitle}>Cotizador Deportivo</h3>
              <p className={styles.formSubtitle}>Configura el tapizado de tu vehículo y chatea con un experto en segundos.</p>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="name">Nombre Completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Ej. Juan Pérez"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="phone">Número de Contacto</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="Ej. 987654321"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="carModel">Modelo de Auto / Año</label>
                  <input
                    type="text"
                    id="carModel"
                    name="carModel"
                    required
                    placeholder="Ej. Toyota Hilux 2023"
                    value={formData.carModel}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="material">Tipo de Material</label>
                  <select
                    id="material"
                    name="material"
                    value={formData.material}
                    onChange={handleInputChange}
                    className={styles.select}
                  >
                    <option value="pranna">Pranna (Sintético Diario)</option>
                    <option value="tacto-cuero">Tacto Cuero (Flexible)</option>
                    <option value="cuero-americano">Cuero Americano (Gama Media-Alta)</option>
                    <option value="cuero-natural">Cuero Genuino Natural</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="service">Línea de Acabado</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className={styles.select}
                  >
                    <option value="economica">Línea Económica</option>
                    <option value="regular">Línea Regular</option>
                    <option value="premium">Línea Premium</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="notes">Notas o Requerimiento Especial (Opcional)</label>
                <textarea
                  id="notes"
                  name="notes"
                  placeholder="Ej. Deseo costuras rojas con diseño deportivo en rombo..."
                  value={formData.notes}
                  onChange={handleInputChange}
                  className={styles.textarea}
                />
              </div>

              <button type="submit" className={`btn-sporty stitching-border ${styles.submitBtn}`} style={{ width: "100%", marginTop: "10px" }}>
                <Send size={16} />
                <span>Enviar Cotización a WhatsApp</span>
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={styles.successMessage}
            >
              <div className={styles.successIconWrapper}>
                <CheckCircle2 size={36} />
              </div>
              <h3 className={styles.successTitle}>¡Configuración Guardada!</h3>
              <p className={styles.successText}>
                Estamos abriendo WhatsApp para conectar directamente con nuestro especialista en Cajamarca...
              </p>
              <a
                href={`https://wa.me/51976543210?text=Hola`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sporty stitching-border"
              >
                <MessageSquare size={16} />
                <span>Abrir WhatsApp Manualmente</span>
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
