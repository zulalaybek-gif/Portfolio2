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
}: {
  Component: ComponentType;
  sectionId?: string;
  minHeight?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || shouldRender) return;

    const fallbackTimer = window.setTimeout(() => {
      setShouldRender(true);
    }, 1600);

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
      { rootMargin: "900px 0px" }
    );

    observer.observe(node);
    return () => {
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [shouldRender]);

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
      <DeferredSection Component={ServicesSection} sectionId="services" minHeight={640} />
      <DeferredSection Component={ProcessSection} minHeight={560} />
      <DeferredSection Component={ToolsSection} minHeight={320} />
      <DeferredSection Component={CTASection} sectionId="about" minHeight={420} />
    </>
  );
}
