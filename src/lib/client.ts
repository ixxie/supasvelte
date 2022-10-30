import {
  SupasvelteAuthClient,
  type SupasvelteAuthState
} from './auth/client.js';

import { supasvelteQueryClient } from './query/index.js';

import {
  createClient as createSupabaseClient,
  createKitClient,
  SupabaseClient,
  type SupabaseClientOptions,
  type GenericSchema
} from './supabase.js';

import { derived, type Readable } from 'svelte/store';

export interface SupasvelteState {
  auth: SupasvelteAuthState;
}

export type SupasvelteStore = Readable<SupasvelteState>;

export class SupasvelteClient<
  Database = any,
  SchemaName extends string & keyof Database = 'public' extends keyof Database
    ? 'public'
    : string & keyof Database,
  Schema extends GenericSchema = Database[SchemaName] extends GenericSchema
    ? Database[SchemaName]
    : any
> {
  supabase: SupabaseClient<Database, SchemaName, Schema>;
  auth: SupasvelteAuthClient<Database, SchemaName, Schema>;
  query: ReturnType<typeof supasvelteQueryClient<Database, SchemaName, Schema>>;
  // unified public store
  private store: SupasvelteStore;
  subscribe: SupasvelteStore['subscribe'];

  constructor(supabase: SupabaseClient<Database, SchemaName, Schema>) {
    this.supabase = supabase;
    // create the supasvelte query utility
    this.query = supasvelteQueryClient<Database, SchemaName, Schema>({
      client: this.supabase
    });
    // create the supasvelte store
    this.auth = new SupasvelteAuthClient<Database, SchemaName, Schema>(this);
    this.store = derived([this.auth.store], ([auth]) => ({ auth }));
    this.subscribe = this.store.subscribe;
  }
}

export const createClient = <
  Database = any,
  SchemaName extends string & keyof Database = 'public' extends keyof Database
    ? 'public'
    : string & keyof Database,
  Schema extends GenericSchema = Database[SchemaName] extends GenericSchema
    ? Database[SchemaName]
    : any
>(
  supabaseUrl: string,
  supabaseKey: string,
  options?: SupabaseClientOptions<SchemaName>,
  kit: boolean = false
) => {
  const supabase = createSupabaseClient<Database, SchemaName, Schema>(
    supabaseUrl,
    supabaseKey,
    options
  );
  return new SupasvelteClient<Database, SchemaName, Schema>(supabase);
};
