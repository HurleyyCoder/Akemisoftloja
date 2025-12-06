import { createServer } from 'http';
import createApp from './app';
import { runMigrations } from 'stripe-replit-sync';
import { getStripeSync } from './stripeClient';
import { serveStatic } from './static';

export function log(message: string, source = 'express') {
  const formattedTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

async function initStripe() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.warn('DATABASE_URL not found, skipping Stripe initialization');
    return;
  }

  try {
    log('Initializing Stripe schema...', 'stripe');
    await runMigrations({
      databaseUrl,
    });
    log('Stripe schema ready', 'stripe');

    const stripeSync = await getStripeSync();

    log('Setting up managed webhook...', 'stripe');
    const webhookBaseUrl = `https://${process.env.REPLIT_DOMAINS?.split(',')[0]}`;
    const { webhook, uuid } = await stripeSync.findOrCreateManagedWebhook(
      `${webhookBaseUrl}/api/stripe/webhook`,
      {
        enabled_events: ['checkout.session.completed', 'payment_intent.succeeded'],
        description: 'AkemiSoft checkout webhook',
      },
    );
    log(`Webhook configured: ${webhook.url}`, 'stripe');

    stripeSync
      .syncBackfill()
      .then(() => {
        log('Stripe data synced', 'stripe');
      })
      .catch((err: any) => {
        console.error('Error syncing Stripe data:', err);
      });
  } catch (error) {
    console.error('Failed to initialize Stripe:', error);
  }
}

async function runLocal() {
  const app = await createApp();
  const httpServer = createServer(app as any);

  await initStripe();

  await (await import('./routes')).registerRoutes(httpServer, app);

  (app as any).use((err: any, _req: any, res: any, _next: any) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({ message });
    throw err;
  });

  if (process.env.NODE_ENV === 'production') {
    serveStatic(app);
  } else {
    const { setupVite } = await import('./vite');
    await setupVite(httpServer, app);
  }

  const port = parseInt(process.env.PORT || '5000', 10);
  httpServer.listen(
    {
      port,
      host: '0.0.0.0',
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
}

if (process.env.NODE_ENV !== 'test' && process.env.VERCEL !== '1') {
  // only run local server when executed directly (not when imported by serverless wrapper)
  runLocal().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
