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

    <label>
      Entity
      <select name="Entity">
        {#each entityOptions as option}
          <option 
            value={option.value} 
            selected={user.Entity === option.value}
          >
            {option.label}
          </option>
        {/each}
      </select>
    </label>

    <button type="submit">Save my information</button>
  </fieldset>
</form>