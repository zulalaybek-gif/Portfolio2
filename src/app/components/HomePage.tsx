import { HeroSection } from "./HeroSection";
import { ServicesSection } from "./ServicesSection";
import { ProcessSection } from "./ProcessSection";
import { ToolsSection } from "./ToolsSection";
import { CTASection } from "./CTASection";
import { AmbientMovingLines } from "./AmbientMovingLines";

export function HomePage() {
  return (
    <div className="home-flow relative overflow-hidden">
      <AmbientMovingLines className="absolute inset-x-[-12%] top-0 h-[120vh] z-0" opacity={0.24} />
      <div className="relative z-10">
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <ToolsSection />
        <CTASection />
      </div>
    </div>
  );
}
