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
  Settings, CheckCircle2, ArrowUpRight 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Using the generated images (assuming they will be ready, or falling back to existing ones conceptually)
import cityBg from "@assets/generated_images/pixel_art_cyberpunk_city_skyline_background.png"; 
import botAvatar from "@assets/generated_images/pixel_art_robot_avatar.png";
import gamerAvatar from "@assets/generated_images/pixel_art_gamer_avatar.png";

// Placeholder for new assets if they aren't ready yet, using what we have for now but context implies we should use new ones if available. 
// I will use the generated image paths in the next step or assume they are at standard paths if I can.
// For now I'll use the existing variables but re-purpose them in the UI.

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

        {/* Hero Section - Redesigned for Performance/Tech */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          {/* Background Video/Image Concept */}
          <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background/80 to-background z-10" />
            <img 
              src={cityBg} 
              alt="Tech Background" 
              className="w-full h-full object-cover opacity-10 pixelated grayscale contrast-125"
              style={{ imageRendering: "pixelated" }}
            />
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Column: Copy */}
              <div className="text-left flex flex-col items-start">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="mb-6 flex items-center gap-2"
                >
                  <span className="h-px w-8 bg-secondary"></span>
                  <span className="text-secondary font-mono text-xs tracking-[0.2em] uppercase">System Latency: 0.5ms</span>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-black font-display mb-6 tracking-tighter text-white leading-[0.9]"
                >
                  ZERO <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary">
                    DELAY
                  </span>
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg md:text-xl text-muted-foreground mb-10 font-mono max-w-xl leading-relaxed border-l-2 border-primary/20 pl-6"
                >
                  Elimine o input lag. Desbloqueie o verdadeiro FPS do seu hardware. 
                  A AkemiSoft otimiza o kernel do Windows para performance competitiva pura.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                  <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-bold font-mono text-lg px-8 py-7 rounded-none transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    <Zap className="mr-2 h-5 w-5 fill-black" />
                    OTIMIZAR AGORA
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 font-bold font-mono text-lg px-8 py-7 rounded-none backdrop-blur-sm">
                    <Activity className="mr-2 h-5 w-5" />
                    VER BENCHMARKS
                  </Button>
                </motion.div>
              </div>

              {/* Right Column: Visualizer */}
              <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 1, delay: 0.4 }}
                 className="hidden lg:block relative"
              >
                {/* Abstract HUD Graphic */}
                <div className="relative w-full aspect-square max-w-md mx-auto border border-white/10 bg-black/40 backdrop-blur-md p-6">
                   <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
                   <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
                   <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
                   <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />
                   
                   <div className="h-full flex flex-col justify-between">
                      <div className="flex justify-between items-center border-b border-white/10 pb-4">
                        <span className="font-mono text-xs text-muted-foreground">REAL-TIME METRICS</span>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-500/20" />
                          <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        </div>
                      </div>

                      {/* Animated Graph Representation */}
                      <div className="flex-1 py-8 flex items-end gap-1 justify-between opacity-80">
                        {[40, 60, 45, 70, 50, 80, 65, 90, 75, 95, 85, 100, 90, 80, 95, 85, 70, 90, 100, 95].map((h, i) => (
                          <motion.div 
                            key={i}
                            initial={{ height: "10%" }}
                            animate={{ height: `${h}%` }}
                            transition={{ 
                              duration: 0.5, 
                              repeat: Infinity, 
                              repeatType: "reverse", 
                              delay: i * 0.05 
                            }}
                            className="w-full bg-gradient-to-t from-primary/20 to-primary"
                          />
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                        <div>
                          <div className="text-xs font-mono text-muted-foreground">FPS AVG</div>
                          <div className="text-2xl font-display font-bold text-white">240<span className="text-sm text-primary">+</span></div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-mono text-muted-foreground">INPUT DELAY</div>
                          <div className="text-2xl font-display font-bold text-secondary">0.4<span className="text-sm text-muted-foreground">ms</span></div>
                        </div>
                      </div>
                   </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Stats Section - Tech Focused */}
        <section className="border-y border-border bg-black/50 backdrop-blur-sm relative z-20">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            <StatCounter value={35} label="MS REDUZIDOS" prefix="-" />
            <StatCounter value={144} label="FPS MÉDIO GANHO" prefix="+" />
            <StatCounter value={42000} label="PCS OTIMIZADOS" />
            <StatCounter value={0} label="PROCESSOS INÚTEIS" />
          </div>
        </section>

        {/* Problem/Solution Section - High Tech */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
               <div className="order-2 md:order-1">
                 <h2 className="text-4xl font-display font-bold text-white mb-6">O INIMIGO INVISÍVEL: <span className="text-destructive">SYSTEM LATENCY</span></h2>
                 <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                   Seu hardware é potente, mas o Windows não foi feito para jogos competitivos. Processos em segundo plano, telemetria e má gestão de threads criam micro-stutters e delay que te fazem perder trocas de tiro.
                 </p>
                 
                 <ul className="space-y-4 font-mono text-sm">
                   <li className="flex items-start gap-3">
                     <div className="w-6 h-6 rounded bg-destructive/10 text-destructive flex items-center justify-center shrink-0">✕</div>
                     <span className="text-gray-400">Windows Update rodando em segundo plano</span>
                   </li>
                   <li className="flex items-start gap-3">
                     <div className="w-6 h-6 rounded bg-destructive/10 text-destructive flex items-center justify-center shrink-0">✕</div>
                     <span className="text-gray-400">Prioridade de CPU mal alocada para o jogo</span>
                   </li>
                   <li className="flex items-start gap-3">
                     <div className="w-6 h-6 rounded bg-destructive/10 text-destructive flex items-center justify-center shrink-0">✕</div>
                     <span className="text-gray-400">Input Lag causado por drivers genéricos</span>
                   </li>
                 </ul>
               </div>

               <div className="order-1 md:order-2 relative">
                  <RetroCard className="bg-black/80 border-primary/30 p-8">
                    <div className="absolute -top-4 -right-4 bg-secondary text-black font-bold px-4 py-1 font-mono text-sm">AKEMISOFT SOLUTION</div>
                    <h3 className="text-2xl font-display font-bold text-white mb-6">OTIMIZAÇÃO KERNEL-LEVEL</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-xs font-mono text-muted-foreground mb-2">
                          <span>LATÊNCIA DO SISTEMA</span>
                          <span>-45%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-secondary w-[55%]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-mono text-muted-foreground mb-2">
                          <span>ESTABILIDADE DE FPS (1% LOW)</span>
                          <span>+80%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-[80%]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-mono text-muted-foreground mb-2">
                          <span>OCUPAÇÃO DE RAM</span>
                          <span>-30%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-white w-[70%]" />
                        </div>
                      </div>
                    </div>
                  </RetroCard>
               </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 bg-secondary/5 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">ENGENHARIA DE PERFORMANCE</h2>
              <p className="text-muted-foreground font-mono">Transforme seu PC em uma máquina dedicada a e-sports.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="group relative bg-black/40 border border-white/10 p-8 hover:border-primary/50 transition-colors overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Cpu className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-bold font-display text-white mb-3">CPU UNPARKING</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Força todos os núcleos do processador a operarem em frequência máxima durante o jogo, eliminando micro-travamentos.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group relative bg-black/40 border border-white/10 p-8 hover:border-secondary/50 transition-colors overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Wifi className="w-10 h-10 text-secondary mb-6" />
                <h3 className="text-xl font-bold font-display text-white mb-3">REDUÇÃO DE PING</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Otimiza as rotas TCP/IP e desabilita o Nagle's Algorithm do Windows para garantir que seus pacotes cheguem primeiro.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group relative bg-black/40 border border-white/10 p-8 hover:border-white/50 transition-colors overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <MousePointer2 className="w-10 h-10 text-white mb-6" />
                <h3 className="text-xl font-bold font-display text-white mb-3">INPUT PRECISION</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Remove a aceleração de mouse do Windows e reduz a latência USB para 1ms, garantindo mira 1:1.
                </p>
              </div>
               {/* Feature 4 */}
              <div className="group relative bg-black/40 border border-white/10 p-8 hover:border-purple-400/50 transition-colors overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Layers className="w-10 h-10 text-purple-400 mb-6" />
                <h3 className="text-xl font-bold font-display text-white mb-3">DEBLOAT AUTOMÁTICO</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Remove mais de 150 serviços inúteis do Windows que consomem RAM e CPU sem você saber.
                </p>
              </div>
               {/* Feature 5 */}
              <div className="group relative bg-black/40 border border-white/10 p-8 hover:border-pink-400/50 transition-colors overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-pink-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Settings className="w-10 h-10 text-pink-400 mb-6" />
                <h3 className="text-xl font-bold font-display text-white mb-3">GPU SCHEDULING</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Reorganiza a fila de renderização da placa de vídeo para priorizar quadros mais recentes, diminuindo o display lag.
                </p>
              </div>
               {/* Feature 6 */}
              <div className="group relative bg-black/40 border border-white/10 p-8 hover:border-cyan-400/50 transition-colors overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <BarChart3 className="w-10 h-10 text-cyan-400 mb-6" />
                <h3 className="text-xl font-bold font-display text-white mb-3">POWER PLAN EXCLUSIVO</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Plano de energia customizado que impede que seu hardware entre em estado de economia, mantendo clocks estáveis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section - Repurposed as "Plans" */}
        <section id="pricing" className="py-32 bg-background relative border-t border-border">
           <div className="max-w-7xl mx-auto px-6">
             <div className="mb-20 text-center">
              <h2 className="text-5xl font-display font-bold text-white mb-4">ESCOLHA SEU NÍVEL</h2>
              <p className="text-muted-foreground font-mono text-lg">OTIMIZAÇÃO PROFISSIONAL SEGURA E REVERSÍVEL</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Basic Plan */}
              <RetroCard className="flex flex-col h-full bg-black/20 border-white/10 hover:border-white/30 transition-all duration-300">
                <div className="mb-6 p-6 border-b border-white/5">
                  <h3 className="font-display font-bold text-2xl text-white mb-2">STARTER FPS</h3>
                  <div className="text-4xl font-mono font-bold">R$ 27<span className="text-sm text-muted-foreground font-normal">,90</span></div>
                  <p className="text-xs text-muted-foreground mt-2">Pagamento único</p>
                </div>
                <div className="p-6 flex-1">
                  <ul className="space-y-4 font-mono text-sm text-gray-400">
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white" /> Pack de Regedit Básico</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white" /> Debloat do Windows</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white" /> Configuração de Rede</li>
                    <li className="flex items-center gap-3 opacity-50"><div className="w-4 h-4" /> Plano de Energia Custom</li>
                  </ul>
                </div>
                <div className="p-6">
                  <Button variant="outline" className="w-full rounded-none border-white/20 hover:bg-white hover:text-black font-bold font-mono">COMPRAR PACK</Button>
                </div>
              </RetroCard>

              {/* Pro Plan - Featured */}
              <RetroCard variant="primary" glow className="flex flex-col h-full transform md:-translate-y-6 z-10 bg-black border-primary relative group">
                <div className="absolute top-0 inset-x-0 h-1 bg-primary shadow-[0_0_20px_rgba(217,70,239,0.8)]" />
                
                <div className="mb-6 p-8 border-b border-primary/20 bg-primary/5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display font-bold text-3xl text-primary text-glow">PRO GAMER</h3>
                    <span className="bg-primary text-black text-[10px] font-bold px-2 py-1 font-mono">POPULAR</span>
                  </div>
                  <div className="text-5xl font-mono font-bold text-white">R$ 59<span className="text-lg text-muted-foreground font-normal">,90</span></div>
                  <p className="text-xs text-primary/80 mt-2">Pagamento único • Acesso Vitalício</p>
                </div>
                
                <div className="p-8 flex-1">
                  <ul className="space-y-5 font-mono text-sm text-gray-300">
                    <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-primary" /> App AkemiSoft Booster</li>
                    <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-primary" /> Plano de Energia "Ultimate"</li>
                    <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-primary" /> Redução de Input Lag USB</li>
                    <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-primary" /> GPU Overclock Seguro</li>
                    <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-primary" /> Suporte Remoto (AnyDesk)</li>
                  </ul>
                </div>
                
                <div className="p-8">
                  <Button className="w-full rounded-none bg-primary hover:bg-primary/90 font-bold font-mono h-14 text-lg shadow-[0_0_20px_rgba(217,70,239,0.4)] hover:shadow-[0_0_30px_rgba(217,70,239,0.6)] transition-all">
                    OTIMIZAR MEU PC
                  </Button>
                </div>
              </RetroCard>

              {/* Advanced Plan */}
              <RetroCard variant="secondary" className="flex flex-col h-full bg-black/20 border-secondary/50 hover:border-secondary transition-all duration-300">
                <div className="mb-6 p-6 border-b border-secondary/20 bg-secondary/5">
                  <h3 className="font-display font-bold text-2xl text-secondary mb-2">FULL TWEAK</h3>
                  <div className="text-4xl font-mono font-bold">R$ 149<span className="text-sm text-muted-foreground font-normal">,00</span></div>
                   <p className="text-xs text-secondary/70 mt-2">Serviço Agendado (1h)</p>
                </div>
                <div className="p-6 flex-1">
                  <ul className="space-y-4 font-mono text-sm text-muted-foreground">
                    <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-4 h-4 text-secondary" /> Técnico Dedicado (1 a 1)</li>
                    <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-4 h-4 text-secondary" /> Otimização de BIOS</li>
                    <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-4 h-4 text-secondary" /> Instalação Windows Custom</li>
                    <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-4 h-4 text-secondary" /> Overclock RAM & CPU</li>
                  </ul>
                </div>
                <div className="p-6">
                  <Button variant="outline" className="w-full rounded-none border-secondary text-secondary hover:bg-secondary hover:text-black font-bold font-mono">AGENDAR SERVIÇO</Button>
                </div>
              </RetroCard>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-border bg-black/90 text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
           <div className="max-w-7xl mx-auto px-6 flex flex-col items-center relative z-10">
             <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                <h2 className="text-2xl font-display font-bold text-white tracking-widest">AKEMISOFT</h2>
             </div>
             
             <p className="text-sm text-muted-foreground max-w-lg mb-8">
               Não somos afiliados à Microsoft, NVIDIA ou AMD. Nossas otimizações são baseadas em pesquisas de engenharia de software para maximizar a eficiência do hardware existente.
             </p>

             <div className="flex gap-8 mb-8 font-mono text-xs text-muted-foreground">
               <a href="#" className="hover:text-white transition-colors">BENCHMARKS</a>
               <a href="#" className="hover:text-white transition-colors">FAQ TÉCNICO</a>
               <a href="#" className="hover:text-white transition-colors">SUPORTE</a>
             </div>
             <p className="font-mono text-[10px] text-muted-foreground/30">
               © 2025 AKEMISOFT PERFORMANCE ENGINEERING.
             </p>
          </div>
        </footer>
      </div>
    </>
  );
}