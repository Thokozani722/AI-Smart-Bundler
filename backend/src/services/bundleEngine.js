import OpenAI from 'openai';
import { products } from '../data/products.js';

const openaiClient = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const DEFAULT_MAX_ITEMS_PER_BUNDLE = 3;

const inventoryMap = products.reduce((acc, product) => {
  acc[product.id] = product.inventory;
  return acc;
}, {});

const getProduct = (productId) => products.find((p) => p.id === productId);

const scoreBundle = (bundle) => {
  const diversityScore = new Set(bundle.items.flatMap((item) => item.tags)).size;
  const inventoryScore = bundle.items.reduce((score, item) => {
    const inventory = inventoryMap[item.id] || 0;
    return score + Math.min(inventory / 100, 1);
  }, 0);
  const price = bundle.items.reduce((total, item) => total + item.price, 0);
  const priceScore = price >= 100 ? 1 : price / 100;

  return Number(((diversityScore * 0.4) + (inventoryScore * 0.3) + (priceScore * 0.3)).toFixed(2));
};

const buildHeuristicBundles = (cartItems = []) => {
  const cartProductIds = new Set(cartItems.map((item) => item.productId));

  const heroProductId = cartItems.length
    ? cartItems.reduce((top, curr) => (curr.quantity > (top.quantity || 0) ? curr : top), {}).productId
    : products[0].id;

  const heroProduct = getProduct(heroProductId) || products[0];

  const complementary = products.filter((product) => {
    if (product.id === heroProduct.id) return false;
    if (cartProductIds.has(product.id)) return false;
    return product.tags.some((tag) => heroProduct.tags.includes(tag));
  });

  const upsell = products.filter((product) => product.price > heroProduct.price && product.id !== heroProduct.id);

  const staple = products.filter((product) => product.tags.includes('accessories'));

  const sampleBundles = [
    {
      id: 'bundle-complementary',
      title: `${heroProduct.title} + Essentials`,
      description: 'Complements cart hero product with frequently bought items.',
      items: [heroProduct, ...complementary.slice(0, DEFAULT_MAX_ITEMS_PER_BUNDLE - 1)],
    },
    {
      id: 'bundle-upsell',
      title: 'Premium Performance Fit',
      description: 'Elevate AOV with a curated mix of premium pieces.',
      items: [heroProduct, ...upsell.slice(0, DEFAULT_MAX_ITEMS_PER_BUNDLE - 1)],
    },
    {
      id: 'bundle-staple',
      title: 'Stock Up Staples',
      description: 'High-converting accessories with healthy inventory.',
      items: staple.slice(0, DEFAULT_MAX_ITEMS_PER_BUNDLE),
    }
  ].filter((bundle) => bundle.items.length >= 2);

  return sampleBundles.map((bundle) => ({
    ...bundle,
    score: scoreBundle(bundle),
    total: bundle.items.reduce((sum, item) => sum + item.price, 0),
    savingsSuggestion: '$15 off when purchased together',
  }));
};

const getAIInsight = async (bundleSummary) => {
  if (!openaiClient) {
    return 'Use AI mode by setting OPENAI_API_KEY to unlock contextual messaging.';
  }

  const response = await openaiClient.responses.create({
    model: 'gpt-4.1-mini',
    input: `Generate a punchy, 1-sentence marketing hook for this Shopify bundle: ${bundleSummary}`,
    max_output_tokens: 60,
  });

  return response.output?.[0]?.content?.[0]?.text ?? 'Fresh drop — perfect pairing for Black Friday!';
};

export const recommendBundles = async (cartItems = []) => {
  const heuristicBundles = buildHeuristicBundles(cartItems);

  const bundlesWithInsights = await Promise.all(
    heuristicBundles.map(async (bundle) => ({
      ...bundle,
      aiInsight: await getAIInsight(
        `${bundle.title} containing ${bundle.items.map((item) => item.title).join(', ')}`
      ),
    }))
  );

  return bundlesWithInsights
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
};

export const checkInventoryLevels = (productId) => {
  const product = getProduct(productId);
  if (!product) {
    return { productId, status: 'unknown', inventory: 0 };
  }

  const inventory = inventoryMap[product.id];
  let status = 'healthy';
  if (inventory < 15) status = 'critical';
  else if (inventory < 40) status = 'watch';

  return { productId, status, inventory };
};
