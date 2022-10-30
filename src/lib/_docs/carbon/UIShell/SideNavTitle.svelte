<script>
  import SideNavLink from './SideNavLink.svelte';
  /**
   * Specify the text
   * @type {string}
   */
  export let text = undefined;

  /**
   * Specify the icon to render
   * @type {typeof import("svelte").SvelteComponent}
   */
  export let icon = undefined;

  /** Obtain a reference to the HTML anchor element */
  export let ref = null;
</script>

<SideNavLink {icon} bind:ref>
  <span style="font-weight: normal; font-variant: small-caps;">
    {text.toLowerCase()}
  </span>
</SideNavLink>
