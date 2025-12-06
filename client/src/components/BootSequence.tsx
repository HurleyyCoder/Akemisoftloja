import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const bootLogs = [
    "INITIALIZING KERNEL...",
    "LOADING GRAPHICS DRIVERS...",
    "BYPASSING SECURITY PROTOCOLS...",
    "OPTIMIZING MEMORY ALLOCATION...",
    "CONNECTING TO SECURE SERVER...",
    "ESTABLISHING ENCRYPTED TUNNEL...",
    "LOADING ASSETS...",
    "SYSTEM READY."
  ];

  useEffect(() => {
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[logIndex]]);
        logIndex++;
      }
    }, 400);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(logInterval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center font-mono text-primary"
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-md p-6 border-2 border-primary/30 bg-black/50 relative overflow-hidden">
        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
        
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 animate-pulse">AKEMISOFT</h1>
          <div className="h-1 w-full bg-primary/20 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs mt-1 text-primary/70">
            <span>BOOT_SEQ_V2.0</span>
            <span>{progress}%</span>
          </div>
        </div>

        <div className="space-y-1 h-48 overflow-y-auto font-mono text-xs text-green-500/80">
          {logs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <span className="text-primary">{">"}</span> {log}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}