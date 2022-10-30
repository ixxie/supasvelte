import type { SupabaseClient, GenericSchema } from '../supabase.js';
import type { Readable } from 'svelte/store';

export interface QueryState<Func extends QueryFunc> {
  response?: Awaited<ReturnType<Func>>; // => show full response
  data?: Awaited<ReturnType<Func>> extends { data: infer Data }
    ? Data
    : undefined; // => show response data
  error?: Awaited<ReturnType<Func>> extends { error: infer Err }
    ? Err
    : undefined; // => show response error
  active: boolean; // => show spinner
  disabled: boolean; // => disable execution
}

export type QueryStore<Func extends QueryFunc> = Readable<QueryState<Func>> & {
  (...args: Parameters<Func>): void;
};

export type QueryTemplate<
  Database,
  SchemaName extends string & keyof Database,
  Schema extends GenericSchema,
  Func extends QueryFunc
> = (client: SupabaseClient<Database, SchemaName, Schema>) => Func;

export type QueryFunc = (...args: any[]) => PromiseLike<any>;

export type QueryExecutor<Func extends QueryFunc> = () => ReturnType<Func>;
