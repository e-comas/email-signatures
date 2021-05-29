#!/usr/bin/env node
import juice from "juice";
import sass from "sass";

import process from "node:process";
import { fileURLToPath } from "node:url";

const html = ([str]) => str;
const _ = (html, css) =>
  "{#await data}\n" +
  "<p>...loading</p>\n" +
  "{:then [PhoneInternationalFormat, IMG_WIDTH]}\n" +
  juice
    .inlineContent(html, css)
    .replace(
      /(\w+)="([^"]*\{[^"]*)"/g,
      (_, key, value) =>
        `${key}={${value
          .split(/\{|\}/g)
          .map((str, i) => (i & 1 ? str : str.length && JSON.stringify(str)))
          .filter(Boolean)
          .join(" + ")}}`
    )
    .replace(
      new RegExp(
        Array.from(
          html.match(/<[A-Z][a-z]+/g) ?? [],
          (tag) => `(</?)(${tag.substring(1).toLowerCase()})`
        ).join("|"),
        "g"
      ),
      (_, bracket, tag) =>
        bracket + tag.charAt(0).toUpperCase() + tag.substring(1)
    ) +
  "\n<style>\n" +
  "#signature { text-align: initial; }\n" +
  "</style>\n" +
  "\n{:catch error}\n" +
  '<p style="color: red">{error}</p>\n' +
  "{/await}\n";

process.stdout.write(html`
  <script lang="ts">
    import format from "@aduh95/format-phone-number";

    import Social from "./Social.svelte";

    export let user;
    export let emailAddress;

    const companyAddress =
      "e-Comas Sarl, 68 Avenue de la Liberté, 1930 Luxembourg";

    const { Name, Title, Phone, pictureUrl } = user;
    const url = user.url ?? {};

    const decodeImgFromUrl = (url) => {
      const img = new Image();
      img.src = url;
      return img.decode().then(() => img);
    };
    const IMG_HEIGHT = 105;

    const data = Promise.all([
      Phone ? format(Phone) : Promise.resolve(),
      decodeImgFromUrl(pictureUrl).then(
        (img) => img.naturalWidth * (IMG_HEIGHT / img.naturalHeight),
        (e) => {
          console.error(e);
          return IMG_HEIGHT;
        }
      ),
    ]);
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
                      alt="{Name}'s picture"
                      width="{IMG_WIDTH}"
                      height="{IMG_HEIGHT}"
                      src="{pictureUrl}"
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
                          <td>{companyAddress}</td>
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
          <td><Social links="{url}" /></td>
        </tr>
        <tr>
          <td>
            <table cellpadding="0" cellspacing="0">
              <tbody>
                <tr>
                  <td>
                    <a
                      href="https://www.e-comas.com/white-paper-form.html"
                      target="_blank"
                      rel="noopener"
                    >
                      <img
                        alt="Logo"
                        width="540"
                        height="90"
                        src="https://www.e-comas.com/docs/signatures/ressources/how-to-manage-amazon.jpg"
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
