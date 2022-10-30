<script lang="ts">
  import type { QueryStore } from '$lib/query';
  import { Tag } from 'carbon-components-svelte';
  import {
    Hourglass,
    RadioButton,
    DocumentBlank,
    Error
  } from 'carbon-icons-svelte';

  export let store: QueryStore<any>;
  export let label: string;
</script>

<div>
  <span>
    <code>{label}</code> state
  </span>
  <Tag
    type={$store.active ? 'purple' : 'gray'}
    icon={$store.active ? Hourglass : RadioButton}
  >
    active: {$store.active}
  </Tag>
  <Tag
    type={$store.data ? 'green' : 'gray'}
    icon={$store.data ? DocumentBlank : RadioButton}
  >
    data: {$store.data}
  </Tag>
  <Tag
    type={$store.error ? 'red' : 'gray'}
    icon={$store.error ? Error : RadioButton}
  >
    error: {$store.error?.message}
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
  }
  span {
    font-weight: 500;
    color: #999;
  }
</style>
