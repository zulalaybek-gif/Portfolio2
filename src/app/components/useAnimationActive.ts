import { useEffect, useState, type RefObject } from "react";

export function useAnimationActive<T extends Element>(
  ref: RefObject<T | null>,
  rootMargin = "240px 0px"
) {
  const [isDocumentVisible, setIsDocumentVisible] = useState(() =>
    typeof document === "undefined" ? true : !document.hidden
  );
  const [isInView, setIsInView] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (typeof document === "undefined") return;
    const onVisibilityChange = () => setIsDocumentVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (typeof window === "undefined" || !node || !("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isDocumentVisible && isInView && !reduceMotion;
}
