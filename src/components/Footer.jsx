"use client";

import styles from "./Footer.module.css";

export default function Footer() {
  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M8 3C8 2.44772 8.44772 2 9 2H15C15.5523 2 16 2.44772 16 3V9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9V3Z" 
                  stroke="#e11d48" 
                  strokeWidth="2" 
                />
                <path 
                  d="M6 13C6 11.8954 6.89543 11 8 11H16C17.1046 11 18 11.8954 18 13V18C18 20.2091 16.2091 22 14 22H10C7.79086 22 6 20.2091 6 18V13Z" 
                  stroke="#e2e8f0" 
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>TAPI<span>MASTER</span></span>
              <span className={styles.logoSubtitle}>Diseño y Confort</span>
            </div>
          </div>
          <p className={styles.desc}>
            Líderes en tapicería automotriz premium en Cajamarca. Costuras a mano de precisión y materiales seleccionados de alta calidad.
          </p>
        </div>

        {/* Navigation links */}
        <div>
          <h4 className={styles.title}>Navegación</h4>
          <div className={styles.links}>
            <a href="#inicio" onClick={(e) => handleLinkClick(e, "inicio")} className={styles.link}>Inicio</a>
            <a href="#materiales" onClick={(e) => handleLinkClick(e, "materiales")} className={styles.link}>Materiales</a>
            <a href="#calidad" onClick={(e) => handleLinkClick(e, "calidad")} className={styles.link}>Calidad & Garantía</a>
            <a href="#servicios" onClick={(e) => handleLinkClick(e, "servicios")} className={styles.link}>Líneas de Servicio</a>
            <a href="#galeria" onClick={(e) => handleLinkClick(e, "galeria")} className={styles.link}>Galería Real</a>
            <a href="#contacto" onClick={(e) => handleLinkClick(e, "contacto")} className={styles.link}>Contacto</a>
          </div>
        </div>

        {/* Materials */}
        <div>
          <h4 className={styles.title}>Materiales</h4>
          <div className={styles.links}>
            <a href="#materiales" onClick={(e) => handleLinkClick(e, "materiales")} className={styles.link}>Cuero Natural Genuino</a>
            <a href="#materiales" onClick={(e) => handleLinkClick(e, "materiales")} className={styles.link}>Cuero Americano Calibre 1.2</a>
            <a href="#materiales" onClick={(e) => handleLinkClick(e, "materiales")} className={styles.link}>Tacto Cuero Premium</a>
            <a href="#materiales" onClick={(e) => handleLinkClick(e, "materiales")} className={styles.link}>Pranna Sintético Automotriz</a>
          </div>
        </div>

        {/* Taller Info */}
        <div>
          <h4 className={styles.title}>Contacto</h4>
          <div className={styles.contactText}>
            <p style={{ marginBottom: "10px" }}>
              <strong>Taller Cajamarca:</strong><br />
              Jr. Mariscal Cáceres 1031,<br />
              Cajamarca, Perú.
            </p>
            <p>
              <strong>Teléfono:</strong><br />
              +51 976 543 210
            </p>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span className={styles.copy}>
          &copy; {new Date().getFullYear()} TapiMaster. Todos los derechos reservados.
        </span>
        <span className={styles.developer}>
          Diseñado con Confort por <a href="https://wa.me/51976543210" target="_blank" rel="noopener noreferrer">Antigravity</a>
        </span>
      </div>
    </footer>
  );
}
