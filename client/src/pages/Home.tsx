import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { RetroCard } from "@/components/RetroCard";
import { GlitchText } from "@/components/GlitchText";
import { BootSequence } from "@/components/BootSequence";
import { CyberGrid } from "@/components/CyberGrid";
import { StatCounter } from "@/components/StatCounter";
import { Button } from "@/components/ui/button";
import { 
  Cpu, Zap, Gauge, MousePointer2, ChevronRight, 
  Terminal, Activity, BarChart3, Layers, Wifi, 
  Settings, CheckCircle2, XCircle, Trophy, 
  Timer, AlertTriangle, ArrowRight, ShieldCheck 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import cityBg from "@assets/generated_images/pixel_art_cyberpunk_city_skyline_background.png"; 

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ m: 15, s: 0 });

  // Countdown timer logic for FOMO
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s === 0) {
          if (prev.m === 0) return prev;
          return { m: prev.m - 1, s: 59 };
        }
        return { ...prev, s: prev.s - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      <div className={`min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden transition-opacity duration-1000 ${!booted ? 'opacity-0' : 'opacity-100'}`}>
        <div className="scanlines" />
        <CyberGrid />
        
        {/* FOMO Top Banner */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary via-purple-600 to-primary text-white font-mono text-xs md:text-sm py-2 px-4 text-center font-bold tracking-widest shadow-[0_0_20px_rgba(217,70,239,0.5)]">
          <span className="animate-pulse mr-2">⚠ SYSTEM ALERT:</span> 
          FLASH SALE ENDS IN {String(timeLeft.m).padStart(2, '0')}:{String(timeLeft.s).padStart(2, '0')} 
          <span className="hidden md:inline"> — GET 50% OFF PRO GAMER PACK</span>
        </div>

        <div className="pt-8">
          <Navbar />
        </div>

        {/* Hero Section - High Impact Marketing */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background/90 to-background z-10" />
            <img 
              src={cityBg} 
              alt="Background" 
              className="w-full h-full object-cover opacity-20 pixelated grayscale contrast-125 scale-105 animate-pulse-slow"
              style={{ imageRendering: "pixelated" }}
            />
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-center flex flex-col items-center">
            
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
              className="mb-8"
            >
              <span className="bg-secondary text-black font-black italic px-6 py-2 text-xl md:text-2xl transform -skew-x-12 inline-block border-2 border-white shadow-[0_0_20px_rgba(6,182,212,0.8)]">
                #1 PERFORMANCE SUITE
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black font-display mb-6 tracking-tighter text-white leading-[0.9] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
              CHEGA DE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-destructive via-red-500 to-destructive relative">
                PERDER
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-10 font-mono max-w-3xl leading-relaxed"
            >
              Seu PC é bom. O Windows é o problema.
              <br className="hidden md:block"/>
              <span className="text-white font-bold">Nós removemos as correntes.</span> Você domina o jogo.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col md:flex-row gap-6 w-full md:w-auto items-center"
            >
              <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-black font-display text-2xl px-12 py-8 rounded-none border-2 border-white/20 transition-all shadow-[0_0_40px_rgba(217,70,239,0.6)] hover:shadow-[0_0_60px_rgba(217,70,239,0.8)] hover:scale-105 active:scale-95 w-full md:w-auto">
                <Zap className="mr-3 h-8 w-8 fill-yellow-300 text-yellow-300 animate-pulse" />
                QUERO FPS MÁXIMO
              </Button>
              <div className="text-xs font-mono text-muted-foreground mt-2 md:mt-0">
                <span className="text-green-500">●</span> 145 usuários compraram na última hora
              </div>
            </motion.div>
          </div>
        </section>

        {/* Social Proof / Trust Bar - "As seen in" style */}
        <div className="bg-white/5 border-y border-white/10 py-8 relative overflow-hidden">
           <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="text-xl font-display font-bold flex items-center gap-2"><Trophy className="text-yellow-500" /> CS2 PRO LEAGUE</div>
              <div className="text-xl font-display font-bold flex items-center gap-2"><Trophy className="text-secondary" /> VALORANT ELITE</div>
              <div className="text-xl font-display font-bold flex items-center gap-2"><Trophy className="text-primary" /> WARZONE RANKED</div>
              <div className="text-xl font-display font-bold flex items-center gap-2"><Trophy className="text-white" /> FORTNITE FNCS</div>
           </div>
        </div>

        {/* Before/After - "The Ad" Section */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">A DIFERENÇA É BRUTAL</h2>
              <p className="text-muted-foreground text-lg">Não é mágica. É engenharia de software avançada.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-white/10 rounded-xl overflow-hidden shadow-2xl">
              {/* Before */}
              <div className="bg-red-950/20 p-12 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10 relative group">
                <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors" />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-1 font-bold font-mono">ANTES (STOCK)</div>
                <div className="text-6xl font-black text-red-500 mb-2 font-display">140 FPS</div>
                <div className="text-red-400 font-mono mb-8">INSTÁVEL (DROPS)</div>
                <div className="w-full max-w-xs space-y-4 opacity-70">
                  <div className="flex justify-between text-sm font-mono text-red-300"><span>INPUT LAG</span> <span>15ms</span></div>
                  <div className="w-full bg-red-900/50 h-2 rounded-full"><div className="w-[80%] bg-red-500 h-full rounded-full" /></div>
                  <div className="flex justify-between text-sm font-mono text-red-300"><span>STUTTERS</span> <span>FREQUENTES</span></div>
                  <div className="w-full bg-red-900/50 h-2 rounded-full"><div className="w-[90%] bg-red-500 h-full rounded-full" /></div>
                </div>
                <XCircle className="w-16 h-16 text-red-500/20 absolute bottom-4 right-4" />
              </div>

              {/* After */}
              <div className="bg-green-950/20 p-12 flex flex-col items-center justify-center relative group">
                <div className="absolute inset-0 bg-green-500/5 group-hover:bg-green-500/10 transition-colors" />
                <div className="absolute top-4 right-4 bg-green-500 text-black px-4 py-1 font-bold font-mono">COM AKEMISOFT</div>
                <div className="text-7xl font-black text-green-400 mb-2 font-display text-glow">280 FPS</div>
                <div className="text-green-300 font-mono mb-8">LOCKED & STABLE</div>
                <div className="w-full max-w-xs space-y-4">
                  <div className="flex justify-between text-sm font-mono text-green-300"><span>INPUT LAG</span> <span>2ms</span></div>
                  <div className="w-full bg-green-900/50 h-2 rounded-full"><div className="w-[15%] bg-green-400 h-full rounded-full" /></div>
                  <div className="flex justify-between text-sm font-mono text-green-300"><span>STUTTERS</span> <span>ZERO</span></div>
                  <div className="w-full bg-green-900/50 h-2 rounded-full"><div className="w-[0%] bg-green-400 h-full rounded-full" /></div>
                </div>
                <CheckCircle2 className="w-16 h-16 text-green-500/20 absolute bottom-4 left-4" />
              </div>
            </div>
            
            <div className="mt-12 text-center">
               <p className="text-sm font-mono text-muted-foreground mb-4">*Benchmarks realizados em i5 10400F + RTX 3060 no Valorant/CS2</p>
            </div>
          </div>
        </section>

        {/* Comparison Table - "Us vs Them" */}
        <section className="py-20 bg-black/40 border-y border-white/10">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-12 text-center">POR QUE SOMOS LÍDERES DE MERCADO?</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="py-4 text-left pl-4 text-muted-foreground">FUNCIONALIDADE</th>
                    <th className="py-4 text-center text-muted-foreground w-1/4">TUTORIAIS YOUTUBE</th>
                    <th className="py-4 text-center text-muted-foreground w-1/4">OUTROS OTIMIZADORES</th>
                    <th className="py-4 text-center text-primary font-bold text-xl w-1/4 bg-primary/10 border-t-2 border-primary">AKEMISOFT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-4 pl-4 text-white">Kernel-Level Access</td>
                    <td className="py-4 text-center text-red-500">❌</td>
                    <td className="py-4 text-center text-yellow-500">⚠ (Risco)</td>
                    <td className="py-4 text-center text-green-400 bg-primary/5 font-bold">✅ (Seguro)</td>
                  </tr>
                  <tr>
                    <td className="py-4 pl-4 text-white">Input Lag Reduction</td>
                    <td className="py-4 text-center text-red-500">Placebo</td>
                    <td className="py-4 text-center text-white">Média</td>
                    <td className="py-4 text-center text-green-400 bg-primary/5 font-bold">Extrema (1ms)</td>
                  </tr>
                  <tr>
                    <td className="py-4 pl-4 text-white">FPS Boost Real</td>
                    <td className="py-4 text-center text-white">+5 FPS</td>
                    <td className="py-4 text-center text-white">+20 FPS</td>
                    <td className="py-4 text-center text-green-400 bg-primary/5 font-bold">+80-150 FPS</td>
                  </tr>
                   <tr>
                    <td className="py-4 pl-4 text-white">Suporte Técnico</td>
                    <td className="py-4 text-center text-red-500">Nenhum</td>
                    <td className="py-4 text-center text-white">Email (Lento)</td>
                    <td className="py-4 text-center text-green-400 bg-primary/5 font-bold">Discord/AnyDesk</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pricing - "The Offer" */}
        <section id="pricing" className="py-32 bg-background relative">
           <div className="max-w-7xl mx-auto px-6">
             <div className="mb-12 text-center">
              <span className="text-secondary font-mono text-sm tracking-widest uppercase mb-2 block animate-pulse">OFERTA POR TEMPO LIMITADO</span>
              <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">INVESTIMENTO NA SUA JOGABILIDADE</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
              {/* Basic */}
              <RetroCard className="flex flex-col h-[450px] bg-black/40 border-white/10 opacity-80 hover:opacity-100 transition-all">
                <div className="p-8 border-b border-white/5 text-center">
                  <h3 className="font-display font-bold text-2xl text-white">STARTER</h3>
                  <div className="text-3xl font-mono font-bold mt-2 text-gray-400">R$ 27,90</div>
                </div>
                <div className="p-8 flex-1">
                  <ul className="space-y-4 font-mono text-sm text-gray-400">
                    <li className="flex gap-2"><span>✓</span> Pack Básico</li>
                    <li className="flex gap-2"><span>✓</span> Config de Rede</li>
                    <li className="flex gap-2 text-red-500/50 line-through"><span>✕</span> Overclock</li>
                  </ul>
                </div>
                <div className="p-8">
                  <Button variant="ghost" className="w-full border border-white/20 hover:bg-white hover:text-black">ESCOLHER BÁSICO</Button>
                </div>
              </RetroCard>

              {/* PRO - The Focus */}
              <div className="relative transform scale-105 z-10">
                 <div className="absolute -inset-1 bg-gradient-to-b from-primary via-purple-600 to-primary rounded-lg blur opacity-75 animate-pulse" />
                 <RetroCard variant="primary" className="flex flex-col h-[550px] bg-black border-primary relative overflow-hidden">
                    <div className="bg-primary text-black font-black text-center py-2 font-mono text-sm tracking-widest">
                      MAIS VENDIDO - 85% ESCOLHEM ESTE
                    </div>
                    <div className="p-8 border-b border-primary/20 bg-primary/5 text-center">
                      <h3 className="font-display font-bold text-4xl text-primary text-glow mb-2">PRO GAMER</h3>
                      <div className="flex justify-center items-end gap-2">
                        <span className="text-lg text-gray-500 line-through mb-1">R$ 120,00</span>
                        <span className="text-6xl font-mono font-bold text-white">R$ 59<span className="text-2xl">,90</span></span>
                      </div>
                      <p className="text-green-400 text-xs font-mono mt-2 font-bold uppercase">Economize 50% HOJE</p>
                    </div>
                    
                    <div className="p-8 flex-1">
                      <ul className="space-y-4 font-mono text-sm text-white font-medium">
                        <li className="flex items-center gap-3"><div className="bg-primary/20 p-1 rounded"><CheckCircle2 className="w-4 h-4 text-primary" /></div> Otimização Completa</li>
                        <li className="flex items-center gap-3"><div className="bg-primary/20 p-1 rounded"><CheckCircle2 className="w-4 h-4 text-primary" /></div> GPU Overclock Seguro</li>
                        <li className="flex items-center gap-3"><div className="bg-primary/20 p-1 rounded"><CheckCircle2 className="w-4 h-4 text-primary" /></div> Input Lag Zero (USB)</li>
                        <li className="flex items-center gap-3"><div className="bg-primary/20 p-1 rounded"><CheckCircle2 className="w-4 h-4 text-primary" /></div> Suporte AnyDesk</li>
                        <li className="flex items-center gap-3"><div className="bg-primary/20 p-1 rounded"><CheckCircle2 className="w-4 h-4 text-primary" /></div> Garantia de 7 Dias</li>
                      </ul>
                    </div>
                    
                    <div className="p-8">
                      <Button className="w-full h-16 text-xl font-black bg-primary hover:bg-primary/90 shadow-[0_0_30px_rgba(217,70,239,0.4)] animate-shimmer bg-[linear-gradient(110deg,#d946ef,45%,#f0abfc,55%,#d946ef)] bg-[length:200%_100%] transition-colors">
                        QUERO COMPRAR AGORA
                      </Button>
                      <p className="text-center text-[10px] text-gray-500 mt-3 flex justify-center items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Pagamento 100% Seguro via PIX/Cartão
                      </p>
                    </div>
                 </RetroCard>
              </div>

              {/* Ultimate */}
              <RetroCard variant="secondary" className="flex flex-col h-[450px] bg-black/40 border-secondary/30 opacity-80 hover:opacity-100 transition-all">
                <div className="p-8 border-b border-secondary/10 text-center">
                  <h3 className="font-display font-bold text-2xl text-secondary">FULL TWEAK</h3>
                  <div className="text-3xl font-mono font-bold mt-2 text-white">R$ 149,00</div>
                </div>
                <div className="p-8 flex-1">
                  <ul className="space-y-4 font-mono text-sm text-gray-400">
                    <li className="flex gap-2"><span>✓</span> Técnico Dedicado</li>
                    <li className="flex gap-2"><span>✓</span> BIOS Modding</li>
                    <li className="flex gap-2"><span>✓</span> Windows Custom ISO</li>
                  </ul>
                </div>
                <div className="p-8">
                  <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-black">AGENDAR VIP</Button>
                </div>
              </RetroCard>
            </div>
          </div>
        </section>

        {/* FAQ - Objection Handling */}
        <section className="py-24 bg-black/60">
           <div className="max-w-3xl mx-auto px-6">
             <h2 className="text-3xl font-display font-bold text-white mb-8 text-center">PERGUNTAS FREQUENTES</h2>
             <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1" className="border border-white/10 bg-white/5 px-4">
                  <AccordionTrigger className="text-white hover:text-primary font-bold">É seguro? Vou tomar ban?</AccordionTrigger>
                  <AccordionContent className="text-gray-400">
                    100% Seguro. Não injetamos nada no jogo. Nossas otimizações são apenas no Windows, BIOS e Drivers. É impossível ser banido por configurar seu próprio computador corretamente.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border border-white/10 bg-white/5 px-4">
                  <AccordionTrigger className="text-white hover:text-primary font-bold">Funciona em PC fraco?</AccordionTrigger>
                  <AccordionContent className="text-gray-400">
                    Sim! Na verdade, PCs mais fracos são os que mais se beneficiam. Conseguimos reviver máquinas antigas removendo o peso desnecessário do Windows.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border border-white/10 bg-white/5 px-4">
                  <AccordionTrigger className="text-white hover:text-primary font-bold">Como recebo o produto?</AccordionTrigger>
                  <AccordionContent className="text-gray-400">
                    A entrega é automática e imediata via email após a confirmação do pagamento. Você receberá acesso à nossa área de membros com todo o software e tutoriais.
                  </AccordionContent>
                </AccordionItem>
             </Accordion>
           </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-border bg-black text-center relative overflow-hidden">
           <div className="max-w-7xl mx-auto px-6 flex flex-col items-center relative z-10">
             <h2 className="text-3xl font-display font-bold text-white mb-6">AKEMISOFT</h2>
             <Button size="lg" className="mb-8 bg-green-600 hover:bg-green-700 text-white font-bold px-8 rounded-full shadow-[0_0_20px_rgba(22,163,74,0.4)] animate-bounce">
                FALAR NO WHATSAPP
             </Button>
             <p className="font-mono text-xs text-muted-foreground/30">
               © 2025 AKEMISOFT PERFORMANCE ENGINEERING.
             </p>
          </div>
        </footer>
        
        {/* Sticky Mobile CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/90 backdrop-blur border-t border-primary/20 md:hidden z-50 flex gap-4 items-center">
           <div className="flex-1">
             <div className="text-white font-bold text-sm">OFERTA RELÂMPAGO</div>
             <div className="text-primary font-mono text-xs">Termina em {String(timeLeft.m).padStart(2, '0')}:{String(timeLeft.s).padStart(2, '0')}</div>
           </div>
           <Button className="bg-primary text-black font-bold">COMPRAR AGORA</Button>
        </div>
      </div>
    </>
  );
}