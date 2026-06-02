const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tlidjpnumdiiwevqcyau.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsaWRqcG51bWRpaXdldnFjeWF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNjE0NzIsImV4cCI6MjA4MTYzNzQ3Mn0.8L9738UghIY7a8l0EZDAtwUrdlSgwdYLZlkJRyc9Pwk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  const { data, error } = await supabase.from('job_offers').select('*').limit(1);
  if (error) {
    console.error('Error fetching:', error);
  } else {
    console.log('Columns in job_offers:', Object.keys(data[0] || {}));
  }
}

main();
