import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products.js';
import bundlesRouter from './routes/bundles.js';
import inventoryRouter from './routes/inventory.js';
import healthRouter from './routes/health.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/bundles', bundlesRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/health', healthRouter);

app.get('/', (_req, res) => {
  res.json({ message: 'AI Smart Bundler backend is running' });
});

export default app;
