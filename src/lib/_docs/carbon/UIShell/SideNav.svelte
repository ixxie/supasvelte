<script lang="ts">
  /**
   * @event {null} open
   * @event {null} close
   * @event {null} click:overlay
   */

  /** Set to `true` to use the fixed variant */
  export let fixed = false;

  /** Set to `true` to use the rail variant */
  export let rail = false;

  /**
   * Specify the ARIA label for the nav
   * @type {string}
   */
  export let ariaLabel: string | undefined = undefined;

  /** Set to `true` to toggle the expanded state */
  export let isOpen = false;

  /**
   * The window width (px) at which the SideNav is expanded and the hamburger menu is hidden
   * 1056 represents the "large" breakpoint in pixels from the Carbon Design System:
   * small: 320
   * medium: 672
   * large: 1056
   * x-large: 1312
   * max: 1584
   */
  export let expansionBreakpoint = 1056;

  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let winWidth: undefined | number = undefined;

  $: zIndex = isOpen ? 'z-index: 6000' : '';

  $: expanded = isOpen || winWidth > expansionBreakpoint;
</script>

<svelte:window bind:innerWidth={winWidth} />

{#if !fixed}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    on:click={() => {
      dispatch('click:overlay');
      isOpen = false;
    }}
    class:bx--side-nav__overlay={true}
    class:bx--side-nav__overlay-active={isOpen}
    style:zIndex
  />
{/if}
<nav
  aria-hidden={!expanded}
  aria-label={ariaLabel}
  class:bx--side-nav__navigation={true}
  class:bx--side-nav={true}
  class:bx--side-nav--ux={true}
  class:bx--side-nav--expanded={expanded}
  class:bx--side-nav--collapsed={!expanded}
  class:bx--side-nav--rail={rail}
  class:overlay={winWidth <= expansionBreakpoint}
  {...$$restProps}
>
  <slot />
</nav>

<style>
  :global(.overlay) ~ :global(.bx--content) {
    margin-left: 0em !important;
  }
</style>
