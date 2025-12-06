import { Navbar } from "@/components/Navbar";
import { RetroCard } from "@/components/RetroCard";
import { GlitchText } from "@/components/GlitchText";
import { Button } from "@/components/ui/button";
import { Cpu, Zap, Shield, Crosshair, ChevronRight, Terminal, Activity } from "lucide-react";
import { motion } from "framer-motion";

import cityBg from "@assets/generated_images/pixel_art_cyberpunk_city_skyline_background.png";
import botAvatar from "@assets/generated_images/pixel_art_robot_avatar.png";
import hackerAvatar from "@assets/generated_images/pixel_art_hacker_avatar.png";
import gamerAvatar from "@assets/generated_images/pixel_art_gamer_avatar.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      {/* Scanlines Overlay */}
      <div className="scanlines" />
      
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={cityBg} 
            alt="Cyberpunk City" 
            className="w-full h-full object-cover opacity-20 pixelated"
            style={{ imageRendering: "pixelated" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-4 px-4 py-1 border border-secondary/50 bg-secondary/10 text-secondary font-mono text-sm tracking-widest uppercase"
          >
            System Ready // v.2.0.4
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black font-display mb-6 tracking-tighter text-white"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary animate-pulse">
              AKEMISOFT
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-10 font-mono max-w-2xl mx-auto"
          >
            QUEST: MAXIMIZE SEU FPS. ATIVE POWER MAXIMO!
            <span className="block text-sm mt-2 text-primary/80 opacity-70">OPTIMIZING KERNEL... 100%</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-6 rounded-none border-2 border-transparent hover:border-white transition-all shadow-[0_0_20px_rgba(217,70,239,0.5)] group">
              <Zap className="mr-2 h-5 w-5 group-hover:animate-spin" />
              BAIXAR EXPANSÃO
            </Button>
            <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 font-bold text-lg px-8 py-6 rounded-none border-2">
              <Terminal className="mr-2 h-5 w-5" />
              VER DOCUMENTAÇÃO
            </Button>
          </motion.div>
          
          {/* Floating UI Elements */}
          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -left-20 w-48 opacity-50">
             <div className="border border-primary/30 p-2 font-mono text-xs text-primary/60">
                CPU: 12% <br/>
                GPU: 98% <br/>
                RAM: 4.2GB <br/>
                PING: 12ms
             </div>
          </div>
          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-20 w-48 opacity-50 text-right">
             <div className="border border-secondary/30 p-2 font-mono text-xs text-secondary/60">
                SYSTEM: STABLE <br/>
                NETWORK: SECURE <br/>
                FPS: 240+ <br/>
                V-SYNC: OFF
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 flex items-end gap-4 border-b border-border pb-4">
            <h2 className="text-4xl font-display font-bold text-white">SOBRE O PRODUTO</h2>
            <span className="text-muted-foreground font-mono pb-2">// SYSTEM_FEATURES_LOADED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <RetroCard variant="secondary" glow className="h-full">
              <div className="w-12 h-12 bg-secondary/20 flex items-center justify-center mb-6 border border-secondary">
                <Crosshair className="text-secondary w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-white">AIM ASSIST V2</h3>
              <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                Algoritmo de precisão pixel-perfect. Detecta inimigos instantaneamente sem injeção de memória. Seguro e indetectável.
              </p>
              <div className="mt-6 h-1 w-full bg-secondary/20">
                <div className="h-full w-[75%] bg-secondary animate-pulse" />
              </div>
            </RetroCard>

            <RetroCard variant="primary" glow className="h-full">
              <div className="w-12 h-12 bg-primary/20 flex items-center justify-center mb-6 border border-primary">
                <Activity className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-white">BOOST FPS</h3>
              <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                Otimização de kernel em tempo real. Remove processos desnecessários e aloca prioridade máxima para o jogo.
              </p>
              <div className="mt-6 h-1 w-full bg-primary/20">
                <div className="h-full w-[92%] bg-primary animate-pulse" />
              </div>
            </RetroCard>

            <RetroCard className="h-full">
              <div className="w-12 h-12 bg-muted flex items-center justify-center mb-6 border border-white/20">
                <Shield className="text-white w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-white">ANTI-CHEAT BYPASS</h3>
              <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                Proteção de hardware ID spoofing incluída. Jogue sem medo de banimentos com nossa tecnologia stealth.
              </p>
              <div className="mt-6 h-1 w-full bg-white/10">
                <div className="h-full w-[100%] bg-white/50" />
              </div>
            </RetroCard>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-black/40 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-4xl font-display font-bold text-white">DEPOIMENTOS</h2>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-primary animate-ping" />
              <div className="w-2 h-2 bg-secondary animate-ping delay-75" />
              <div className="w-2 h-2 bg-white animate-ping delay-150" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <RetroCard className="flex flex-col gap-4">
                <div className="flex items-center gap-4 border-b border-border pb-4">
                  <img src={hackerAvatar} alt="User" className="w-12 h-12 border border-primary p-0.5" />
                  <div>
                    <h4 className="font-display font-bold text-lg text-primary">NEO_HACKER</h4>
                    <p className="text-xs font-mono text-muted-foreground">PRO PLAYER - CS2</p>
                  </div>
                </div>
                <p className="font-mono text-sm text-gray-300">"Incrível. Subi de patente em 2 dias. O suporte é sensacional e o software é muito leve."</p>
                <div className="flex text-primary text-xs font-mono mt-auto">
                  RATING: ★★★★★
                </div>
             </RetroCard>

             <RetroCard className="flex flex-col gap-4">
                <div className="flex items-center gap-4 border-b border-border pb-4">
                  <img src={botAvatar} alt="User" className="w-12 h-12 border border-secondary p-0.5" />
                  <div>
                    <h4 className="font-display font-bold text-lg text-secondary">CYBER_BOT_99</h4>
                    <p className="text-xs font-mono text-muted-foreground">STREAMER</p>
                  </div>
                </div>
                <p className="font-mono text-sm text-gray-300">"Meus viewers nem percebem. A interface é linda e super fácil de configurar. Recomendo dms!"</p>
                <div className="flex text-secondary text-xs font-mono mt-auto">
                  RATING: ★★★★★
                </div>
             </RetroCard>

             <RetroCard className="flex flex-col gap-4">
                <div className="flex items-center gap-4 border-b border-border pb-4">
                  <img src={gamerAvatar} alt="User" className="w-12 h-12 border border-white p-0.5" />
                  <div>
                    <h4 className="font-display font-bold text-lg text-white">X_SLAYER_X</h4>
                    <p className="text-xs font-mono text-muted-foreground">COMPETITIVE</p>
                  </div>
                </div>
                <p className="font-mono text-sm text-gray-300">"Melhor investimento que fiz. O FPS boost é real, meu PC batata rodou liso."</p>
                <div className="flex text-white text-xs font-mono mt-auto">
                  RATING: ★★★★★
                </div>
             </RetroCard>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
           <div className="mb-16 text-center">
            <h2 className="text-4xl font-display font-bold text-white mb-4">ESCOLHA SEU PLANO</h2>
            <p className="text-muted-foreground font-mono">DESBLOQUEIE O POTENCIAL MÁXIMO AGORA</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <RetroCard className="flex flex-col h-full border-muted hover:border-white/50 transition-colors">
              <div className="mb-6 text-center">
                <h3 className="font-display font-bold text-2xl text-white">DIÁRIO</h3>
                <div className="text-3xl font-mono mt-2">R$ 15,00</div>
              </div>
              <ul className="space-y-3 mb-8 flex-1 font-mono text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-white" /> Acesso por 24h</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-white" /> Todas as funções</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-white" /> Suporte básico</li>
              </ul>
              <Button variant="outline" className="w-full rounded-none border-white/20 hover:bg-white hover:text-black font-bold font-mono">COMPRAR</Button>
            </RetroCard>

            {/* Pro Plan - Featured */}
            <RetroCard variant="primary" glow className="flex flex-col h-full transform md:-translate-y-4 z-10 bg-card">
              <div className="absolute top-0 inset-x-0 h-1 bg-primary shadow-[0_0_10px_rgba(217,70,239,0.8)]" />
              <div className="mb-6 text-center">
                <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 mb-2 inline-block font-mono">RECOMENDADO</span>
                <h3 className="font-display font-bold text-3xl text-primary">MENSAL</h3>
                <div className="text-4xl font-mono mt-2 font-bold text-white">R$ 45,00</div>
              </div>
              <ul className="space-y-4 mb-8 flex-1 font-mono text-sm text-gray-300">
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-primary" /> Acesso por 30 dias</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-primary" /> Todas as funções</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-primary" /> Suporte prioritário</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-primary" /> Configs exclusivas</li>
              </ul>
              <Button className="w-full rounded-none bg-primary hover:bg-primary/90 font-bold font-mono py-6 text-lg shadow-[0_0_15px_rgba(217,70,239,0.4)]">COMPRAR AGORA</Button>
            </RetroCard>

            {/* Lifetime Plan */}
            <RetroCard variant="secondary" className="flex flex-col h-full border-secondary/50 hover:border-secondary transition-colors">
              <div className="mb-6 text-center">
                <h3 className="font-display font-bold text-2xl text-secondary">VITALÍCIO</h3>
                <div className="text-3xl font-mono mt-2">R$ 120,00</div>
              </div>
              <ul className="space-y-3 mb-8 flex-1 font-mono text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-secondary" /> Acesso permanente</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-secondary" /> Updates futuros</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-secondary" /> Grupo VIP</li>
              </ul>
              <Button variant="outline" className="w-full rounded-none border-secondary text-secondary hover:bg-secondary hover:text-black font-bold font-mono">COMPRAR</Button>
            </RetroCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-black/80 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
           <h2 className="text-2xl font-display font-bold text-white mb-6 tracking-widest">AKEMISOFT</h2>
           <div className="flex gap-8 mb-8 font-mono text-sm text-muted-foreground">
             <a href="#" className="hover:text-primary transition-colors">TERMOS</a>
             <a href="#" className="hover:text-primary transition-colors">PRIVACIDADE</a>
             <a href="#" className="hover:text-primary transition-colors">DISCORD</a>
           </div>
           <p className="font-mono text-xs text-muted-foreground/50">
             © 2025 AKEMISOFT. SYSTEM ALL RIGHTS RESERVED. <br/>
             DESIGNED BY REPLIT AGENT.
           </p>
        </div>
      </footer>
    </div>
  );
}