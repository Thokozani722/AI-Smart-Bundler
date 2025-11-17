import { Router } from 'express';
import { recommendBundles } from '../services/bundleEngine.js';
import { logBundleEvent } from '../services/analyticsService.js';

const router = Router();

router.post('/recommend', async (req, res) => {
  try {
    const { cartItems = [], context = {} } = req.body;
    const bundles = await recommendBundles(cartItems);

    logBundleEvent({
      type: 'bundle_recommended',
      payload: {
        cartItems,
        bundles,
        context,
      },
    }).catch((error) => {
      console.error('Failed to log bundle event', error.message);
    });

    res.json({ bundles });
  } catch (error) {
    console.error('Failed to recommend bundles', error);
    res.status(500).json({ message: 'Unable to generate bundle recommendations' });
  }
});

router.post('/feedback', async (req, res) => {
  const { bundleId, action = 'view', metadata = {} } = req.body;

  try {
    await logBundleEvent({
      type: 'bundle_feedback',
      payload: { bundleId, action, metadata },
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Unable to persist feedback' });
  }
});

export default router;
