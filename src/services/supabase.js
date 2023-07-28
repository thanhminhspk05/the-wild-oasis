import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://xepdpqripjdpupkocdui.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlcGRwcXJpcGpkcHVwa29jZHVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA0NDQ3NjEsImV4cCI6MjAwNjAyMDc2MX0.hUtahA3k1_1JR2bh8jz5a92aP8EGn5HmUzXIp42U5m0';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
