import type { SupasvelteClient } from '../index.js';
import type {
  SupabaseClient,
  GenericSchema,
  Session,
  User,
  AuthResponse,
  AuthChangeEvent
} from '../supabase.js';

import {
  writable,
  type Writable,
  derived,
  type Readable,
  get
} from 'svelte/store';

export interface SupasvelteAuthState {
  session: Session | null;
  user: User | null;
  signedIn: boolean | null;
  signedOut: boolean | null;
  error: Error | null;
}

export type SupasvelteAuthStore = Readable<SupasvelteAuthState>;

export class SupasvelteAuthClient<
  Database,
  SchemaName extends string & keyof Database,
  Schema extends GenericSchema
> {
  // clients
  private supabase: SupabaseClient<Database, SchemaName, Schema>;

  // internal stores
  private session: Writable<Session | null>;
  private user: Readable<User | null>;
  private signedIn: Readable<boolean | null>;
  private signedOut: Readable<boolean | null>;
  private error: Writable<Error | null>;

  // external store api
  public store: SupasvelteAuthStore;

  constructor(
    private supasvelte: SupasvelteClient<Database, SchemaName, Schema>
  ) {
    // clients
    this.supasvelte = supasvelte;
    this.supabase = supasvelte.supabase;
    // stores
    this.session = writable(null);
    this.error = writable(null);
    this.user = derived([this.session], ([session]) => session?.user ?? null);
    this.signedIn = derived([this.user], ([user]) => (user ? true : false));
    this.signedOut = derived([this.signedIn], ([signedIn]) => !signedIn);
    this.store = derived(
      [this.session, this.user, this.signedIn, this.signedOut, this.error],
      ([session, user, signedIn, signedOut, error]) => ({
        session,
        user,
        signedIn,
        signedOut,
        error
      })
    );
    // init
    this.sync();
    this.supabase.auth.onAuthStateChange((event: AuthChangeEvent) => {
      this.sync();
    });
  }

  // supasvelte synchronization logic

  // supasvelte stores <=> supabase API <=> supabase state
  sync() {
    this.supabase.auth.getSession().then(({ data, error }) => {
      this.session.set(data.session);
      this.error.set(error);
    });
  }

  // error handling
  catch<ResponseType extends { error: Error | null }>(
    response: ResponseType
  ): ResponseType {
    if (response.error) {
      this.error.set(response.error);
    } else {
      this.error.set(null);
    }
    return response;
  }

  // supabase method wrappers

  initialize() {
    return this.supabase.auth.initialize();
  }

  onAuthStateChange(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  async refreshSession() {
    const currentSession = get(this.session);
    if (currentSession) {
      const response = await this.supabase.auth.refreshSession(currentSession);
      return this.catch<AuthResponse>(response);
    } else {
      throw new Error('No session to refresh');
    }
  }

  get resetPasswordForEmail() {
    return this.supasvelte.query(
      (supabase) => supabase.auth.resetPasswordForEmail
    );
  }

  async setSession() {
    const currentSession = get(this.session);
    if (currentSession) {
      const response = await this.supabase.auth.setSession(currentSession);
      return this.catch<AuthResponse>(response);
    } else {
      const error = new Error('No session to set');
      this.error.set(error);
      throw error;
    }
  }
  get signInWithOAuth() {
    return this.supasvelte.query((supabase) => supabase.auth.signInWithOAuth);
  }

  get signInWithOtp() {
    return this.supasvelte.query((supabase) => supabase.auth.signInWithOtp);
  }

  get signInWithPassword() {
    return this.supasvelte.query(
      (supabase) => (creds) => supabase.auth.signInWithPassword(creds)
    );
  }

  get signOut() {
    return this.supasvelte.query((supabase) => supabase.auth.signOut);
  }

  get signUp() {
    return this.supasvelte.query(
      (supabase) => (creds) => supabase.auth.signUp(creds)
    );
  }
}
