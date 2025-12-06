import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { RetroCard } from "@/components/RetroCard";
import { GlitchText } from "@/components/GlitchText";
import { BootSequence } from "@/components/BootSequence";
import { CyberGrid } from "@/components/CyberGrid";
import { StatCounter } from "@/components/StatCounter";
import { Button } from "@/components/ui/button";
import { Cpu, Zap, Shield, Crosshair, ChevronRight, Terminal, Activity, MousePointer2, Trophy, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import cityBg from "@assets/generated_images/pixel_art_cyberpunk_city_skyline_background.png";
import botAvatar from "@assets/generated_images/pixel_art_robot_avatar.png";
import hackerAvatar from "@assets/generated_images/pixel_art_hacker_avatar.png";
import gamerAvatar from "@assets/generated_images/pixel_art_gamer_avatar.png";

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      <div className={`min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden transition-opacity duration-1000 ${!booted ? 'opacity-0' : 'opacity-100'}`}>
        {/* Scanlines & Grid Overlay */}
        <div className="scanlines" />
        <CyberGrid />
        
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
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 text-center flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1 border border-secondary/50 bg-secondary/10 text-secondary font-mono text-xs md:text-sm tracking-widest uppercase animate-pulse">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                System Status: UNDETECTED
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-9xl font-black font-display mb-6 tracking-tighter text-white leading-none"
            >
              DOMINE O <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary relative">
                SERVIDOR
                <span className="absolute -inset-1 bg-primary/20 blur-xl -z-10" />
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-2xl text-muted-foreground mb-12 font-mono max-w-3xl mx-auto leading-relaxed"
            >
              Não jogue apenas para participar. <span className="text-white font-bold">Jogue para reinar.</span> Nossa tecnologia exclusiva garante vantagem competitiva absoluta com 0% de risco.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col md:flex-row gap-6 w-full md:w-auto"
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold text-xl px-12 py-8 rounded-none border-2 border-transparent hover:border-white transition-all shadow-[0_0_30px_rgba(217,70,239,0.4)] hover:shadow-[0_0_50px_rgba(217,70,239,0.6)] group relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Zap className="mr-3 h-6 w-6 group-hover:animate-spin" />
                INICIAR SISTEMA
              </Button>
              <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 font-bold text-xl px-12 py-8 rounded-none border-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all">
                <Terminal className="mr-3 h-6 w-6" />
                VER STATUS
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-border bg-black/50 backdrop-blur-sm relative z-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            <StatCounter value={15420} label="USUÁRIOS ATIVOS" />
            <StatCounter value={99.9} label="UPTIME GARANTIDO" suffix="%" />
            <StatCounter value={0} label="BANIMENTOS REGISTRADOS" />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-secondary/5 to-transparent" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="mb-20 text-center max-w-3xl mx-auto">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-display font-bold text-white mb-6"
              >
                ARSENAL DE ELITE
              </motion.h2>
              <p className="text-muted-foreground font-mono text-lg">
                Ferramentas desenvolvidas por engenheiros de software e pro-players.
                <br/>O equilíbrio perfeito entre performance e segurança.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <RetroCard variant="secondary" glow className="h-full group hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 bg-secondary/10 flex items-center justify-center mb-8 border border-secondary group-hover:bg-secondary group-hover:text-black transition-colors">
                    <Crosshair className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4 text-white group-hover:text-secondary transition-colors">AIMBOT AI</h3>
                  <p className="text-muted-foreground font-mono text-sm leading-relaxed mb-6">
                    Nossa IA aprende o padrão de movimento dos inimigos. Ajuste o FOV, suavização e ossos alvo para parecer totalmente humano.
                  </p>
                  <ul className="space-y-2 font-mono text-xs text-secondary/80">
                    <li className="flex items-center gap-2">✓ Predição de Movimento</li>
                    <li className="flex items-center gap-2">✓ Controle de Recuo</li>
                    <li className="flex items-center gap-2">✓ Humanização Configurável</li>
                  </ul>
                </RetroCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <RetroCard variant="primary" glow className="h-full group hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-primary text-black font-bold px-3 py-1 text-xs font-mono">POPULAR</div>
                  <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mb-8 border border-primary group-hover:bg-primary group-hover:text-black transition-colors">
                    <Activity className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4 text-white group-hover:text-primary transition-colors">ESP WALLHACK</h3>
                  <p className="text-muted-foreground font-mono text-sm leading-relaxed mb-6">
                    Veja através das paredes com clareza cristalina. Identifique equipamentos, vida, distância e linhas de visão dos oponentes.
                  </p>
                  <ul className="space-y-2 font-mono text-xs text-primary/80">
                    <li className="flex items-center gap-2">✓ Esqueleto & Box 2D/3D</li>
                    <li className="flex items-center gap-2">✓ Radar Externo</li>
                    <li className="flex items-center gap-2">✓ Loot Filter Inteligente</li>
                  </ul>
                </RetroCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <RetroCard className="h-full group hover:-translate-y-2 transition-transform duration-300 border-white/20 hover:border-white">
                  <div className="w-16 h-16 bg-white/5 flex items-center justify-center mb-8 border border-white/20 group-hover:bg-white group-hover:text-black transition-colors">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4 text-white group-hover:text-white transition-colors">SECURITY SHIELD</h3>
                  <p className="text-muted-foreground font-mono text-sm leading-relaxed mb-6">
                    Sistema de proteção kernel-level. HWID Spoofer integrado e atualizações automáticas contra novos anti-cheats.
                  </p>
                  <ul className="space-y-2 font-mono text-xs text-gray-400">
                    <li className="flex items-center gap-2">✓ VAC / BattlEye / EAC</li>
                    <li className="flex items-center gap-2">✓ Limpeza de Logs</li>
                    <li className="flex items-center gap-2">✓ Stream Proof (Invisível em Lives)</li>
                  </ul>
                </RetroCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Game Style CTA */}
        <section className="py-20 border-y border-border bg-secondary/5 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8">PRONTO PARA SUBIR DE NÍVEL?</h2>
            <div className="flex justify-center items-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary mb-1">BRONZE</div>
                <div className="text-xs text-muted-foreground font-mono">RANK ATUAL</div>
              </div>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-secondary to-transparent" />
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-1 animate-pulse">GLOBAL</div>
                <div className="text-xs text-muted-foreground font-mono">SEU DESTINO</div>
              </div>
            </div>
            <Button className="bg-white text-black hover:bg-gray-200 font-bold text-lg px-10 py-6 rounded-none border-2 border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              COMEÇAR A JORNADA
            </Button>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-32 bg-black/40 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 flex items-center justify-between border-b border-border pb-4">
              <h2 className="text-4xl font-display font-bold text-white">FEEDBACK DA COMUNIDADE</h2>
              <div className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                LIVE FEED
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <RetroCard className="flex flex-col gap-4 hover:bg-white/5 transition-colors cursor-default">
                  <div className="flex items-center gap-4 border-b border-border pb-4">
                    <img src={hackerAvatar} alt="User" className="w-12 h-12 border border-primary p-0.5" />
                    <div>
                      <h4 className="font-display font-bold text-lg text-primary">NEO_HACKER</h4>
                      <p className="text-xs font-mono text-muted-foreground">CS2 • GLOBAL ELITE</p>
                    </div>
                  </div>
                  <p className="font-mono text-sm text-gray-300 italic">"O suporte é surreal. Tive um problema na config e resolveram em 5 minutos no Discord. O cheat é indetectável, uso na minha main há 6 meses."</p>
                  <div className="flex text-primary text-xs font-mono mt-auto gap-1">
                    ★★★★★ <span className="text-muted-foreground ml-2">VERIFICADO</span>
                  </div>
               </RetroCard>

               <RetroCard className="flex flex-col gap-4 hover:bg-white/5 transition-colors cursor-default">
                  <div className="flex items-center gap-4 border-b border-border pb-4">
                    <img src={botAvatar} alt="User" className="w-12 h-12 border border-secondary p-0.5" />
                    <div>
                      <h4 className="font-display font-bold text-lg text-secondary">CYBER_BOT_99</h4>
                      <p className="text-xs font-mono text-muted-foreground">VALORANT • RADIANTE</p>
                    </div>
                  </div>
                  <p className="font-mono text-sm text-gray-300 italic">"Stream proof funciona perfeitamente. Faço live pra 2k pessoas e ninguém desconfia. O aimbot com smooth alto é muito legit."</p>
                  <div className="flex text-secondary text-xs font-mono mt-auto gap-1">
                    ★★★★★ <span className="text-muted-foreground ml-2">VERIFICADO</span>
                  </div>
               </RetroCard>

               <RetroCard className="flex flex-col gap-4 hover:bg-white/5 transition-colors cursor-default">
                  <div className="flex items-center gap-4 border-b border-border pb-4">
                    <img src={gamerAvatar} alt="User" className="w-12 h-12 border border-white p-0.5" />
                    <div>
                      <h4 className="font-display font-bold text-lg text-white">X_SLAYER_X</h4>
                      <p className="text-xs font-mono text-muted-foreground">WARZONE • TOP 250</p>
                    </div>
                  </div>
                  <p className="font-mono text-sm text-gray-300 italic">"Já usei vários outros providers, mas o AkemiSoft é outro nível. Otimização absurda, não cai FPS e o wallhack não polui a tela."</p>
                  <div className="flex text-white text-xs font-mono mt-auto gap-1">
                    ★★★★★ <span className="text-muted-foreground ml-2">VERIFICADO</span>
                  </div>
               </RetroCard>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-32 bg-background relative">
           <div className="max-w-7xl mx-auto px-6">
             <div className="mb-20 text-center">
              <h2 className="text-5xl font-display font-bold text-white mb-4">ESCOLHA SEU LOADOUT</h2>
              <p className="text-muted-foreground font-mono text-lg">ACESSO IMEDIATO APÓS O PAGAMENTO</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Basic Plan */}
              <RetroCard className="flex flex-col h-full border-muted hover:border-white/50 transition-all hover:scale-105 duration-300">
                <div className="mb-6 text-center p-6 border-b border-border/50 bg-white/5">
                  <h3 className="font-display font-bold text-2xl text-white mb-2">PASSE DIÁRIO</h3>
                  <div className="text-4xl font-mono font-bold">R$ 15<span className="text-sm text-muted-foreground font-normal">,00</span></div>
                </div>
                <div className="p-6 flex-1">
                  <ul className="space-y-4 font-mono text-sm text-muted-foreground">
                    <li className="flex items-center gap-3 text-white"><div className="w-1.5 h-1.5 bg-white" /> Acesso total por 24h</li>
                    <li className="flex items-center gap-3 text-white"><div className="w-1.5 h-1.5 bg-white" /> HWID Spoofer incluso</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-muted-foreground" /> Suporte via Ticket</li>
                  </ul>
                </div>
                <div className="p-6">
                  <Button variant="outline" className="w-full rounded-none border-white/20 hover:bg-white hover:text-black font-bold font-mono h-12">EQUIPAR</Button>
                </div>
              </RetroCard>

              {/* Pro Plan - Featured */}
              <RetroCard variant="primary" glow className="flex flex-col h-full transform md:-translate-y-8 z-10 bg-card border-primary relative group">
                <div className="absolute top-0 inset-x-0 h-1 bg-primary shadow-[0_0_20px_rgba(217,70,239,0.8)]" />
                
                <div className="mb-6 text-center p-8 border-b border-primary/30 bg-primary/5 relative overflow-hidden">
                  <div className="absolute top-3 right-3">
                    <span className="bg-primary text-black text-[10px] font-bold px-2 py-1 font-mono tracking-wider">BEST SELLER</span>
                  </div>
                  <h3 className="font-display font-bold text-4xl text-primary mb-2 text-glow">MENSAL</h3>
                  <div className="text-5xl font-mono font-bold text-white">R$ 45<span className="text-lg text-muted-foreground font-normal">,00</span></div>
                  <div className="text-xs font-mono text-primary/80 mt-2">ECONOMIA DE 80%</div>
                </div>
                
                <div className="p-8 flex-1">
                  <ul className="space-y-5 font-mono text-sm text-gray-300">
                    <li className="flex items-center gap-3 text-white"><div className="w-2 h-2 bg-primary shadow-[0_0_8px_currentColor]" /> Acesso total por 30 dias</li>
                    <li className="flex items-center gap-3 text-white"><div className="w-2 h-2 bg-primary shadow-[0_0_8px_currentColor]" /> HWID Spoofer incluso</li>
                    <li className="flex items-center gap-3 text-white"><div className="w-2 h-2 bg-primary shadow-[0_0_8px_currentColor]" /> Cargo VIP no Discord</li>
                    <li className="flex items-center gap-3 text-white"><div className="w-2 h-2 bg-primary shadow-[0_0_8px_currentColor]" /> Configs de Pro Players</li>
                    <li className="flex items-center gap-3 text-white"><div className="w-2 h-2 bg-primary shadow-[0_0_8px_currentColor]" /> Suporte Prioritário 24/7</li>
                  </ul>
                </div>
                
                <div className="p-8">
                  <Button className="w-full rounded-none bg-primary hover:bg-primary/90 font-bold font-mono h-14 text-lg shadow-[0_0_20px_rgba(217,70,239,0.4)] hover:shadow-[0_0_30px_rgba(217,70,239,0.6)] transition-all">
                    EQUIPAR AGORA
                  </Button>
                </div>
              </RetroCard>

              {/* Lifetime Plan */}
              <RetroCard variant="secondary" className="flex flex-col h-full border-secondary/50 hover:border-secondary transition-all hover:scale-105 duration-300">
                <div className="mb-6 text-center p-6 border-b border-secondary/20 bg-secondary/5">
                  <h3 className="font-display font-bold text-2xl text-secondary mb-2">LIFETIME</h3>
                  <div className="text-4xl font-mono font-bold">R$ 120<span className="text-sm text-muted-foreground font-normal">,00</span></div>
                </div>
                <div className="p-6 flex-1">
                  <ul className="space-y-4 font-mono text-sm text-muted-foreground">
                    <li className="flex items-center gap-3 text-white"><div className="w-1.5 h-1.5 bg-secondary" /> Acesso PERMANENTE</li>
                    <li className="flex items-center gap-3 text-white"><div className="w-1.5 h-1.5 bg-secondary" /> Todas atualizações futuras</li>
                    <li className="flex items-center gap-3 text-white"><div className="w-1.5 h-1.5 bg-secondary" /> Acesso a Betas Privados</li>
                  </ul>
                </div>
                <div className="p-6">
                  <Button variant="outline" className="w-full rounded-none border-secondary text-secondary hover:bg-secondary hover:text-black font-bold font-mono h-12">EQUIPAR</Button>
                </div>
              </RetroCard>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-border bg-black/80 text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
           <div className="max-w-7xl mx-auto px-6 flex flex-col items-center relative z-10">
             <h2 className="text-3xl font-display font-bold text-white mb-6 tracking-widest hover:text-primary transition-colors cursor-pointer">AKEMISOFT</h2>
             <div className="flex gap-8 mb-8 font-mono text-sm text-muted-foreground">
               <a href="#" className="hover:text-primary transition-colors">TERMOS DE USO</a>
               <a href="#" className="hover:text-primary transition-colors">POLÍTICA DE PRIVACIDADE</a>
               <a href="#" className="hover:text-primary transition-colors">STATUS DO SISTEMA</a>
             </div>
             <p className="font-mono text-xs text-muted-foreground/50">
               © 2025 AKEMISOFT. GAMEPLAY ENHANCEMENT SUITE. <br/>
               DESIGNED FOR CHAMPIONS.
             </p>
          </div>
        </footer>
      </div>
    </>
  );
}