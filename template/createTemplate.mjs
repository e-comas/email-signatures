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

    const socialLinks_inv = [
       {
            src: "https://www.e-comas.com/docs/signatures/ressources/icons/socials-blue/linkedin.png",
            alt: "LinkedIn",
            href: "https://www.linkedin.com/company/e-comas/",
        }
    ]
  </script>
`);
process.stdout.write(
  _(
    html`<table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#ffffff" style="background-color: #ffffff; max-width: 900px; font-family: Arial, Helvetica, sans-serif; -webkit-font-smoothing: antialiased; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: separate;">
    <tbody>
        <tr>
            <td bgcolor="#ffffff" style="background-color: #ffffff; font-size: 0; text-align: left; vertical-align: top; padding: 10px 10px;">
                <table align="left" cellpadding="0" cellspacing="0" border="0" width="220" style="width: 220px; min-width: 220px; border-collapse: separate; margin-bottom: 20px;">
                    <tbody>
                        <tr>
                            <td style="background-color: #ffffff; vertical-align: top; padding-right: 20px;">
                                <img alt="Profile Picture" width="200" height="200" src="{pictureUrl}" style="-ms-interpolation-mode: bicubic; width: 200px; height: 200px; max-width: 200px; object-fit: cover; border: none; display: block;">
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table align="left" cellpadding="0" cellspacing="0" border="0" width="410" style="width: 410px; max-width: 100%; border-collapse: separate; margin-bottom: 20px;">
                    <tbody>
                        <tr>
                            <td height="240" valign="middle" style="height: 240px; background-color: #ffffff; color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 14px; vertical-align: middle; padding-right: 20px;">
                                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: separate;">
                                    <tbody>
                                        <tr>
                                            <th style="font-size: 22px; line-height: 25px; color: #2f308d; letter-spacing: 0; text-align: left; padding: 0 0 5px 0;">
                                                {Name}
                                            </th>
                                        </tr>
                                        <tr>
                                            <td style="color: #404040; font-size: 18px; font-weight: bold; letter-spacing: 0; line-height: 18px; padding-bottom: 10px;">
                                                {Title}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="color: #000000; line-height: 20px; font-size: 12px; letter-spacing: 0; vertical-align: middle; padding-bottom: 10px;">
                                                {#if LinkedIn}
                                                <a href="{LinkedIn}" style="text-decoration: none; display: inline-block; vertical-align: middle;">
                                                    <img alt="LinkedIn" src="{socialLinks_inv[0].src}" width="20" style="vertical-align: middle; margin-right: 5px; border: none; display: block;" />
                                                </a>
                                                {/if}
                                                <a href="{email_address_url}" style="font-size: 14px; font-weight: bold; text-decoration: underline; text-decoration-color: #101010; color: #000000; display: inline-block; vertical-align: middle;">
                                                    {emailAddress}
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="color: #000000; padding-bottom: 10px;">
                                                <address style="font-size: 14px; letter-spacing: 0; line-height: 18px; font-style: normal; margin: 0;">
                                                    <span style="font-weight: bold; color: #2f308d; font-size: 16px;">e-Comas Sarl</span><br>
                                                    68 Avenue de la Libert&eacute;,<br>1930 Luxembourg, LUXEMBOURG
                                                </address>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="color: #000000; font-size: 14px; line-height: 18px; font-weight: bold;">
                                                Download the <br /> e-Comas whitepaper:
                                                <a href="https://www.e-comas.com/white-paper-form.html" style="font-weight: bold; color: #2f308d; letter-spacing: 0;">Amazon Marketing Cloud Unpacked</a>.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table align="left" cellpadding="0" cellspacing="0" border="0" width="240" height="240" style="width: 240px; height: 240px; min-width: 240px; border-collapse: separate; margin-bottom: 20px;">
                    <tbody>
                        <tr>
                            <td background="https://www.e-comas.com/docs/signatures/ressources/bg-2026.jpg" bgcolor="#2f308d" width="240" height="240" valign="middle" style="width: 240px; height: 240px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; background-image: url('https://www.e-comas.com/docs/signatures/ressources/bg-2026.jpg'); background-color: #2f308d; background-size: cover; background-position: center; background-repeat: no-repeat;">
                                <table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%" style="border-collapse: separate;">
                                    <tbody>
                                        <tr>
                                            <td style="vertical-align: middle;">
                                                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: separate;">
                                                    <tbody>
                                                        <tr>
                                                            <td align="center" style="text-align: center; padding: 0 15px 15px 15px;">
                                                                <a href="{companyURL}">
                                                                    <img alt="{companyLogo.alt}" src="{companyLogo.src}" style="-ms-interpolation-mode: bicubic; max-width: 100%; height: auto; border: none; display: block; margin: 0 auto;">
                                                                </a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding-bottom: 15px;">
                                                                <table width="240" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; table-layout: fixed;">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="8" style="width: 8px; font-size: 1px; line-height: 1px;">&nbsp;</td>
                                                                            <td width="53" align="center" valign="middle" style="width: 53px; font-size: 0; line-height: 0;">
                                                                                <img alt="Marketplace" src="https://www.e-comas.com/docs/signatures/ressources/icons/Marketplace-2.png" width="53" height="53" style="display: block; border: none; width: 53px; height: 53px; max-width: 53px;">
                                                                            </td>
                                                                            <td width="4" style="width: 4px; font-size: 1px; line-height: 1px;">&nbsp;</td>
                                                                            <td width="53" align="center" valign="middle" style="width: 53px; font-size: 0; line-height: 0;">
                                                                                <img alt="Distribution" src="https://www.e-comas.com/docs/signatures/ressources/icons/Distribution-2.png" width="53" height="53" style="display: block; border: none; width: 53px; height: 53px; max-width: 53px;">
                                                                            </td>
                                                                            <td width="4" style="width: 4px; font-size: 1px; line-height: 1px;">&nbsp;</td>
                                                                            <td width="53" align="center" valign="middle" style="width: 53px; font-size: 0; line-height: 0;">
                                                                                <img alt="Digital Marketing" src="https://www.e-comas.com/docs/signatures/ressources/icons/DigitalMarketing-2.png" width="53" height="53" style="display: block; border: none; width: 53px; height: 53px; max-width: 53px;">
                                                                            </td>
                                                                            <td width="4" style="width: 4px; font-size: 1px; line-height: 1px;">&nbsp;</td>
                                                                            <td width="53" align="center" valign="middle" style="width: 53px; font-size: 0; line-height: 0;">
                                                                                <img alt="Technology" src="https://www.e-comas.com/docs/signatures/ressources/icons/Technology-2.png" width="53" height="53" style="display: block; border: none; width: 53px; height: 53px; max-width: 53px;">
                                                                            </td>
                                                                            <td width="8" style="width: 8px; font-size: 1px; line-height: 1px;">&nbsp;</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="center" style="text-align: center; padding: 0 15px 0 15px;">
                                                                {#each socialLinks as socialLink}
                                                                <a href="{socialLink.href}" style="display: inline-block; margin: 0 2px; text-decoration: none;">
                                                                    <img src="{socialLink.src}" alt="{socialLink.alt}" width="22" height="22" style="-ms-interpolation-mode: bicubic; max-width: 100%; height: auto; border: none; display: block;">
                                                                </a>
                                                                {/each}
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
