<script lang="ts">
  import {
    InlineNotification,
    Tabs,
    Tab,
    TabContent
  } from 'carbon-components-svelte';

  import AuthStatusTags from './AuthStatusTags.svelte';
  import SignIn from './SignIn.svelte';
  import SignUp from './SignUp.svelte';

  import supasvelte from '$lib/_docs/api';
</script>

<AuthStatusTags {supasvelte} />

<hr />

<p>
  {#if $supasvelte.auth.error}
    <InlineNotification
      kind="error"
      title="Error:"
      subtitle={$supasvelte.auth.error.message}
    />
  {/if}
</p>

<Tabs type="container">
  <Tab label="signin" />
  <Tab label="signup" />
  <svelte:fragment slot="content">
    <TabContent>
      <SignIn />
    </TabContent>
    <TabContent>
      <SignUp />
    </TabContent>
  </svelte:fragment>
</Tabs>
