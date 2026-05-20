import { HeroSection } from "./HeroSection";
import { ServicesSection } from "./ServicesSection";
import { ProcessSection } from "./ProcessSection";
import { ToolsSection } from "./ToolsSection";
import { CTASection } from "./CTASection";

export function HomePage() {
  return (
    <div className="home-flow">
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <ToolsSection />
      <CTASection />
    </div>
  );
}
