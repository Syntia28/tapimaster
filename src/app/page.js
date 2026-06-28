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
import ContentWrapper from "@/components/ContentWrapper";

export const metadata = {
  title: "Tapicería Automotriz Premium en Cajamarca",
  description: "Descubre TapiMaster: tapizado de asientos de autos, cuero premium, diseños personalizados y acabados de lujo para tu vehículo en Cajamarca.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Hero is position:fixed – acts as the static background curtain */}
      <Hero />

      {/* ContentWrapper slides over the Hero as the user scrolls */}
      <ContentWrapper>
        <main>
          <MaterialBrowser />
          <SeatSimulator />
          <LeatherPath />
          <QualityShowcase />
          <Services />
          <WorkGallery />
          <Contact />
        </main>
        <Footer />
      </ContentWrapper>
    </>
  );
}
