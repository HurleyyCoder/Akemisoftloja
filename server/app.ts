import express, { type Express, type Request, type Response, type NextFunction } from 'express';
import { registerRoutes } from './routes';
import { WebhookHandlers } from './webhookHandlers';

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

export function createLogger() {
  return (message: string, source = 'express') => {
    const formattedTime = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
    console.log(`${formattedTime} [${source}] ${message}`);
  };
}

export async function createApp(): Promise<Express> {
  const app = express();

  // webhook route must be registered before express.json() so raw body is available
  app.post(
    '/api/stripe/webhook/:uuid',
    express.raw({ type: 'application/json' }),
    async (req, res) => {
      const signature = req.headers['stripe-signature'];

      if (!signature) {
        return res.status(400).json({ error: 'Missing stripe-signature' });
      }

      try {
        const sig = Array.isArray(signature) ? signature[0] : signature;

        if (!Buffer.isBuffer(req.body)) {
          console.error('STRIPE WEBHOOK ERROR: req.body is not a Buffer');
          return res.status(500).json({ error: 'Webhook processing error' });
        }

        const { uuid } = req.params;
        await WebhookHandlers.processWebhook(req.body as Buffer, sig, uuid);

        res.status(200).json({ received: true });
      } catch (error: any) {
        console.error('Webhook error:', error.message || error);
        res.status(400).json({ error: 'Webhook processing error' });
      }
    },
  );

  app.use(
    express.json({
      verify: (req: any, _res, buf) => {
        req.rawBody = buf;
      },
    }),
  );

  app.use(express.urlencoded({ extended: false }));

  // simple request logging similar to previous implementation
  app.use((req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse: Record<string, any> | undefined = undefined;

    const originalResJson = res.json;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (res as any).json = function (bodyJson: any, ...args: any[]) {
      capturedJsonResponse = bodyJson;
      return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on('finish', () => {
      const duration = Date.now() - start;
      if (path.startsWith('/api')) {
        let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
        if (capturedJsonResponse) {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        }

        const log = createLogger();
        log(logLine);
      }
    });

    next();
  });

  // Register app routes (routes.ts accepts optional httpServer)
  // We don't pass httpServer here; callers (local server) may pass one separately.
  try {
    await registerRoutes(undefined as any, app);
  } catch (err) {
    console.error('Error registering routes:', err);
  }

  return app;
}

export default createApp;
