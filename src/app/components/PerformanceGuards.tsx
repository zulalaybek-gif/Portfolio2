import { useEffect } from "react";

function optimizeMediaNode(node: Element) {
  if (node instanceof HTMLImageElement) {
    const rect = node.getBoundingClientRect();
    const isInitialViewportImage = rect.top < window.innerHeight * 1.25;

    if (!node.loading) node.loading = isInitialViewportImage ? "eager" : "lazy";
    if (!node.decoding) node.decoding = "async";
    if (!node.referrerPolicy) node.referrerPolicy = "strict-origin-when-cross-origin";
    if (isInitialViewportImage && !node.fetchPriority) node.fetchPriority = "high";
  }

  if (node instanceof HTMLIFrameElement) {
    if (!node.loading) node.loading = "lazy";
    if (!node.referrerPolicy) node.referrerPolicy = "strict-origin-when-cross-origin";
    if (!node.title) node.title = "Contenu intégré";
  }
}

export function PerformanceGuards() {
  useEffect(() => {
    const optimizeAll = (root: ParentNode) => {
      root.querySelectorAll("img, iframe").forEach(optimizeMediaNode);
    };

    optimizeAll(document);

    const pendingRoots = new Set<Element>();
    let raf = 0;

    const flushPending = () => {
      raf = 0;
      for (const node of pendingRoots) {
        optimizeMediaNode(node);
        optimizeAll(node);
      }
      pendingRoots.clear();
    };

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof Element)) continue;
          pendingRoots.add(node);
        }
      }

      if (!raf && pendingRoots.size > 0) {
        raf = window.requestAnimationFrame(flushPending);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return null;
}
