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

    const { Name, Title, Phone, pictureUrl, LinkedIn } = user;

    const phone_url = "tel:" + Phone;
    const email_address_url = "mailto:" + emailAddress;

    const decodeImgFromUrl = (url) => {
      const img = new Image();
      img.src = url;
      return img.decode().then(() => img);
    };
    const IMG_HEIGHT = 200;

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
      src: "https://www.e-comas.com/docs/signatures/ressources/logo.png",
      width: 136,
      height: 33,
    };

    const topImageWidth = 276;
    const bottomLeftWidth = 107;

    const socialLinks = [
      {
        src: "https://www.e-comas.com/docs/signatures/ressources/linkedin.png",
        alt: "LinkedIn",
        href: "https://www.linkedin.com/company/e-comas/",
      },
      {
        src: "https://www.e-comas.com/docs/signatures/ressources/youtube.png",
        alt: "YouTube",
        href: "https://www.youtube.com/channel/UClCYdUcUs1zJk8O3a4lC9lw",
      },
      {
        src: "https://www.e-comas.com/docs/signatures/ressources/facebook.png",
        alt: "Facebook",
        href: "https://www.facebook.com/ecommerce.made.simple/",
      },
      {
        src: "https://www.e-comas.com/docs/signatures/ressources/instagram.png",
        alt: "Instagram",
        href: "https://www.instagram.com/e.comas.amazon.made.simple/",
      },
    ];
  </script>
`);
process.stdout.write(
  _(
    html`<table id="signature" cellpadding="0" cellspacing="0">
      <style>
        @media screen and (max-width: 645px) {
          #signature > tbody > tr {
            display: flex;
            flex-direction: column;
          }
          #signature .company-info {
            padding: 10px;
          }
          #signature .company-info > tbody > tr > td:first-child {
            display: none;
          }
          #signature .company-info > tbody > tr > td,
          #signature .company-info table {
            width: 100%;
          }
          #signature img:first-of-type,
          #signature .company-info img {
            display: block;
            margin: auto;
          }
        }
      </style>
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
            <table cellpadding="0" cellspacing="0">
              <tbody>
                <tr>
                  <th class="name">{Name}</th>
                </tr>
                <tr>
                  <td class="title">{Title}</td>
                </tr>
                <tr>
                  <td class="empty">&nbsp;</td>
                </tr>
                <tr>
                  <td class="socials">
                    {#if LinkedIn}
                    <a href="{LinkedIn}"
                      ><img
                        src="https://www.e-comas.com/docs/signatures/ressources/linkedin-alt.png"
                        alt="LinkedIn account"
                        width="20"
                        height="20"
                    /></a>
                    | {/if} {#if Phone}
                    <a href="{phone_url}">{PhoneInternationalFormat}</a> | {/if}
                    <a href="{email_address_url}">{emailAddress}</a>
                  </td>
                </tr>
                <tr>
                  <td class="empty">&nbsp;</td>
                </tr>
                <tr>
                  <td>
                    <address>
                      e-Comas Sarl, 68 Avenue de la Liberté,<br />1930
                      Luxembourg
                    </address>
                  </td>
                </tr>
                <tr>
                  <td class="empty">&nbsp;</td>
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
          <td style="padding:10px">&nbsp;</td>
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
                      src="https://www.e-comas.com/docs/signatures/ressources/top-right.png"
                      width="{topImageWidth}"
                      height="120"
                    />
                  </td>
                </tr>
                <tr>
                  <td rowspan="2">
                    <img
                      alt=""
                      src="https://www.e-comas.com/docs/signatures/ressources/bottom-left.png"
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
                          <td class="empty">&nbsp;</td>
                        </tr>
                        <tr>
                          {#each socialLinks as socialLink}
                          <td class="empty">&nbsp;</td>
                          <td width="25">
                            <a href="{socialLink.href}"
                              ><img
                                src="{socialLink.src}"
                                alt="{socialLink.alt}"
                                width="20"
                                height="20"
                            /></a>
                          </td>
                          {/each}
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td class="empty">&nbsp;</td>
                </tr>
                <tr>
                  <td class="empty">&nbsp;</td>
                  <td class="empty">&nbsp;</td>
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
