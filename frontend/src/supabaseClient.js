import { createClient } from '@supabase/supabase-js';

// Connect to Supabase using keys from .env
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default supabase;
