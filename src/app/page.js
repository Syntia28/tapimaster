import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MaterialBrowser from "@/components/MaterialBrowser";
import SeatSimulator from "@/components/SeatSimulator";
import LeatherPath from "@/components/LeatherPath";
import QualityShowcase from "@/components/QualityShowcase";
import Services from "@/components/Services";
import WorkGallery from "@/components/WorkGallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MaterialBrowser />
        <SeatSimulator />
        <LeatherPath />
        <QualityShowcase />
        <Services />
        <WorkGallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
