import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, ArrowLeft, Loader2, XCircle, Sparkles, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CyberGrid } from "@/components/CyberGrid";

interface SessionData {
  success: boolean;
  customerEmail?: string;
  customerName?: string;
  planName?: string;
  amount?: number;
  currency?: string;
}

interface Order {
  id: number;
  planName: string;
  amount: number;
  customerEmail: string;
  createdAt: string;
}

export default function Success() {
  const [, setLocation] = useLocation();
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [noSessionId, setNoSessionId] = useState(false);
  const [lookupEmail, setLookupEmail] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");

    if (!sessionId) {
      setNoSessionId(true);
      setLoading(false);
      return;
    }

    fetch(`/api/checkout/session/${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSessionData(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Erro ao verificar pagamento");
        setLoading(false);
      });
  }, []);

  const handleLookupOrders = async () => {
    if (!lookupEmail.trim()) {
      setLookupError('Por favor, insira seu email');
      return;
    }
    
    setLookupLoading(true);
    setLookupError('');
    
    try {
      const response = await fetch(`/api/orders?email=${encodeURIComponent(lookupEmail)}`);
      const data = await response.json();
      
      if (data.error) {
        setLookupError(data.error);
      } else if (data.orders && data.orders.length > 0) {
        setOrders(data.orders);
        setNoSessionId(false);
        setSessionData({
          success: true,
          customerEmail: data.orders[0].customerEmail,
          planName: data.orders[0].planName,
          amount: data.orders[0].amount
        });
      } else {
        setLookupError('Nenhuma compra encontrada com este email.');
      }
    } catch (error) {
      setLookupError('Erro ao buscar pedidos. Tente novamente.');
    } finally {
      setLookupLoading(false);
    }
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount / 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <CyberGrid />
        <div className="text-center z-10">
          <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-4" />
          <p className="text-white font-mono text-lg">Verificando pagamento...</p>
        </div>
      </div>
    );
  }

  if (noSessionId && !sessionData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <CyberGrid />
        <div className="scanlines" />
        <div className="text-center z-10 max-w-md mx-auto px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Search className="w-20 h-20 text-primary mx-auto mb-6" />
          </motion.div>
          <h1 className="text-3xl font-display font-bold text-white mb-4">
            Buscar sua compra
          </h1>
          <p className="text-gray-400 font-mono mb-8">
            Insira seu email para verificar o status da sua compra.
          </p>
          
          <div className="space-y-4">
            <div className="space-y-2 text-left">
              <Label htmlFor="lookup-email" className="text-white font-mono">
                Seu email
              </Label>
              <Input
                id="lookup-email"
                type="email"
                placeholder="seu@email.com"
                value={lookupEmail}
                onChange={(e) => {
                  setLookupEmail(e.target.value);
                  setLookupError('');
                }}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-primary"
                data-testid="input-lookup-email"
              />
              {lookupError && (
                <p className="text-red-500 text-sm font-mono">{lookupError}</p>
              )}
            </div>
            
            <Button
              onClick={handleLookupOrders}
              disabled={lookupLoading}
              className="w-full bg-primary hover:bg-primary/90"
              data-testid="button-lookup-orders"
            >
              {lookupLoading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Buscando...</>
              ) : (
                <><Search className="w-4 h-4 mr-2" /> Buscar Pedidos</>
              )}
            </Button>
            
            <Button
              onClick={() => setLocation("/#pricing")}
              variant="outline"
              className="w-full border-white/20 hover:bg-white hover:text-black"
              data-testid="button-back-to-pricing-lookup"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Planos
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (error || !sessionData?.success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <CyberGrid />
        <div className="text-center z-10 max-w-md mx-auto px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <XCircle className="w-24 h-24 text-red-500 mx-auto mb-6" />
          </motion.div>
          <h1 className="text-3xl font-display font-bold text-white mb-4">
            Algo deu errado
          </h1>
          <p className="text-gray-400 font-mono mb-8">
            {error || "O pagamento não foi concluído. Por favor, tente novamente."}
          </p>
          <Button
            onClick={() => setLocation("/#pricing")}
            className="bg-primary hover:bg-primary/90"
            data-testid="button-back-to-pricing"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Planos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center overflow-hidden">
      <CyberGrid />
      <div className="scanlines" />
      
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50 animate-pulse" />
            <CheckCircle2 className="w-32 h-32 text-green-400 relative" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-mono text-sm uppercase tracking-widest">
              Pagamento Confirmado
            </span>
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-4" data-testid="text-success-title">
            BEM-VINDO À ELITE!
          </h1>
          
          <p className="text-xl text-gray-300 font-mono mb-2">
            Obrigado, <span className="text-primary font-bold">{sessionData.customerName || "Gamer"}</span>!
          </p>
          
          <p className="text-gray-400 font-mono mb-8">
            {sessionData.planName ? (
              <>
                Sua compra do plano{" "}
                <span className="text-secondary font-bold">{sessionData.planName}</span> foi processada com sucesso.
              </>
            ) : (
              "Sua compra foi processada com sucesso."
            )}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8"
        >
          {sessionData.customerEmail ? (
            <>
              <div className="flex items-center justify-center gap-3 text-green-400 mb-4">
                <Mail className="w-5 h-5" />
                <span className="font-mono text-sm">Email enviado para:</span>
              </div>
              <p className="text-white font-bold text-lg" data-testid="text-customer-email">
                {sessionData.customerEmail}
              </p>
              <p className="text-gray-500 text-sm font-mono mt-2">
                Verifique sua caixa de entrada (e spam) para acessar o conteúdo.
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center gap-3 text-green-400 mb-4">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-mono text-sm">Pagamento confirmado!</span>
              </div>
              <p className="text-gray-400 text-sm font-mono">
                Entre em contato pelo WhatsApp para receber seu acesso.
              </p>
            </>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-4"
        >
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
            <p className="text-primary font-mono text-sm mb-1">VALOR PAGO</p>
            <p className="text-3xl font-bold text-white" data-testid="text-amount-paid">
              {sessionData.amount ? formatPrice(sessionData.amount) : "R$ --"}
            </p>
          </div>

          <Button
            onClick={() => setLocation("/")}
            variant="outline"
            className="w-full border-white/20 hover:bg-white hover:text-black"
            data-testid="button-back-home"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Home
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-xs text-gray-600 font-mono mt-8"
        >
          Em caso de dúvidas, entre em contato pelo WhatsApp.
        </motion.p>
      </div>
    </div>
  );
}
