<script lang="ts">
  import Input from "./Input.svelte";

  export let user, onsubmit;

  const { Name, Title, Phone, pictureUrl } = user;
  const { Facebook, Medium, LinkedIn, Twitter, YouTube } = user.url || {};
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
      name="url.Facebook"
      value={Facebook}
      type="url"
      placeholder="Public URL to your Facebook profile (optional)"
    />
    <Input
      name="url.LinkedIn"
      value={LinkedIn}
      type="url"
      placeholder="Public URL to your LinkedIn profile (optional)"
    />
    <Input
      name="url.Medium"
      value={Medium}
      type="url"
      placeholder="Public URL to your Medium profile (optional)"
    />
    <Input
      name="url.Twitter"
      value={Twitter}
      type="url"
      placeholder="Public URL to your Twitter profile (optional)"
    />
    <Input
      name="url.YouTube"
      value={YouTube}
      type="url"
      placeholder="Public URL to your YouTube channel (optional)"
    />
    <button type="submit">Save my information</button>
  </fieldset>
</form>
