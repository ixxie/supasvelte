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

  const signup = supasvelte.auth.signUp;
</script>

<h2 style="margin-bottom: 0.5em;">sign up</h2>

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
      signup({ email, password });
    }}
  >
    sign up
  </Button>
</Form>
{#if $signup.active}
  <InlineLoading
    status="active"
    description="Hold on while we sign you in..."
  />
{/if}

<hr />

<StatusTags label="signup" store={signup} />

{#if $signup.error}
  <InlineNotification
    kind="error"
    title="signup error:"
    subtitle={$signup.error?.message}
  />
{/if}
