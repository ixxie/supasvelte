<script>
  import { InlineNotification } from 'carbon-components-svelte';
  import OperationalEfficiency from 'carbon-pictograms-svelte/lib/OperationalEfficiency.svelte';
</script>

<OperationalEfficiency fill="#333" class="splash" />

<h1 style="margin-bottom: 0em !important;">supasvelte</h1>
<h4 style="font-weight: bold; margin-top: 0em !important;">
  a reactive supabase client for svelte
</h4>

<p>motivation, comparisons, etc.</p>

<InlineNotification
  kind="warning"
  title="Prototype:"
  subtitle="the API is stabilizing, but has not yet been tested in production; use at your own risk."
  hideCloseButton
/>

<h2>features</h2>

<p>api overview</p>

<h2>design</h2>

<p>principles</p>

<h2>roadmap</h2>

<h4>phase I - mvp release</h4>
<p>✅ website</p>
<p>✅ query client</p>
<p>⬛ auth client</p>
<p>⬛ check generated types</p>
<p>⬛ api documentation</p>
<p>⬛ npm publication</p>
<p>⬛ netlify deployment</p>

<h4>phase II - later</h4>
<p>⬛ realtime changes</p>
<p>⬛ realtime presence</p>
<p>⬛ realtime broadcast</p>
<p>⬛ typedocs</p>
