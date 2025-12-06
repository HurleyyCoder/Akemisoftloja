import createApp from '../server/app';

// Vercel sets VERCEL=1 in its environment
process.env.VERCEL = process.env.VERCEL || '1';

let appPromise: Promise<any> | null = null;

async function getApp() {
  if (!appPromise) {
    appPromise = createApp();
  }
  return appPromise;
}

export default async function handler(req: any, res: any) {
  const app = await getApp();
  // Express app is a request handler function
  return (app as any)(req, res);
}
