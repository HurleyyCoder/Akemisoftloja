import { Link } from "wouter";
import { GlitchText } from "./GlitchText";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Monitor, Sun, Moon } from "lucide-react";

export function Navbar() {
  const [mono, setMono] = useState(false);

  useEffect(() => {
    if (mono) {
      document.documentElement.classList.add("grayscale");
      document.documentElement.classList.add("contrast-125");
    } else {
      document.documentElement.classList.remove("grayscale");
      document.documentElement.classList.remove("contrast-125");
    }
  }, [mono]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold font-display tracking-wider text-primary hover:text-primary/80 transition-colors group flex items-center gap-2">
          <div className="w-3 h-3 bg-primary group-hover:animate-pulse shadow-[0_0_10px_currentColor]" />
          <GlitchText text="AKEMISOFT" />
        </Link>

        <div className="hidden md:flex items-center gap-8 font-mono text-sm">
          <a href="#features" className="text-muted-foreground hover:text-secondary transition-colors hover:underline decoration-2 underline-offset-4 decoration-secondary">RECURSOS</a>
          <a href="#pricing" className="text-muted-foreground hover:text-secondary transition-colors hover:underline decoration-2 underline-offset-4 decoration-secondary">PREÇOS</a>
          <a href="#contact" className="text-muted-foreground hover:text-secondary transition-colors hover:underline decoration-2 underline-offset-4 decoration-secondary">CONTATO</a>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setMono(!mono)}
            className="text-muted-foreground hover:text-white hover:bg-white/10 rounded-none"
            title="Toggle Monochrome Mode"
          >
            <Monitor className="w-5 h-5" />
          </Button>

          <Button variant="outline" className="font-mono border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none border-2 shadow-[0_0_10px_rgba(217,70,239,0.2)] hover:shadow-[0_0_20px_rgba(217,70,239,0.6)] transition-all">
            LOGIN_SYSTEM
          </Button>
        </div>
      </div>
    </nav>
  );
}