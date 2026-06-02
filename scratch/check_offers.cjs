const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tlidjpnumdiiwevqcyau.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsaWRqcG51bWRpaXdldnFjeWF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNjE0NzIsImV4cCI6MjA4MTYzNzQ3Mn0.8L9738UghIY7a8l0EZDAtwUrdlSgwdYLZlkJRyc9Pwk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  const { data, error } = await supabase.from('job_offers').select('*');
  if (error) {
    console.error('Error fetching job offers:', error);
  } else {
    console.log('Current job offers in DB:', JSON.stringify(data, null, 2));
  }
}

main();
