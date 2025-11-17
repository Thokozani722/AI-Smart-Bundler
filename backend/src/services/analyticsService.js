import { supabase } from '../config/supabase.js';

export const logBundleEvent = async ({ type, payload }) => {
  if (!supabase) {
    console.warn('[analytics] Supabase not configured. Event:', type, payload);
    return { success: false, message: 'Supabase not configured' };
  }

  const { error } = await supabase.from('bundle_events').insert({
    type,
    payload,
  });

  if (error) {
    console.error('[analytics] Failed to persist event', error.message);
    return { success: false, message: error.message };
  }

  return { success: true };
};
