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

    const { Name, Title, Phone, pictureUrl, LinkedIn, Entity } = user;

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

    const entityLogos = {
        "Marketplace": {
            src: "https://www.e-comas.com/docs/signatures/ressources/icons/favicons/Marketplace.png",
            alt: "Marketplace"
        },
        "Distribution": {
            src: "https://www.e-comas.com/docs/signatures/ressources/icons/favicons/Distribution.png" ,
            alt: "Distribution"
        },
        "Digital Marketing": {
            src: "https://www.e-comas.com/docs/signatures/ressources/icons/favicons/DigitalMarketing.png",
            alt: "Digital Marketing"
        },
        "Technology": {
            src: "https://www.e-comas.com/docs/signatures/ressources/icons/favicons/Technology.png",
            alt: "Technology"
        }
    }

    // --- NEW LOGIC: Determine the correct entity logo based on the Entity field ---
    const entityLogo = Entity && entityLogos[Entity] ? entityLogos[Entity] : null;

    // replace spaces with nsbp in the Entity name
    const entityName = Entity ? Entity.replace(/ /g, "&nbsp;") : null;
  </script>
`);
process.stdout.write(
  _(
    html`<table id="signature" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#ffffff" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; max-width: 600px; font-family: Arial, Helvetica, sans-serif; -webkit-font-smoothing: antialiased; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: separate;">
    <tbody>
        <tr>
            <!-- Main Wrapper TD: Now explicitly white so dark mode doesn't bleed through the gaps -->
            <td bgcolor="#ffffff" style="padding:0; font-family: Arial, Helvetica, sans-serif; background-color: #ffffff; font-size: 0; text-align: left; vertical-align: top;">
                
                <!-- ========================================== -->
                <!-- COLUMN 1: PROFILE PICTURE -->
                <!-- ========================================== -->
                <table align="left" cellpadding="0" cellspacing="0" border="0" width="200" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 200px; min-width: 200px; margin-bottom: 20px; border-collapse: separate;">
                    <tbody>
                        <tr>
                            <td style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; background-color: #ffffff; vertical-align: top;">
                                <img alt="{Name}'s Profile Picture" width="200" height="200" src={pictureUrl} style="-ms-interpolation-mode: bicubic; width: 200px; height: 200px; max-width: 200px; object-fit: cover; border: none; display: block;">
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- COLUMN 2: PERSONAL INFO -->
                <!-- ========================================== -->
                <table align="left" cellpadding="0" cellspacing="0" border="0" width="400" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 400px; max-width: 100%; margin-bottom: 20px; border-collapse: separate; padding-left: 10px;">
                    <tbody>
                        <tr>
                            <td height="200" valign="middle" bgcolor="#ffffff" style="height: 200px; background-color: #ffffff; color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 14px; vertical-align: middle; padding-right: 20px;">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="border-collapse: collapse; background-color: #ffffff; font-family: Arial, Helvetica, sans-serif;">
                                    <tbody>
                                        <!-- HEADER GROUP: Icon + Name + Title -->
                                        <tr>
                                            {#if entityLogo}
                                            <td width="60" valign="top" align="left" bgcolor="#ffffff" style="padding-right: 15px; background-color: #ffffff;">
                                                <img alt={entityLogo.alt} src={entityLogo.src} width="53" height="53" style="display: block; border: none; width: 53px; height: 53px; max-width: 53px;" />
                                            </td>
                                            {/if}
                                            <!-- Right Column: Name & Title -->
                                            <td valign="top" align="left" bgcolor="#ffffff" style="background-color: #ffffff;">
                                                <div style="font-weight: bold; font-size: 22px; line-height: 25px; color: #2f308d; letter-spacing: 0; margin: 0; padding-bottom: 5px;">
                                                    {Name}
                                                </div>
                                                <div style="font-size: 16px; line-height: 18px; color: #404040; letter-spacing: 0; font-weight: bold; margin: 0;">
                                                    {Title}{#if Entity}, {entityName}{/if}
                                                </div>
                                            </td>
                                        </tr>
                                        
                                        <!-- Spacer Row -->
                                        <tr>
                                            <td colspan="2" height="10" bgcolor="#ffffff" style="line-height: 10px; font-size: 10px; background-color: #ffffff;"></td>
                                        </tr>
        
                                        <!-- BODY: LinkedIn + Email -->
                                        <tr>
                                            <!-- FIX 4: Add bgcolor here too -->
                                            <td colspan="2" align="left" bgcolor="#ffffff" style="padding-bottom: 10px; background-color: #ffffff;">
                                                {#if LinkedIn}
                                                <a href="localhost:8080" style="text-decoration: none; display: inline-block; vertical-align: middle; margin-right: 10px;">
                                                    <img alt="LinkedIn" src={socialLinks_inv[0].src} width="20" style="-ms-interpolation-mode: bicubic; max-width: 100%; height: auto; vertical-align: middle; border: none; display: block;" />
                                                </a>
                                                {/if}
                                                <a href={email_address_url} style="font-size: 14px; font-weight: bold; text-decoration: underline; text-decoration-color: #101010; color: #000000; display: inline-block; vertical-align: middle;">
                                                    {emailAddress}
                                                </a>
                                            </td>
                                        </tr>
        
                                        <!-- BODY: Address -->
                                        <tr>
                                            <td colspan="2" align="left" bgcolor="#ffffff" style="padding-bottom: 10px; line-height: 18px; font-size: 14px; color: #000000; background-color: #ffffff;">
                                                <address style="font-style: normal; margin: 0;">
                                                    <span style="font-weight: bold; color: #2f308d; font-size: 16px;">e-Comas Sarl</span> 
                                                    68 Avenue de la Libert&eacute;,<br>1930 Luxembourg, LUXEMBOURG
                                                </address>
                                            </td>
                                        </tr>
        
                                        <!-- BODY: Whitepaper -->
                                        <tr>
                                            <td colspan="2" align="left" bgcolor="#ffffff" style="padding-bottom: 10px; line-height: 18px; font-size: 14px; font-weight: bold; color: #000000; background-color: #ffffff;">
                                                Download the e-Comas whitepaper: <br>
                                                <a href="https://www.e-comas.com/white-paper-form.html" style="font-weight: bold; color: #2f308d; letter-spacing: 0;">Amazon Marketing Cloud Unpacked</a>.
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
