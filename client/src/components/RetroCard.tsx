import React from "react";
import { cn } from "@/lib/utils";

interface RetroCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary";
  glow?: boolean;
}

export function RetroCard({ 
  children, 
  className, 
  variant = "default", 
  glow = false,
  ...props 
}: RetroCardProps) {
  const borderColor = 
    variant === "primary" ? "border-primary" : 
    variant === "secondary" ? "border-secondary" : 
    "border-border";

  const glowClass = glow 
    ? variant === "primary" ? "shadow-[0_0_15px_rgba(217,70,239,0.3)]" 
    : variant === "secondary" ? "shadow-[0_0_15px_rgba(6,182,212,0.3)]"
    : "shadow-[0_0_15px_rgba(255,255,255,0.1)]"
    : "";

  return (
    <div 
      className={cn(
        "relative bg-card/80 backdrop-blur-sm border-2 p-6",
        borderColor,
        glowClass,
        // Pixelated corners using pseudo elements or clip-path could be cool, 
        // but simple sharp borders work well for this style too.
        // Let's add a 'corner' effect using a pseudo element if we wanted, 
        // but for now just the border.
        className
      )}
      {...props}
    >
      {/* Corner Accents */}
      <div className={cn("absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2", borderColor)} />
      <div className={cn("absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2", borderColor)} />
      <div className={cn("absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2", borderColor)} />
      <div className={cn("absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2", borderColor)} />
      
      {children}
    </div>
  );
}