<script lang="ts">
  import 'carbon-components-svelte/css/all.css';

  import { Theme } from 'carbon-components-svelte';
</script>

<Theme theme="g90" />

<style>
  /** Colors */

  :global(:root) {
    --supabase90: #0a291b;
    --supabase80: #145236;
    --supabase70: #1f7b51;
    --supabase60: #29a36c;
    --supabase50: #33cc87;
    --supabase40: #5cd69f;
    --supabase30: #85e0b7;

    --cds-interactive-01: var(--supabase60) !important;
    --cds-interactive-04: var(--supabase50) !important;
    --cds-inverse-focus-ui: var(--supabase60) !important;

    --cds-hover-primary: var(--supabase50) !important;
    --cds-active-primary: var(--supabase80) !important;
    --cds-hover-primary-text: var(--supabase30) !important;

    --cds-link-01: var(--supabase40) !important;
    --cds-link-02: var(--supabase30) !important;
    --cds-link-inverse: var(--supabase60) !important;
    --cds-inverse-link: var(--supabase60) !important;
    --cds-visited-link: #be94ff !important;
    --cds-link-visited: #be95ff !important;

    --cds-highlight: var(--supabase70) !important;
    --cds-background-brand: var(--supabase60) !important;
    --cds-border-interactive: var(--supabase50) !important;
    --cds-button-primary: var(--supabase60) !important;
    --cds-button-primary-hover: var(--supabase50) !important;
    --cds-button-primary-active: var(--supabase80) !important;
    --cds-focus-inverse: var(--supabase60) !important;
    --cds-brand-01: var(--supabase60) !important;
  }

  /** Pictogram classes */

  :global(svg.splash) {
    width: 500px;
    height: auto;
    position: fixed;
    z-index: -100;
    right: 0;
    top: 30;
    margin-right: 2em;
  }

  /** UI Shell Overrides */

  :global(.bx--header) {
    background: #262626;
  }

  :global(.bx--header-panel) {
    background: #262626;
  }

  :global(.bx--side-nav) {
    background-color: #262626 !important;
    border-right: 1px solid #393939;
  }

  :global(.bx--side-nav) :global(*) {
    color: white !important;
  }

  :global(.bx--side-nav__divider) {
    height: 1px;
    margin: var(--cds-spacing-03, 0.5rem) var(--cds-spacing-05, 1rem);
    background-color: #393939;
  }

  :global(.bx--side-nav__link:hover) {
    background-color: #393939 !important;
  }

  /** Spacing */

  :global(h1, h2, h3, h4, h5, h6) {
    margin-top: 0.5em !important;
    margin-bottom: 0.5em !important;
  }

  :global(hr) {
    margin: 2em 0em;
  }
</style>
