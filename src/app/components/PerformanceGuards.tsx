import { useEffect } from "react";

function optimizeMediaNode(node: Element) {
  if (node instanceof HTMLImageElement) {
    if (!node.loading) node.loading = "lazy";
    if (!node.decoding) node.decoding = "async";
    if (!node.referrerPolicy) node.referrerPolicy = "strict-origin-when-cross-origin";
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

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof Element)) continue;
          optimizeMediaNode(node);
          optimizeAll(node);
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
