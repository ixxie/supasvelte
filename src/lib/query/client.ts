import { writable, derived, get } from 'svelte/store';
import type { SupabaseClient, GenericSchema } from '../supabase.js';
import type {
  QueryFunc,
  QueryTemplate,
  QueryExecutor,
  QueryStore
} from './types';

export function supasvelteQueryClient<
  Database,
  SchemaName extends string & keyof Database,
  Schema extends GenericSchema
>({
  client,
  timeout = 5000
}: {
  client: SupabaseClient<Database, SchemaName, Schema>;
  timeout?: number;
}) {
  return <Func extends QueryFunc>(
    template: QueryTemplate<Database, SchemaName, Schema, Func>
  ): QueryStore<Func> => {
    // init stores
    const response = writable<Awaited<ReturnType<Func>> | undefined>(undefined);
    const data = derived<
      typeof response,
      Awaited<ReturnType<Func>> extends { data: infer Data } ? Data : undefined
    >(response, ($response) => $response?.data);
    const internalError = writable<Error | undefined>(undefined);
    const error = derived(
      [response, internalError],
      ([$response, $internalError]) => $response?.error ?? $internalError
    );
    const active = writable<boolean>(false);
    const disabled = writable<boolean>(false);
    const state = derived(
      [response, data, error, active, disabled],
      ([$response, $data, $error, $active, $disabled]) => ({
        response: $response,
        data: $data,
        error: $error,
        active: $active,
        disabled: $disabled
      })
    );
    // create query func from template
    const func = template(client);
    // create query store from func
    const store: QueryStore<Func> = (...args: Parameters<Func>) => {
      // don't execute if already active
      if (get(active) || get(disabled)) {
        return;
      }
      // set store values
      internalError.set(undefined);
      response.set(undefined);
      active.set(true);
      const executor = () => func(...args);
      // execute the function and sync stores
      timed(executor, timeout)
        .then((res) => {
          response.set(res);
          active.set(false);
        })
        .catch((err) => {
          internalError.set(err);
          active.set(false);
        });
    };
    store.subscribe = state.subscribe;
    return store;
  };
}

function timed<Func extends QueryFunc>(
  executor: QueryExecutor<Func>,
  timeout: number = 1000
) {
  return new Promise<Awaited<ReturnType<Func>>>(async (resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('timed out'));
    }, timeout);
    try {
      const response = await executor();
      resolve(response);
    } catch (error) {
      reject(error);
    } finally {
      clearTimeout(timer);
    }
  });
}
