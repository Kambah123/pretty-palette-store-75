// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://gylxwukqytuzlcyjutrq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5bHh3dWtxeXR1emxjeWp1dHJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTExMjQsImV4cCI6MjA2NjE4NzEyNH0.zDBiEAc1h6-RCGYA7Ot2uvSa4CRuUkoBMjkw2O86z9k";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);