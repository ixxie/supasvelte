<script lang="ts">
  import {
    Button,
    Form,
    FormGroup,
    InlineLoading,
    PasswordInput,
    TextInput,
    InlineNotification
  } from 'carbon-components-svelte';

  import supasvelte from '$lib/_docs/api';
  import StatusTags from '$lib/_docs/StatusTags.svelte';

  let email: string;
  let password: string;

  const signin = supasvelte.auth.signInWithPassword;
</script>

<h2 style="margin-bottom: 0.5em;">sign in</h2>

<Form on:submit>
  <FormGroup>
    <TextInput
      bind:value={email}
      labelText="email"
      placeholder="enter your email..."
    />
    <PasswordInput
      bind:value={password}
      labelText="password"
      placeholder="enter your password..."
    />
  </FormGroup>
  <Button
    type="submit"
    on:click={() => {
      signin({ email, password });
    }}
  >
    sign in
  </Button>
</Form>
{#if $signin.active}
  <InlineLoading
    status="active"
    description="Hold on while we sign you in..."
  />
{/if}

<hr />

<StatusTags label="signin" store={signin} />

{#if $signin.error}
  <InlineNotification
    kind="error"
    title="signin error:"
    subtitle={$signin.error?.message}
  />
{/if}
