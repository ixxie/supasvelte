<script lang="ts">
  import type { SupasvelteStore } from '$lib';
  import { Tag } from 'carbon-components-svelte';
  import {
    Hourglass,
    RadioButton,
    DocumentBlank,
    Error,
    User,
    IbmCloudKeyProtect,
    CloseOutline,
    CheckmarkOutline
  } from 'carbon-icons-svelte';

  export let supasvelte: Supasveltesupasvelte;
</script>

<div>
  <span>
    <code>auth</code> state
  </span>
  <Tag
    type={$supasvelte.auth.signedIn ? 'green' : 'gray'}
    icon={$supasvelte.auth.signedIn ? CheckmarkOutline : RadioButton}
  >
    signedIn: {$supasvelte.auth.signedIn}
  </Tag>
  <Tag
    type={$supasvelte.auth.signedOut ? 'magenta' : 'gray'}
    icon={$supasvelte.auth.signedOut ? CloseOutline : RadioButton}
  >
    signedOut: {$supasvelte.auth.signedOut}
  </Tag>
  <Tag
    type={$supasvelte.auth.session ? 'blue' : 'gray'}
    icon={$supasvelte.auth.session ? IbmCloudKeyProtect : RadioButton}
  >
    session: {$supasvelte.auth.session}
  </Tag>
  <Tag
    type={$supasvelte.auth.user ? 'blue' : 'gray'}
    icon={$supasvelte.auth.user ? User : RadioButton}
  >
    user: {$supasvelte.auth.user}
  </Tag>
  <Tag
    type={$supasvelte.auth.error ? 'red' : 'gray'}
    icon={$supasvelte.auth.error ? Error : RadioButton}
  >
    error: {$supasvelte.auth.error?.message}
  </Tag>
</div>

<style>
  div {
    background-color: #333;
    padding: 0.5em 1em;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5em;
    margin: 1em 0em;
  }

  span {
    font-weight: 500;
    color: #999;
  }
</style>
