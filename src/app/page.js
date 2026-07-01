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
  title: "Las Mejores Tapicerías en Cajamarca | TapiMaster Premium",
  description: "Encuentra la mejor tapicería de autos en Cajamarca. Especialistas en tapizado de asientos de autos en cuero natural, tacto cuero, fundas a medida y acabados de lujo.",
  keywords: [
    "mejores tapicerias en cajamarca",
    "tapiceria automotriz cajamarca",
    "tapizado de asientos de autos cajamarca",
    "fundas para asientos de autos cajamarca",
    "asientos de cuero para autos cajamarca",
    "tapizado de timones cajamarca",
    "tapizado de techos cajamarca",
    "taller de tapiceria cajamarca"
  ],
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
