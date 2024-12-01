// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wmefnoibbmlqmfkkcdxi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtZWZub2liYm1scW1ma2tjZHhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwMzk2OTcsImV4cCI6MjA0ODYxNTY5N30.PEgUTNsigtbqaT_ESmDvmBNj-BpZC21ftd_iO5j3-UI";

export const supabase = createClient(supabaseUrl, supabaseKey);
