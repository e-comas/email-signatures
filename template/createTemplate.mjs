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
        src: "https://www.e-comas.com/docs/signatures/ressources/icons/logo.png",
        width: 136,
        height: 33,
    };

    const topImageWidth = 276;
    const bottomLeftWidth = 107;

    const socialLinks = [
        {
            src: "https://www.e-comas.com/docs/signatures/ressources/icons/socials/linkedin.png",
            alt: "LinkedIn",
            href: "https://www.linkedin.com/company/e-comas/",
        },
        {
            src: "https://www.e-comas.com/docs/signatures/ressources/icons/socials/youtube.png",
            alt: "YouTube",
            href: "https://www.youtube.com/channel/UClCYdUcUs1zJk8O3a4lC9lw",
        },
        {
            src: "https://www.e-comas.com/docs/signatures/ressources/icons/socials/facebook.png",
            alt: "Facebook",
            href: "https://www.facebook.com/ecomas.ecommerce.made.simple/",
        },
        {
            src: "https://www.e-comas.com/docs/signatures/ressources/icons/socials/instagram.png",
            alt: "Instagram",
            href: "https://www.instagram.com/ecomas.ecommerce.made.simple/",
        },
    ];
  </script>
`);
process.stdout.write(
  _(
    html`<table id="signature" cellpadding="0" cellspacing="0"
    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding: 0; font-family: Arial, Helvetica, sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: separate; border: 1px solid black;">
    <style>
        @media screen and (max-width: 645px) {
            #signature>tbody>tr {
                display: flex;
                flex-direction: column;
            }

            #signature .company-info {
                padding: 10px;
            }

            #signature .company-info>tbody>tr>td:first-child {
                display: none;
            }

            #signature .company-info>tbody>tr>td,
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
            <td
                style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; vertical-align: middle; padding: 20px;">
                <img alt="a pic" width={IMG_WIDTH} height={IMG_HEIGHT} src={pictureUrl}
                    style="-ms-interpolation-mode: bicubic; max-width: 100%; height: auto; border: none;">
            </td>
            <td style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; vertical-align: middle;">
                <table cellpadding="0" cellspacing="0"
                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: separate;">
                    <tbody>
                        <tr>
                            <th class="name"
                                style="font-size: 22px; line-height: 25px; color: #2f308d; letter-spacing: 0; text-align: left;">
                                {Name}
                            </th>
                        </tr>
                        <tr>
                            <td class="title"
                                style="font-family: Arial, Helvetica, sans-serif; vertical-align: top; font-size: 18px; font-weight: bold; letter-spacing: 0; line-height: 18px;">
                                {Title}
                            </td>
                        </tr>
                        <tr>
                            <td class="empty"
                                style="font-size: 14px; font-family: unset; line-height: 12px; vertical-align: unset;">
                                &nbsp;</td>
                        </tr>
                        <tr>
                            <td class="socials"
                                style="font-family: Arial, Helvetica, sans-serif; vertical-align: middle; line-height: 20px; font-size: 12px; letter-spacing: 0;display: inline-flex; align-items: center;">
                                {#if LinkedIn}
                                <a href={LinkedIn}>
                                    <img alt="LinkedIn"
                                        src="https://www.e-comas.com/docs/signatures/ressources/icons/socials-blue/linkedin.png"
                                        width="20px" style="vertical-align: middle; margin-right: 5px;" />
                                </a>
                                {/if}
                                <a href={email_address_url}
                                    style="font-size: 14px; font-weight: bold; text-decoration: underline; text-decoration-color: #101010; text-underline-offset: 4px; margin-left: 10px; color:black;">
                                    <span style="vertical-align: middle;">{emailAddress}</span>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td class="empty"
                                style="font-size: 14px; font-family: unset; line-height: 12px; vertical-align: unset;">
                                &nbsp;</td>
                        </tr>
                        <tr>
                            <td
                                style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; vertical-align: top;">
                                <address
                                    style="font-size: 16px; letter-spacing: 0; line-height: 18px; font-style: normal;">
                                    <span style="font-weight: bold; color: #2f308d;">e-Comas Sarl</span>, 68 Avenue de
                                    la Liberté,<br>1930
                                    Luxembourg, LUXEMBOURG
                                </address>
                            </td>
                        </tr>
                        <tr>
                            <td class="empty"
                                style="font-size: 14px; font-family: unset; line-height: 12px; vertical-align: unset;">
                                &nbsp;</td>
                        </tr>
                        <tr>
                            <td class="cta"
                                style="font-family: Arial, Helvetica, sans-serif; vertical-align: top; font-size: 14px; line-height: 18px; font-weight: bold;">
                                Download the <br /> e-Comas whitepaper:
                                <a href="https://www.e-comas.com/white-paper-form.html"
                                    style="font-weight: bold; color: #2f308d; letter-spacing: 0;">Amazon Marketing Cloud
                                    Unpacked</a>.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
            <td
                style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; vertical-align: middle; padding: 10px;">
                &nbsp;</td>
            <td
                style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; vertical-align: middle; background-image: url(https://www.e-comas.com/docs/signatures/ressources/bg-2026.jpg);background-color: #2f308d ;background-position: 50% 100%; background-repeat: no-repeat;">
                <table cellpadding="0" cellspacing="0" width="240px"
                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: separate; margin: 0 auto;">
                    <tbody>
                        <tr>
                            <td
                                style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; vertical-align: top; text-align: center;">
                                <a href={companyURL}>
                                    <img alt={companyLogo.alt} src={companyLogo.src}
                                        style="-ms-interpolation-mode: bicubic; max-width: 90%; height: auto; border: none; display: block;">
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td
                                style="font-size: 14px; font-family: unset; line-height: 12px; vertical-align: unset; text-align: center;">
                                &nbsp;
                            </td>
                        </tr>
                        <tr>
                            <td
                                style="font-size: 14px; font-family: unset; line-height: 12px; vertical-align: unset; text-align: center;">
                                &nbsp;
                            </td>
                        </tr>
                        <tr>
                            <!-- row of 4 logos -->
                            <td>
                                <table width="100%" cellpadding="0" cellspacing="0"
                                    style="border-collapse: separate; table-layout: fixed; padding-inline: 5px;">
                                    <tbody>
                                        <tr>
                                            <td align="center" valign="middle" width="25%" height="53"
                                                style="height: 53px; text-align: center; vertical-align: middle;">
                                                <img alt="Marketplace"
                                                    src="https://www.e-comas.com/docs/signatures/ressources/icons/Marketplace-2.png"
                                                    width="53" height="53"
                                                    style="display: inline-block; border: none; max-width: 53px; max-height: 53px; width: auto; height: auto;">
                                            </td>

                                            <td width="5" style="width: 5px; font-size: 1px;">&nbsp;</td>

                                            <td align="center" valign="middle" width="25%" height="53"
                                                style="padding: 0px; height: 53px; text-align: center; vertical-align: middle;">
                                                <img alt="Distribution"
                                                    src="https://www.e-comas.com/docs/signatures/ressources/icons/Distribution-2.png"
                                                    width="53" height="53"
                                                    style="display: inline-block; border: none; max-width: 53px; max-height: 53px; width: auto; height: auto;">
                                            </td>

                                            <td width="5" style="width: 5px; font-size: 1px;">&nbsp;</td>

                                            <td align="center" valign="middle" width="25%" height="53"
                                                style="padding: 0px; height: 53px; text-align: center; vertical-align: middle;">
                                                <img alt="Digital Marketing"
                                                    src="https://www.e-comas.com/docs/signatures/ressources/icons/DigitalMarketing-2.png"
                                                    width="53" height="53"
                                                    style="display: inline-block; border: none; max-width: 53px; max-height: 53px; width: auto; height: auto;">
                                            </td>

                                            <td width="5" style="width: 5px; font-size: 1px;">&nbsp;</td>

                                            <td align="center" valign="middle" width="25%" height="53"
                                                style="padding: 0px; height: 53px; text-align: center; vertical-align: middle;">
                                                <img alt="Technology"
                                                    src="https://www.e-comas.com/docs/signatures/ressources/icons/Technology-2.png"
                                                    width="53" height="53"
                                                    style="display: inline-block; border: none; max-width: 53px; max-height: 53px; width: auto; height: auto;">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td
                                style="font-size: 14px; font-family: unset; line-height: 12px; vertical-align: unset; text-align: center;">
                                &nbsp;
                            </td>
                        </tr>
                        <tr>
                            <td
                                style="font-size: 14px; font-family: unset; line-height: 12px; vertical-align: unset; text-align: center;">
                                &nbsp;
                            </td>
                        </tr>
                        <tr>
                            <td
                                style="font-size: 14px; font-family: unset; line-height: 12px; vertical-align: unset; text-align: center;">
                                &nbsp;
                            </td>
                        </tr>
                        <tr>
                            <td
                                style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; vertical-align: top; text-align: center;">
                                {#each socialLinks as socialLink}
                                <a href={socialLink.href} style="display: inline-block; margin: 0 2px;">
                                    <img src={socialLink.src} alt={socialLink.alt} width="22" height="22"
                                        style="-ms-interpolation-mode: bicubic; max-width: 100%; height: auto; border: none; display: inline-block;">
                                </a>
                                {/each}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
            <td class="empty" style="font-size: 14px; font-family: unset; line-height: 12px; vertical-align: unset;">
                &nbsp;</td>
        </tr>
        <tr>
            <td class="empty" style="font-size: 14px; font-family: unset; line-height: 12px; vertical-align: unset;">
                &nbsp;</td>
            <td class="empty" style="font-size: 14px; font-family: unset; line-height: 12px; vertical-align: unset;">
                &nbsp;</td>
        </tr>
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
