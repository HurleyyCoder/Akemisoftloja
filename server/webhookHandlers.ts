import { getStripeSync } from './stripeClient';
import { sendPurchaseConfirmationEmail } from './resendClient';
import { storage } from './storage';
import { getUncachableStripeClient } from './stripeClient';

export class WebhookHandlers {
  static async processWebhook(payload: Buffer, signature: string, uuid: string): Promise<void> {
    if (!Buffer.isBuffer(payload)) {
      throw new Error(
        'STRIPE WEBHOOK ERROR: Payload must be a Buffer. ' +
        'Received type: ' + typeof payload + '. ' +
        'This usually means express.json() parsed the body before reaching this handler. ' +
        'FIX: Ensure webhook route is registered BEFORE app.use(express.json()).'
      );
    }

    const sync = await getStripeSync();
    await sync.processWebhook(payload, signature, uuid);
  }

  static async handleCheckoutCompleted(session: any): Promise<void> {
    const stripe = await getUncachableStripeClient();
    
    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      const priceId = lineItems.data[0]?.price?.id;
      const amount = session.amount_total || 0;
      
      const planNames: Record<string, string> = {
        'starter': 'STARTER',
        'pro_gamer': 'PRO GAMER',
        'full_tweak': 'FULL TWEAK'
      };
      
      let planName = 'AkemiSoft';
      if (priceId) {
        const price = await stripe.prices.retrieve(priceId, { expand: ['product'] });
        const product = price.product as any;
        planName = product?.name || planName;
      }

      const order = await storage.createOrder({
        stripeSessionId: session.id,
        stripeCustomerId: session.customer as string,
        customerEmail: session.customer_details?.email || session.customer_email,
        customerName: session.customer_details?.name || 'Cliente',
        planName: planName,
        amount: amount,
        currency: session.currency || 'brl',
        status: 'completed',
        paymentStatus: session.payment_status
      });

      console.log('Order created:', order.id);

      if (order.customerEmail) {
        try {
          await sendPurchaseConfirmationEmail(
            order.customerEmail,
            order.customerName || 'Gamer',
            order.planName,
            order.amount
          );
          console.log('Confirmation email sent to:', order.customerEmail);
        } catch (emailError) {
          console.error('Failed to send confirmation email:', emailError);
        }
      }
    } catch (error) {
      console.error('Error handling checkout completed:', error);
      throw error;
    }
  }
}
