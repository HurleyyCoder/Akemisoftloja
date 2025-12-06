import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const bootLogs = [
    "ANALYZING HARDWARE CONFIGURATION...",
    "DETECTING CPU THREADS...",
    "BENCHMARKING GPU CLOCK SPEEDS...",
    "SCANNING FOR INPUT DELAY...",
    "OPTIMIZING WINDOWS KERNEL...",
    "DISABLING BACKGROUND TELEMETRY...",
    "ALLOCATING HIGH PRIORITY RESOURCES...",
    "SYSTEM OPTIMIZATION COMPLETE."
  ];

  useEffect(() => {
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[logIndex]]);
        logIndex++;
      }
    }, 350);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(logInterval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 2.5;
      });
    }, 40);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center font-mono text-primary"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-lg p-8 border border-primary/20 bg-black/80 relative overflow-hidden backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
        
        <div className="mb-8 text-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl font-bold font-display mb-2 text-white tracking-widest"
          >
            AKEMISOFT
          </motion.div>
          <div className="text-xs font-mono text-muted-foreground tracking-[0.5em] mb-6">PERFORMANCE SUITE</div>
          
          <div className="h-1 w-full bg-white/10 overflow-hidden relative">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary to-secondary"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs mt-2 text-primary/70 font-mono">
            <span>DIAGNOSTIC_TOOL_V4.2</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        <div className="space-y-1 h-32 overflow-y-auto font-mono text-xs text-secondary/90 border-t border-white/10 pt-4">
          {logs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <span className="text-primary">✓</span> {log}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}