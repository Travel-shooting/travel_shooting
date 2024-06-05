import { createClient } from "@supabase/supabase-js";

// 1) project url
const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;

// 2) anon key
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY, {
  db: { schema: "public" },
});

export default supabase;
