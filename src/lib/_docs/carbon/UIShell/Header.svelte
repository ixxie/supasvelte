<script>
  /** Set to `true` to open the side nav */
  export let isSideNavOpen = false;

  /**
   * Specify the ARIA label for the header
   * @type {string}
   */
  export let uiShellAriaLabel = undefined;

  /**
   * Specify the `href` attribute
   * @type {string}
   */
  export let href = undefined;

  /**
   * Specify the company name
   * @type {string}
   */
  export let company = undefined;

  /**
   * Specify the platform name
   * Alternatively, use the named slot "platform" (e.g., <span slot="platform">...</span>)
   */
  export let platformName = '';

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

  /** Obtain a reference to the HTML anchor element */
  export let ref = null;

  /**
   * Specify the icon to render for the closed state.
   * Defaults to `<Menu size={20} />`
   * @type {typeof import("svelte").SvelteComponent}
   */
  export let iconMenu = Menu;

  /**
   * Specify the icon to render for the opened state.
   * Defaults to `<Close size={20} />`
   * @type {typeof import("svelte").SvelteComponent}
   */
  export let iconClose = Close;

  import Close from './icons/Close.svelte';
  import Menu from './icons/Menu.svelte';
  import HamburgerMenu from './HamburgerMenu.svelte';

  let winWidth = undefined;

  $: isSmall = winWidth < expansionBreakpoint;

  isSideNavOpen = isSmall ? false : true;

  $: ariaLabel = company
    ? `${company} `
    : '' + (uiShellAriaLabel || $$props['aria-label'] || platformName);
</script>

<svelte:window bind:innerWidth={winWidth} />

<header aria-label={ariaLabel} class:bx--header={true}>
  <slot name="skip-to-content" />
  {#if isSmall}
    <HamburgerMenu bind:isOpen={isSideNavOpen} {iconClose} {iconMenu} />
  {/if}
  <a
    {href}
    class:bx--header__name={true}
    bind:this={ref}
    {...$$restProps}
    on:click
  >
    {#if company}
      <span class:bx--header__name--prefix={true}>{company}&nbsp;</span>
    {/if}
    <slot name="platform">{platformName}</slot>
  </a>
  <slot />
</header>
