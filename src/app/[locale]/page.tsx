import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import BentoGrid from "@/components/BentoGrid";
import ContactSection from "@/components/ContactSection";

export default function Home() {
    return (
        <>
            <HeroSection />
            <div className="section-sep" />
            <AboutSection />
            <BentoGrid />
            <ContactSection />
        </>
    );
}
