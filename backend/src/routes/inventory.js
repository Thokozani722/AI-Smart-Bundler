import { Router } from 'express';
import { checkInventoryLevels } from '../services/bundleEngine.js';

const router = Router();

router.get('/:productId', (req, res) => {
  const { productId } = req.params;
  const inventory = checkInventoryLevels(productId);
  res.json(inventory);
});

export default router;
