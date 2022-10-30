<script lang="ts">
  import { HighlightSvelte, Highlight } from 'svelte-highlight';
  import pgsql from 'svelte-highlight/languages/pgsql';
  import style from 'svelte-highlight/styles/agate';

  export let code: string;
  export let schema: string | undefined = undefined;

  $: formattedCode = code.replaceAll('_docs/', '');

  import { CodeSnippet, Tabs, Tab, TabContent } from 'carbon-components-svelte';
</script>

<svelte:head>
  {@html style}
</svelte:head>

<Tabs>
  <Tab label="demo" />
  <Tab label="code" />
  {#if schema}
    <Tab label="schema" />
  {/if}
  <svelte:fragment slot="content">
    <TabContent>
      <slot />
    </TabContent>
    <TabContent>
      <CodeSnippet code={formattedCode} type="multi" expanded>
        <HighlightSvelte code={formattedCode} />
      </CodeSnippet>
    </TabContent>
    {#if schema}
      <TabContent>
        <CodeSnippet code={schema} type="multi" expanded>
          <Highlight code={schema} language={pgsql} />
        </CodeSnippet>
      </TabContent>
    {/if}
  </svelte:fragment>
</Tabs>

<style>
  :global(.bx--snippet--multi) {
    background-color: #333 !important;
  }
</style>
