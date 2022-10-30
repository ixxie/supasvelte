# supasvelte

A reactive API to supabase.

# core features

1. **Auth Store** - Svelte stores that reactively updates with supabase's current session and user state, and offer auth status helpers for signin state and error handling helpers.
2. **Query Store Builder** - a constructor for building stores that execute arbitrary supabase queries reactively updates a store with query results, errors and status.
3. **Realtime Store Builder** - a constructor for building stores that reactively update state in reaction to Realtime events.

# design principles

1. **Stay Svelty** - keep the library natural for idiomatic Svelte, with reactive stores represnting supabase state at the heart of the API.
2. **Thin Wrapper** - transparently expose the supabase API, allowing knowledge and docs carry over.
3. **Type Driven** - develop in TypeScript and leverage types to deliver good docs for both TS and JS users.
