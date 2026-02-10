import { createClient } from '@supabase/supabase-js';
import { DiaryLog } from '../types';

// NOTE: These environment variables need to be set in your Vercel/Project settings.
// For this demo, if keys are missing, we will return an empty array so the UI shows the placeholder text.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

/**
 * Fetches the latest 10 diary entries.
 */
export const fetchRecentLogs = async (): Promise<DiaryLog[]> => {
  if (!supabase) {
    console.warn("Supabase not configured. Returning empty list.");
    return [];
  }

  const { data, error } = await supabase
    .from('diaries')
    .select('id, created_at, content, emotions')
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching logs:", error);
    throw error;
  }

  return data as DiaryLog[];
};

/**
 * Fetches ALL diary entries for download.
 */
export const fetchAllLogs = async (): Promise<DiaryLog[]> => {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('diaries')
    .select('id, created_at, content, emotions')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching all logs:", error);
    throw error;
  }

  return data as DiaryLog[];
};
