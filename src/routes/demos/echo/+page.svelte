<script lang="ts">
  import Code from '$lib/_docs/carbon/Code.svelte';
  import Echo from './Echo.svelte';

  import code from './Echo.svelte?raw';
  import schema from './echo.sql?raw';
</script>

<div style="margin-bottom: 2em">
  <h1>query store on an rpc with a delay</h1>
  <p>
    We initialize a supasvelte query store which calls a postgres function
    through supabase's rpc method. Data and errors are reactively rendered
  </p>
</div>
<Code {code} {schema}>
  <Echo />
</Code>
