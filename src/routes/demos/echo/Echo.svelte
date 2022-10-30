<script lang="ts">
  import {
    FormGroup,
    TextInput,
    NumberInput,
    InlineLoading,
    InlineNotification,
    Button
  } from 'carbon-components-svelte';
  import supasvelte from '$lib/_docs/api.js';

  import StatusTags from '$lib/_docs/StatusTags.svelte';

  let phrase: string;
  let delay: number = 0;

  const echo = supasvelte.query(
    (supabase) => (phrase: string, delay: number) => {
      if (phrase.length > 10) {
        throw new Error('phrase is too long!');
      }
      return supabase.rpc('echo', { phrase, delay });
    }
  );
</script>

<h3>Input</h3>
<p>
  The phrase will be echoed by a database function after the delay. Trigger a
  format error with text over 10 characters, or a timeout error with a delay
  over 5 seconds.
</p>
<FormGroup>
  <TextInput
    bind:value={phrase}
    labelText="phrase"
    placeholder="enter a phrase"
  />
  <NumberInput
    bind:value={delay}
    label="delay"
    min={0}
    placeholder="enter a delay in seconds..."
  />
</FormGroup>

<Button on:click={() => echo(phrase, delay)}>echo</Button>

<hr />

<h3>Output</h3>

<StatusTags label="$echo" store={echo} />

{#if $echo.active}
  <p>
    <InlineLoading
      status="active"
      description="Sound travels slowly across the void..."
    />
  </p>
{:else}
  {#if $echo.data}
    <p>
      <InlineNotification
        kind="success"
        title="Data:"
        subtitle={$echo.data}
        hideCloseButton
      />
    </p>
  {/if}
  {#if $echo.error}
    <p>
      <InlineNotification
        kind="error"
        title="Error:"
        subtitle={$echo.error.message}
        hideCloseButton
      />
    </p>
  {/if}
{/if}
