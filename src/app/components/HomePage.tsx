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
}: {
  Component: ComponentType;
  sectionId?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || shouldRender) return;
    if (!("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div ref={ref} data-section={sectionId}>
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
      <DeferredSection Component={ServicesSection} sectionId="services" />
      <DeferredSection Component={ProcessSection} />
      <DeferredSection Component={ToolsSection} />
      <DeferredSection Component={CTASection} sectionId="about" />
    </>
  );
}
