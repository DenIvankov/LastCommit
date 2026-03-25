import { useEffect, useState } from "react";

export function useScrollDirection() {
  const [direction, setDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const scrollY = window.scrollY;

      // Ignore tiny jitter to keep animation smooth.
      if (Math.abs(scrollY - lastScrollY) < 10) return;

      if (scrollY > lastScrollY) {
        setDirection("down");
      } else {
        setDirection("up");
      }

      lastScrollY = scrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return direction;
}
