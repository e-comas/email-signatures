<script lang="ts">
  import Input from "./Input.svelte";

  export let user, onsubmit;

  const { Name, Title, Phone, pictureUrl, LinkedIn } = user;

  const entityOptions = [
    { value: "", label: "None" },
    { value: "Marketplace", label: "Marketplace" },
    { value: "Distribution", label: "Distribution" },
    { value: "Digital Marketing", label: "Digital Marketing" },
    { value: "Technology", label: "Technology" }
  ];
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

    <!-- Entity Dropdown with Flexbox Alignment -->
    <div style="display: flex; align-items: center; margin-bottom: 10px;">
      <label style="text-align: right; padding-right: 10px;">Entity</label>
      <select 
        bind:value={user.Entity}
        style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; min-width: 0;"
      >
        {#each entityOptions as option}
          <option value={option.value}>{option.label}</option>
        {/each}
      </select>
    </div>

    <button type="submit">Save my information</button>
  </fieldset>
</form>
