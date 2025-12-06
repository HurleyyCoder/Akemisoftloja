import serverless from 'serverless-http';
import createApp from '../server/app';

// Vercel sets VERCEL=1 in its environment
process.env.VERCEL = process.env.VERCEL || '1';

let _handler: any = null;

export default async function handler(req: any, res: any) {
  if (!_handler) {
    const app = await createApp();
    // register routes without http server (routes.ts accepts optional httpServer)
    _handler = serverless(app as any);
  }
  return _handler(req, res);
}
