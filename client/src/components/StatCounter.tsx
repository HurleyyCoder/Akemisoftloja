import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface StatCounterProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export function StatCounter({ value, label, prefix = "", suffix = "" }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <div ref={ref} className="text-center p-6 border border-primary/20 bg-black/40 backdrop-blur-sm group hover:border-primary/60 transition-colors">
      <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors text-glow">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}