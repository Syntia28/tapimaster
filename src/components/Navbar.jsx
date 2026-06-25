"use client";

import { useState, useEffect } from "react";
import { Phone, MessageSquare, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Simple active link detection based on section position
      const sections = ["inicio", "materiales", "calidad", "servicios", "contacto"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const navLinks = [
    { label: "Inicio", target: "inicio" },
    { label: "Materiales", target: "materiales" },
    { label: "Calidad", target: "calidad" },
    { label: "Servicios", target: "servicios" },
    { label: "Contacto", target: "contacto" },
  ];

  return (
    <>
      <nav className={`${styles.navbar} ${isScrolled ? styles.navbarScrolled : ""}`}>
        {/* Logo */}
        <div className={styles.logo} onClick={(e) => handleLinkClick(e, "inicio")}>
          <div className={styles.logoIcon}>
            {/* SVG Seat Representation */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M8 3C8 2.44772 8.44772 2 9 2H15C15.5523 2 16 2.44772 16 3V9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9V3Z" 
                stroke="#e11d48" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
              <path 
                d="M6 13C6 11.8954 6.89543 11 8 11H16C17.1046 11 18 11.8954 18 13V18C18 20.2091 16.2091 22 14 22H10C7.79086 22 6 20.2091 6 18V13Z" 
                stroke="#e2e8f0" 
                strokeWidth="2"
              />
              <path d="M12 13V22" stroke="#e11d48" strokeWidth="1" strokeDasharray="2 2" />
            </svg>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>TAPI<span>MASTER</span></span>
            <span className={styles.logoSubtitle}>Diseño y Confort</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className={styles.navMenu}>
          {navLinks.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              className={`${styles.navLink} ${activeSection === link.target ? styles.navLinkActive : ""}`}
              onClick={(e) => handleLinkClick(e, link.target)}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Actions Button */}
        <div className={styles.navActions}>
          <a 
            href="https://wa.me/51976543210?text=Hola%20TapiMaster,%20quiero%20cotizar%20el%20tapizado%20de%20mi%20veh%C3%ADculo." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-sporty stitching-border"
          >
            <MessageSquare size={16} />
            <span>Cotizar WhatsApp</span>
          </a>
        </div>

        {/* Hamburger Toggle */}
        <button 
          className={`${styles.menuToggle} ${isMenuOpen ? styles.menuToggleActive : ""}`}
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className={`${styles.navMenu} ${styles.navMenuActive}`}
          >
            {navLinks.map((link) => (
              <a
                key={link.target}
                href={`#${link.target}`}
                className={`${styles.navLink} ${activeSection === link.target ? styles.navLinkActive : ""}`}
                onClick={(e) => handleLinkClick(e, link.target)}
              >
                {link.label}
              </a>
            ))}
            <div className={styles.navActionsMobile}>
              <a 
                href="https://wa.me/51976543210?text=Hola%20TapiMaster,%20quiero%20cotizar%20el%20tapizado%20de%20mi%20veh%C3%ADculo." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-sporty stitching-border"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageSquare size={18} />
                <span>Cotizar WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
