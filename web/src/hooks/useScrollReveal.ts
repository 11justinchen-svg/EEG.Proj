import { useEffect, useRef, useState } from "react";

type Options = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

export function useScrollReveal<T extends HTMLElement>(
  options: Options = {},
): [React.RefObject<T>, boolean] {
  const {
    threshold = 0.12,
    rootMargin = "0px 0px -10% 0px",
    once = true,
  } = options;
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold, rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, visible];
}
