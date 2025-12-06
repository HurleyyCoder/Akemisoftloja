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

export async function createCheckout({ planName, amount, quantity = 1, redirectUrl }: { planName: string; amount: number; quantity?: number; redirectUrl: string }) {
  const merchant = getInfinitePayMerchant();
  if (!merchant) throw new Error('INFINITEPAY_MERCHANT not configured');

  const items: InfinitePayItem[] = [
    { name: planName, price: amount, quantity },
  ];

  const url = buildCheckoutUrl(merchant, items, redirectUrl);
  return { url, items };
}

export default { createCheckout, buildCheckoutUrl, getInfinitePayPublishableKey };
