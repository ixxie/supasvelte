<script lang="ts">
  import Icon from '@iconify/svelte';

  export let iconSet = 'openmoji';
  export let icon: string;
  export let color = '#353535';
</script>

<button on:click class="stone" style="background-color: {color};">
  <Icon icon="{iconSet}:{icon}" width="50px" />
</button>

<style>
  .stone {
    padding: 1em;
    border-radius: 10em;
    border-width: 0em;
    align-items: center;
    justify-content: space-between;
    display: flex;
  }
</style>
