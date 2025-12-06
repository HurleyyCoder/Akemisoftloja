import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getUncachableStripeClient, getStripePublishableKey } from "./stripeClient";
import { WebhookHandlers } from "./webhookHandlers";

const PLANS = {
  starter: {
    name: 'STARTER',
    amount: 2790,
    description: 'Pack Básico + Config de Rede'
  },
  pro_gamer: {
    name: 'PRO GAMER',
    amount: 5990,
    description: 'Otimização Completa + GPU Overclock + Input Lag Zero + Suporte AnyDesk'
  },
  full_tweak: {
    name: 'FULL TWEAK',
    amount: 14900,
    description: 'Técnico Dedicado + BIOS Modding + Windows Custom ISO'
  }
};

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get('/api/stripe/publishable-key', async (_req, res) => {
    try {
      const key = await getStripePublishableKey();
      res.json({ publishableKey: key });
    } catch (error) {
      console.error('Error getting Stripe key:', error);
      res.status(500).json({ error: 'Failed to get Stripe key' });
    }
  });

  app.get('/api/plans', (_req, res) => {
    res.json({ plans: PLANS });
  });

  app.post('/api/checkout', async (req, res) => {
    try {
      const { planId, email } = req.body;
      
      if (!planId || !PLANS[planId as keyof typeof PLANS]) {
        return res.status(400).json({ error: 'Invalid plan selected' });
      }

      const plan = PLANS[planId as keyof typeof PLANS];
      const stripe = await getUncachableStripeClient();

      const baseUrl = `https://${process.env.REPLIT_DOMAINS?.split(',')[0]}`;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        customer_email: email || undefined,
        line_items: [
          {
            price_data: {
              currency: 'brl',
              product_data: {
                name: `AkemiSoft ${plan.name}`,
                description: plan.description,
                images: ['https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400'],
              },
              unit_amount: plan.amount,
            },
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/#pricing`,
        metadata: {
          planId: planId,
          planName: plan.name
        }
      });

      res.json({ url: session.url, sessionId: session.id });
    } catch (error: any) {
      console.error('Checkout error:', error);
      res.status(500).json({ error: error.message || 'Checkout failed' });
    }
  });

  app.get('/api/checkout/session/:sessionId', async (req, res) => {
    try {
      const { sessionId } = req.params;
      const stripe = await getUncachableStripeClient();
      
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'customer']
      });

      const existingOrder = await storage.getOrderBySessionId(sessionId);
      
      if (!existingOrder && session.payment_status === 'paid') {
        const lineItem = session.line_items?.data[0];
        const planName = session.metadata?.planName || lineItem?.description || 'AkemiSoft';
        
        await storage.createOrder({
          stripeSessionId: session.id,
          stripeCustomerId: session.customer as string || null,
          customerEmail: session.customer_details?.email || session.customer_email || null,
          customerName: session.customer_details?.name || null,
          planName: planName,
          amount: session.amount_total || 0,
          currency: session.currency || 'brl',
          status: 'completed',
          paymentStatus: session.payment_status
        });

        if (session.customer_details?.email) {
          const { sendPurchaseConfirmationEmail } = await import('./resendClient');
          try {
            await sendPurchaseConfirmationEmail(
              session.customer_details.email,
              session.customer_details.name || 'Gamer',
              planName,
              session.amount_total || 0
            );
          } catch (emailError) {
            console.error('Failed to send email:', emailError);
          }
        }
      }

      res.json({
        success: session.payment_status === 'paid',
        customerEmail: session.customer_details?.email,
        customerName: session.customer_details?.name,
        planName: session.metadata?.planName,
        amount: session.amount_total,
        currency: session.currency
      });
    } catch (error: any) {
      console.error('Session retrieval error:', error);
      res.status(500).json({ error: error.message || 'Failed to retrieve session' });
    }
  });

  app.get('/api/orders', async (req, res) => {
    try {
      const { email } = req.query;
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: 'Email required' });
      }
      const orders = await storage.getOrdersByEmail(email);
      res.json({ orders });
    } catch (error: any) {
      console.error('Orders error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  return httpServer;
}
