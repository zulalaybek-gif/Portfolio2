import { HeroSection } from "./HeroSection";
import { ServicesSection } from "./ServicesSection";
import { ProcessSection } from "./ProcessSection";
import { ToolsSection } from "./ToolsSection";
import { CTASection } from "./CTASection";
import { AmbientMovingLines } from "./AmbientMovingLines";

export function HomePage() {
  return (
    <div className="home-flow relative overflow-x-clip">
      <AmbientMovingLines className="absolute inset-x-0 top-0 z-0" height="120vh" opacity={0.2} />
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
