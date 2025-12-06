export interface InfinitePayItem {
  name: string;
  price: number; // cents
  quantity: number;
}

export function getInfinitePayMerchant() {
  return process.env.INFINITEPAY_MERCHANT || '';
}

export function getInfinitePayPublishableKey() {
  return process.env.INFINITEPAY_PUBLISHABLE_KEY || null;
}

export function buildCheckoutUrl(merchant: string, items: InfinitePayItem[], redirectUrl: string) {
  const base = `https://checkout.infinitepay.io/${encodeURIComponent(merchant)}`;
  const itemsParam = encodeURIComponent(JSON.stringify(items.map(i => ({ name: i.name, price: i.price, quantity: i.quantity }))));
  const redirectParam = encodeURIComponent(redirectUrl);
  return `${base}?items=${itemsParam}&redirect_url=${redirectParam}`;
}

export function buildAppDeepLink(opts: {
  handle: string;
  doc_number?: string;
  amount: number;
  payment_method?: 'credit' | 'debit';
  installments?: number;
  order_id: string;
  result_url: string;
  app_client_referrer?: string;
  af_force_deeplink?: 'true' | 'false';
}) {
  const params = new URLSearchParams();
  params.set('amount', String(opts.amount));
  params.set('payment_method', opts.payment_method || 'credit');
  if (opts.installments) params.set('installments', String(opts.installments));
  params.set('order_id', opts.order_id);
  params.set('result_url', encodeURIComponent(opts.result_url));
  params.set('app_client_referrer', opts.app_client_referrer || 'POCApp');
  params.set('handle', opts.handle);
  if (opts.doc_number) params.set('doc_number', opts.doc_number);
  if (opts.af_force_deeplink) params.set('af_force_deeplink', opts.af_force_deeplink);

  return `infinitepaydash://infinitetap-app?${params.toString()}`;
}

export async function createCheckout({ planName, amount, quantity = 1, redirectUrl, platform = 'web', appOptions }: { planName: string; amount: number; quantity?: number; redirectUrl: string; platform?: 'web' | 'app'; appOptions?: { handle?: string; doc_number?: string; payment_method?: 'credit' | 'debit'; installments?: number; app_client_referrer?: string; af_force_deeplink?: 'true' | 'false' }; }) {
  const merchant = getInfinitePayMerchant();
  if (!merchant) throw new Error('INFINITEPAY_MERCHANT not configured');

  if (platform === 'app') {
    const orderId = String(Date.now());
    const link = buildAppDeepLink({
      handle: appOptions?.handle || merchant,
      doc_number: appOptions?.doc_number,
      amount,
      payment_method: appOptions?.payment_method || 'credit',
      installments: appOptions?.installments || 1,
      order_id: orderId,
      result_url: redirectUrl,
      app_client_referrer: appOptions?.app_client_referrer || 'POCApp',
      af_force_deeplink: appOptions?.af_force_deeplink || 'true',
    });
    return { url: link, orderId };
  }

  const items: InfinitePayItem[] = [
    { name: planName, price: amount, quantity },
  ];

  const url = buildCheckoutUrl(merchant, items, redirectUrl);
  return { url, items };
}

export default { createCheckout, buildCheckoutUrl, buildAppDeepLink, getInfinitePayPublishableKey };
