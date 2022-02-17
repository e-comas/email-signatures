<script lang="ts">
  import Input from "./Input.svelte";

  export let user, onsubmit;

  const { Name, Title, Phone, pictureUrl, LinkedIn } = user;
</script>

<form on:submit={onsubmit}>
  <fieldset>
    <legend>Personal information</legend>
    <Input name="Name" value={Name} required={true} autocomplete="name" />
    <Input
      name="Title"
      value={Title}
      autocomplete="organization-title"
      autofocus={true}
      required={true}
    />
    <Input
      name="Phone"
      value={Phone}
      type="phone"
      placeholder="International phone number (optional)"
    />
    <Input name="pictureUrl" value={pictureUrl} type="hidden" />
    <Input
      name="LinkedIn"
      value={LinkedIn}
      type="url"
      placeholder="Public URL to your LinkedIn profile (optional)"
    />
    <button type="submit">Save my information</button>
  </fieldset>
</form>
