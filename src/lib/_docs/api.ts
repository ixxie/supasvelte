import { createClient } from '$lib/index.js';
import { env } from '$env/dynamic/public';

const supabaseUrl: string = env.PUBLIC_SUPABASE_URL!;
const supabaseAnonKey: string = env.PUBLIC_SUPABASE_ANON_KEY!;

export default createClient(supabaseUrl, supabaseAnonKey);
