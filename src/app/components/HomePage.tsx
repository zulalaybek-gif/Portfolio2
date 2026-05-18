import { lazy, Suspense, useEffect, useRef, useState, type ComponentType } from "react";
import { HeroSection } from "./HeroSection";

const ServicesSection = lazy(() =>
  import("./ServicesSection").then((module) => ({ default: module.ServicesSection }))
);
const ProcessSection = lazy(() =>
  import("./ProcessSection").then((module) => ({ default: module.ProcessSection }))
);
const ToolsSection = lazy(() =>
  import("./ToolsSection").then((module) => ({ default: module.ToolsSection }))
);
const CTASection = lazy(() =>
  import("./CTASection").then((module) => ({ default: module.CTASection }))
);

function DeferredSection({
  Component,
  sectionId,
  minHeight = 0,
  renderDelay = 280,
}: {
  Component: ComponentType;
  sectionId?: string;
  minHeight?: number;
  renderDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || shouldRender) return;

    const fallbackTimer = window.setTimeout(() => {
      setShouldRender(true);
    }, renderDelay);

    const renderSection = () => {
      window.clearTimeout(fallbackTimer);
      setShouldRender(true);
    };

    if (!("IntersectionObserver" in window)) {
      renderSection();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          renderSection();
          observer.disconnect();
        }
      },
      { rootMargin: "1400px 0px" }
    );

    observer.observe(node);
    return () => {
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [renderDelay, shouldRender]);

  return (
    <div
      ref={ref}
      data-section-alias={sectionId}
      data-deferred-rendered={shouldRender ? "true" : "false"}
      style={minHeight ? { minHeight } : undefined}
    >
      {shouldRender ? (
        <Suspense fallback={null}>
          <Component />
        </Suspense>
      ) : null}
    </div>
  );
}

export function HomePage() {
  return (
    <>
      <HeroSection />
      <DeferredSection Component={ServicesSection} sectionId="services" minHeight={640} renderDelay={120} />
      <DeferredSection Component={ProcessSection} minHeight={560} renderDelay={220} />
      <DeferredSection Component={ToolsSection} minHeight={320} renderDelay={320} />
      <DeferredSection Component={CTASection} sectionId="about" minHeight={420} renderDelay={420} />
    </>
  );
}
