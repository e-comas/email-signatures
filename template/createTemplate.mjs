#!/usr/bin/env node
import juice from "juice";
import sass from "sass";

import process from "node:process";
import { fileURLToPath } from "node:url";

const html = ([str]) => str;
const _ = (html, css) =>
  "{#await data}\n" +
  "<p>...loading</p>\n" +
  "{:then [PhoneInternationalFormat]}\n" +
  juice.inlineContent(html, css) +
  // .replace(
  //   /(\w+)="([^"]*\{[^"]*)"/g,
  //   (_, key, value) =>
  //     `${key}={${value
  //       .split(/\{|\}/g)
  //       .map((str, i) => (i & 1 ? str : str.length && JSON.stringify(str)))
  //       .filter(Boolean)
  //       .join(" + ")}}`
  // )
  // .replace(
  //   new RegExp(
  //     Array.from(
  //       html.match(/<[A-Z][a-z]+/g) ?? [],
  //       (tag) => `(</?)(${tag.substring(1).toLowerCase()})`
  //     ).join("|"),
  //     "g"
  //   ),
  //   (_, bracket, tag) =>
  //     bracket + tag.charAt(0).toUpperCase() + tag.substring(1)
  // ) +
  "\n<style>\n" +
  "#signature { text-align: initial; }\n" +
  "</style>\n" +
  "\n{:catch error}\n" +
  '<p style="color: red">{error}</p>\n' +
  "{/await}\n";

process.stdout.write(html`
  <script lang="ts">
    import format from "@aduh95/format-phone-number";

    export let user;
    export let emailAddress;

    const companyAddress = "www.qhalikay-organics.com";

    const { Name, Title, Phone } = user;
    const url = user.url ?? {};

    const data = Promise.all([Phone ? format(Phone) : Promise.resolve()]);
  </script>
`);
process.stdout.write(
  _(
    html`<table id="signature" cellpadding="0" cellspacing="0">
      <tbody>
        <tr>
          <td>
            <table cellpadding="0" cellspacing="0">
              <tbody>
                <tr>
                  <td>
                    <img
                      alt="Qhalikay Organics logo"
                      width="105"
                      height="105"
                      src="https://cdn.shopify.com/s/files/1/0576/7561/2341/files/QKLogo4email.png"
                    />
                  </td>

                  <td>
                    <table cellpadding="0" cellspacing="5">
                      <tbody>
                        <tr>
                          <td>
                            <strong class="name">{Name}</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>{Title}</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="mailto:{emailAddress}" target="_blank"
                              >{emailAddress}</a
                            >
                          </td>
                        </tr>
                        {#if Phone}
                        <tr>
                          <td>
                            <a href="tel:{Phone}" target="_blank"
                              >{PhoneInternationalFormat}</a
                            >
                          </td>
                        </tr>
                        {/if}
                        <tr>
                          <td>
                            <a href="https://{companyAddress}" target="_blank"
                              >{companyAddress}</a
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <table cellpadding="0" cellspacing="0">
              <tbody>
                <tr>
                  <td>
                    <a
                      href="https://www.qhalikay-organics.com/"
                      target="_blank"
                      rel="noopener"
                    >
                      <img
                        alt="Logo"
                        width="384"
                        height="143"
                        src="https://cdn.shopify.com/s/files/1/0576/7561/2341/files/email_banner.jpg"
                    /></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>`,
    sass
      .renderSync({
        file: fileURLToPath(new URL("./styles.scss", import.meta.url)),
      })
      .css.toString()
  )
);
