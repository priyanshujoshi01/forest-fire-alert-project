// src/services/supabase.js
import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase project URL and anon key
const SUPABASE_URL = 'https://ayfnurkwcuwzyvtttyot.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5Zm51cmt3Y3V3enl2dHR0eW90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4MjE3NjcsImV4cCI6MjA0MDM5Nzc2N30.lDiOw9WAfRLWMJbgr6-Eng-qj_Y2Aa-LFKIk3cO3aHY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
