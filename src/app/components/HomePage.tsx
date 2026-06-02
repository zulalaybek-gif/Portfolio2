import { HeroSection } from "./HeroSection";
import { PersonalIntroSection } from "./PersonalIntroSection";
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
        <PersonalIntroSection />
        <ServicesSection />
        <ProcessSection />
        <ToolsSection />
        <CTASection />
      </div>
    </div>
  );
}
