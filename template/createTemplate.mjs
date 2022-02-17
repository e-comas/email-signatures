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
        "(</?)(" +
          Array.from(html.match(/<[A-Z][a-z]+/g) ?? [], (tag) =>
            tag.substring(1).toLowerCase()
          ).join("|") +
          ")",
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

    export let user;
    export let emailAddress;

    const companyAddress =
      "e-Comas Sarl, 68 Avenue de la Liberté, 1930 Luxembourg";

    const { Name, Title, Phone, pictureUrl } = user;
    const url = user.url ?? {};

    const linkedin = url?.LinkedIn;
    const phone_url = "tel:" + Phone;
    const email_address_url = "mailto:" + emailAddress;

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

    const companyURL = "https://e-comas.com";
    const companyLogo = {
      alt: "e-Comas, eCommerce made simple",
      src: "/images/logo.png",
      width: 165,
      height: 40,
    };

    const topImageWidth = 321;
    const bottomLeftWidth = 124;

    const socialLinks = [
      {
        src: "/images/linkedin.png",
        alt: "LinkedIn",
        href: "https://www.linkedin.com/company/e-comas/",
      },
      {
        src: "/images/youtube.png",
        alt: "YouTube",
        href: "https://www.youtube.com/channel/UClCYdUcUs1zJk8O3a4lC9lw",
      },
      {
        src: "/images/facebook.png",
        alt: "Facebook",
        href: "https://www.facebook.com/ecommerce.made.simple/",
      },
      {
        src: "/images/instagram.png",
        alt: "Instagram",
        href: "https://www.instagram.com/e.comas.amazon.made.simple/",
      },
    ];
  </script>
`);
process.stdout.write(
  _(
    html`<table id="signature" cellpadding="0" cellspacing="0">
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
                  <th class="name">{Name}</th>
                </tr>
                <tr>
                  <td>{Title}</td>
                </tr>
                <tr>
                  <td class="socials">
                    {#if linkedin}
                    <a href="{linkedin}"
                      ><img src="todo" alt="LinkedIn account"
                    /></a>
                    | {/if} {#if Phone}
                    <a href="{phone_url}">{PhoneInternationalFormat}</a> | {/if}
                    <a href="{email_address_url}">{emailAddress}</a>
                  </td>
                </tr>
                <tr>
                  <td><address>{companyAddress}</address></td>
                </tr>
                <tr>
                  <td class="cta">
                    Download the e-Comas whitepaper:
                    <a href="https://www.e-comas.com/white-paper-form.html"
                      >How to manage Amazon</a
                    >.
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
          <td>
            <table cellpadding="0" cellspacing="0" class="company-info">
              <colgroup>
                <col width="{bottomLeftWidth}" />
                <col width="{companyLogo.width}" />
                <col
                  width="{topImageWidth - companyLogo.width - bottomLeftWidth}"
                />
              </colgroup>
              <tbody>
                <tr>
                  <td colspan="3">
                    <img
                      alt=""
                      src="/images/top-right.png"
                      width="{topImageWidth}"
                      height="120"
                    />
                  </td>
                </tr>
                <tr>
                  <td rowspan="2">
                    <img
                      alt=""
                      src="/images/bottom-left.png"
                      width="{bottomLeftWidth}"
                      height="156"
                    />
                  </td>
                  <td>
                    <table cellpadding="0" cellspacing="0">
                      {#if socialLinks.length !== 0}
                      <colgroup>
                        <col width="0" />
                      </colgroup>
                      {/if}
                      <tbody>
                        <tr>
                          <td colspan="{socialLinks.length * 2 || 1}">
                            <a href="{companyURL}">
                              <img
                                alt="{companyLogo.alt}"
                                width="{companyLogo.width}"
                                height="{companyLogo.height}"
                                src="{companyLogo.src}"
                              />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          {#each socialLinks as socialLink}
                          <td>&nbsp;</td>
                          <td width="25">
                            <a href="{socialLink.href}"
                              ><img
                                src="{socialLink.src}"
                                alt="{socialLink.alt}"
                                width="25"
                                height="25"
                            /></a>
                          </td>
                          {/each}
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
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
