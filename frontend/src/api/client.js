import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000',
});

export const fetchProducts = async () => {
  const { data } = await client.get('/api/products');
  return data.products;
};

export const fetchBundles = async (cartItems = []) => {
  const { data } = await client.post('/api/bundles/recommend', {
    cartItems,
    context: {
      channel: 'shopify-admin',
      campaign: 'black-friday',
    },
  });
  return data.bundles;
};

export const fetchInventory = async (productId) => {
  const { data } = await client.get(`/api/inventory/${productId}`);
  return data;
};

export default client;
