<script>
  // CARBON

  // components
  import { Content, Grid, Row, Column } from 'carbon-components-svelte';

  import {
    Header,
    HeaderUtilities,
    HeaderAction,
    HeaderActionLink,
    HeaderNav,
    HeaderPanelLinks,
    HeaderPanelLink,
    SideNav,
    SideNavItems,
    SideNavLink,
    SideNavTitle,
    SideNavDivider
  } from '$lib/_docs/carbon';

  // icons
  import UserAvatarFilledAlt from 'carbon-icons-svelte/lib/UserAvatarFilledAlt.svelte';
  import LogoGithub from 'carbon-icons-svelte/lib/LogoGithub.svelte';
  import Lightning from 'carbon-icons-svelte/lib/Lightning.svelte';

  import Theme from './Theme.svelte';

  // SUPABASE
  import supasvelte from '$lib/_docs/api';

  let isSideNavOpen = true;
  let userPanelIsOpen = false;
</script>

<Theme />

<Header href="/" bind:isSideNavOpen>
  <span
    slot="platform"
    class="platform-name"
    style="display: flex; align-items: center; ;"
  >
    supasvelte &nbsp;<Lightning />
  </span>
  <HeaderNav />
  <HeaderUtilities>
    <HeaderActionLink
      icon={LogoGithub}
      href="https://github.com/seedling-life/supasvelte"
      target="_blank"
    />
    <HeaderAction
      bind:isOpen={userPanelIsOpen}
      icon={UserAvatarFilledAlt}
      closeIcon={UserAvatarFilledAlt}
    >
      {#if $supasvelte.auth.signedIn}
        <HeaderPanelLinks>
          <HeaderPanelLink>
            {$supasvelte.auth.user?.email}
          </HeaderPanelLink>
          <HeaderPanelLink
            on:click={() => {
              console.log('signout');
            }}>sign out</HeaderPanelLink
          >
          <HeaderPanelLink>Delete my account</HeaderPanelLink>
        </HeaderPanelLinks>
      {:else}
        <HeaderPanelLinks>
          <HeaderPanelLink>sign up</HeaderPanelLink>
          <HeaderPanelLink
            on:click={() => {
              console.log('signin');
            }}>sign in</HeaderPanelLink
          >
          <HeaderPanelLink>Delete my account</HeaderPanelLink>
        </HeaderPanelLinks>
      {/if}
    </HeaderAction>
  </HeaderUtilities>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    <SideNavLink text="Overview" href="/" />
    <SideNavLink text="Quick Start" href="/quickstart" />
    <SideNavDivider />
    <SideNavTitle text="API" />
    <SideNavLink text="Auth" href="/api/auth" />
    <SideNavLink text="Query" href="/api/query" />
    <SideNavDivider />
    <SideNavTitle text="examples" />
    <SideNavLink text="Echo" href="/demos/echo" />
    <SideNavLink text="Login" href="/demos/login" />
  </SideNavItems>
</SideNav>

<Content>
  <Grid fullWidth>
    <Row>
      <Column sm={0} md={3} />
      <Column sm={10} md={6}>
        <slot />
      </Column>
      <Column sm={0} md={3} />
    </Row>
  </Grid>
</Content>

<style>
  :global(a.bx--header__name) {
    padding: 0 1rem 0 1rem !important;
  }
</style>
