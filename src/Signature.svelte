<script lang="ts">
  import format from "@aduh95/format-phone-number";

  export let user;
  export let emailAddress;

  const companyAddress =
    "e-Comas Sarl, 68 Avenue de la Liberté, 1930 Luxembourg";

  const {
    Name,
    Title,
    Phone,
    url: { Medium, LinkedIn, YouTube },
  } = user;

  const beautifulPhone = Phone ? format(Phone) : Promise.resolve();
</script>

{#await beautifulPhone}
  <p>loading...</p>
{:then beautifulPhone}
  <table
    style="width: 525px; font-size: 11pt; font-family: Arial, sans-serif;"
    cellpadding="0"
    cellspacing="0"
  >
    <tbody>
      <tr>
        <td
          style="font-size: 10pt; font-family: Arial, sans-serif; padding-right: 5px; vertical-align: top;"
          valign="top"
        >
          <img
            border="0"
            alt={`${Name}'s picture`}
            width={{ IMG_WIDTH }}
            height={{ IMG_HEIGHT }}
            style="border:0;"
            src={imgUrl}
          />
        </td>

        <td style="padding-left:5px">
          <table cellpadding="0" cellspacing="0">
            <tbody>
              <tr>
                <td
                  style="font-size: 10pt; font-family: Arial, sans-serif; width: 400px; padding-bottom: 5px; padding-left: 10px; vertical-align: top;"
                  valign="top"
                >
                  <strong
                    ><span
                      style="font-size: 11pt; font-family: Arial, sans-serif; color:#51bf9d;"
                      >{Name}</span
                    ></strong
                  >
                </td>
              </tr>
              <tr>
                <td
                  style="font-size: 10pt; font-family: Arial, sans-serif; width: 400px; padding-bottom: 5px; padding-left: 10px; vertical-align: top; text-decoration:none !important"
                  valign="top"
                >
                  <strong
                    style="font-family: Arial, sans-serif; font-size:11pt; color:#000000;"
                    >{Title}</strong
                  >
                </td>
              </tr>
              <tr>
                <td
                  style="font-size: 10pt; font-family: Arial, sans-serif; width: 400px; padding-bottom: 5px; padding-left: 10px; vertical-align: top; text-decoration:none !important"
                  valign="top"
                >
                  <a
                    href={`mailto:${emailAddress}`}
                    target="_blank"
                    style="text-decoration: none; color: #000000"
                    >{emailAddress}</a
                  >
                </td>
              </tr>
              {#if beautifulPhone}
                <tr>
                  <td
                    style="font-size: 10pt; font-family: Arial, sans-serif; width: 400px; padding-bottom: 5px; padding-left: 10px; vertical-align: top; text-decoration:none !important"
                    valign="top"
                  >
                    <a
                      href={`tel:${Phone}`}
                      target="_blank"
                      style="text-decoration: none; color: #000000"
                      >{beautifulPhone.replace(/\S/g, "&nbsp;")}</a
                    >
                  </td>
                </tr>
              {/if}
              <tr>
                <td
                  style="font-size: 10pt; font-family: Arial, sans-serif; width: 400px; padding-bottom: 5px; padding-left: 10px; vertical-align: top; text-decoration:none !important"
                  valign="top"
                >
                  <span
                    style="font-family: Arial, sans-serif; font-size:10pt; color:#000000;"
                  >
                    <span>{companyAddress}</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <table
    style="width: 525px; font-size: 11pt; font-family: Arial, sans-serif;"
    cellpadding="0"
    cellspacing="0"
  >
    <tbody>
      <tr>
        <td
          style="font-size: 10pt; font-family: Arial, sans-serif; padding-bottom: 0px; padding-top: 5px; padding-left: 0px; vertical-align: bottom;"
          valign="bottom"
        >
          {#if LinkedIn}
            <a href={LinkedIn} target="_blank" rel="noopener">
              <img
                border="0"
                width="26"
                height="26"
                alt="LinkedIn icon"
                style="border:0; height:26px; width:26px"
                src="https://e-comas.com/icons/linkedin.jpg"
              /></a
            >
          {/if}
          <span>
            <a href="https://www.e-comas.com" target="_blank" rel="noopener">
              <img
                border="0"
                width="26"
                height="26"
                alt="website icon"
                style="border:0; height:26px; width:26px"
                src="https://e-comas.com/icons/link.jpg"
              /></a
            >
          </span>
        </td>
      </tr>
    </tbody>
  </table>
  <table cellpadding="0" cellspacing="0">
    <tbody>
      <tr>
        <td
          style="max-width: 540px; padding-top: 8px;padding-right: 5px; vertical-align: top;"
          valign="top"
        >
          <a
            href="https://www.e-comas.com/white-paper-form.html"
            target="_blank"
            rel="noopener"
          >
            <img
              border="0"
              alt="Logo"
              width="540"
              height="90"
              style="width: 100%; height:auto; border:0;"
              src="https://www.e-comas.com/docs/signatures/ressources/how-to-manage-amazon.jpg"
            /></a
          >
        </td>
      </tr>
    </tbody>
  </table>
{/await}
