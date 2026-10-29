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
    export let domain = "e-comas.com";

    const { Name, Title, Phone, pictureUrl, LinkedIn, Entity } = user;

    $: displayEmail = emailAddress.replace(/@.*$/, "@" + domain);
    const phone_url = "tel:" + Phone;
    const email_address_url = "mailto:" + displayEmail;

    const decodeImgFromUrl = (url) => {
      const img = new Image();
      img.src = url;
      return img.decode().then(() => img);
    };
    const IMG_HEIGHT = 200;

    $: data = Promise.all([
      Phone ? format(Phone) : Promise.resolve(),
      decodeImgFromUrl(pictureUrl).then(
        (img) => img.naturalWidth * (IMG_HEIGHT / img.naturalHeight),
        (e) => {
          console.error(e);
          return IMG_HEIGHT;
        }
      ),
    ]);

    const themes = {
        "e-comas.com": {
            companyName: "e-Comas Sarl",
            address: [
                "68 Avenue de la Liberté",
                "1930 Luxembourg, LUXEMBOURG",
            ],
            accentColor: "#2f308d",
            cta: {
                text: "Download the e-Comas whitepaper:",
                linkText: "Amazon Marketing Cloud Unpacked",
                href: "https://bit.ly/3TWpi2Z",
            },
            linkedinIcon: {
                src: "https://e-comas.github.io/docs/signatures/ressources/icons/socials-blue/linkedin.png",
                alt: "LinkedIn",
            },
            logo: null 
        },
        "ezy-distribution.com": {
            companyName: "EZY Distribution EU/UK",
            groupName: "Part of the e-Comas Group",
            website: "www.ezy-distribution.com",
            websiteUrl: "https://www.ezy-distribution.com",
            accentColor: "#3b6dbb", 
            cta: null,
            linkedinIcon: {
                src: "https://e-comas.github.io/docs/signatures/ressources/icons/socials-blue/linkedin.png",
                alt: "LinkedIn",
            },
            logo: {
                src: "https://e-comas.github.io/docs/signatures/ressources/icons/ezy-logo.png", 
                alt: "Ezy Distribution"
            }
        },
    };

    $: theme = themes[domain] ?? themes["e-comas.com"];

    const entityLogos = {
        "Marketplace": { src: "https://e-comas.github.io/docs/signatures/ressources/icons/favicons/Marketplace.png", alt: "Marketplace" },
        "Distribution": { src: "https://e-comas.github.io/docs/signatures/ressources/icons/favicons/Distribution.png" , alt: "Distribution" },
        "Digital Marketing": { src: "https://e-comas.github.io/docs/signatures/ressources/icons/favicons/DigitalMarketing.png", alt: "Digital Marketing" },
        "Technology": { src: "https://e-comas.github.io/docs/signatures/ressources/icons/favicons/Technology.png", alt: "Technology" }
    }

    $: finalLogo = (domain === "ezy-distribution.com") 
        ? theme.logo 
        : (Entity && entityLogos[Entity] ? entityLogos[Entity] : null);

    $: finalEntityName = (domain === "ezy-distribution.com") 
        ? null 
        : (Entity ? Entity.replace(/ /g, String.fromCharCode(160)) : null);

    $: nameStyle =
        "font-weight: bold; font-size: 22px; line-height: 25px; color: " +
        theme.accentColor +
        "; letter-spacing: 0; margin: 0; padding-bottom: 5px;";
    $: companyNameStyle =
        "font-weight: bold; color: " + theme.accentColor + "; font-size: 16px;";
    $: ctaLinkStyle =
        "font-weight: bold; color: " + theme.accentColor + "; letter-spacing: 0;";

    const companyURL = "https://e-comas.com";

  </script>
`);
process.stdout.write(
  _(
    html`<table id="signature" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#ffffff" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; max-width: 600px; font-family: Arial, Helvetica, sans-serif; -webkit-font-smoothing: antialiased; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: separate;">
    <tbody>
        <tr>
            <td bgcolor="#ffffff" style="padding:0; font-family: Arial, Helvetica, sans-serif; background-color: #ffffff; font-size: 0; text-align: left; vertical-align: top;">
                
                <!-- COLUMN 1: PROFILE PICTURE -->
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
                <table align="left" cellpadding="0" cellspacing="0" border="0" width="400" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 400px; max-width: 100%; margin-bottom: 20px; border-collapse: separate; padding-left: 10px;">
                    <tbody>
                        <tr>
                            <td height="200" valign="middle" bgcolor="#ffffff" style="height: 200px; background-color: #ffffff; color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 14px; vertical-align: bottom; padding-right: 20px;">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="border-collapse: collapse; background-color: #ffffff; font-family: Arial, Helvetica, sans-serif;">
                                    <tbody>
                                        <!-- HEADER GROUP: Logo + Name + Title -->
                                        <tr>
                                            {#if finalLogo}
                                            <td width="60" valign="top" align="left" bgcolor="#ffffff" style="padding-right: 15px; background-color: #ffffff;">
                                                <img alt={finalLogo.alt} src={finalLogo.src} width="53" height="53" style="display: block; border: none; width: 53px; height: 53px; max-width: 53px;" />
                                            </td>
                                            {/if}
                                            <td valign="top" align="left" bgcolor="#ffffff" style="background-color: #ffffff;">
                                                <div style="{nameStyle}">
                                                    {Name}
                                                </div>
                                                <div style="font-size: 16px; line-height: 18px; color: #404040; letter-spacing: 0; font-weight: bold; margin: 0;">
                                                    {Title}{#if finalEntityName}, {finalEntityName}{/if}
                                                </div>
                                            </td>
                                        </tr>
                                        
                                        <tr>
                                            <td colspan="2" height="10" bgcolor="#ffffff" style="line-height: 10px; font-size: 10px; background-color: #ffffff;"></td>
                                        </tr>
        
                                        <!-- BODY: LinkedIn + Email -->
                                        <tr>
                                            <td colspan="2" align="left" bgcolor="#ffffff" style="padding-bottom: 10px; background-color: #ffffff;">
                                                {#if LinkedIn}
                                                <a href="localhost:8080" style="text-decoration: none; display: inline-block; vertical-align: middle; margin-right: 10px;">
                                                    <img alt="LinkedIn" src={theme.linkedinIcon.src} width="20" style="-ms-interpolation-mode: bicubic; max-width: 100%; height: auto; vertical-align: middle; border: none; display: block;" />
                                                </a>
                                                {/if}
                                                <a href={email_address_url} style="font-size: 14px; font-weight: bold; text-decoration: underline; text-decoration-color: #101010; color: #000000; display: inline-block; vertical-align: middle;">
                                                    {displayEmail}
                                                </a>
                                            </td>
                                        </tr>
        
                                        <!-- BODY: Conditional Address or Ezy Marketing Strip -->
                                        <tr>
                                            <td colspan="2" align="left" bgcolor="#ffffff" style="padding-bottom: 10px; line-height: 18px; font-size: 14px; color: #000000; background-color: #ffffff;">
                                                {#if domain === "ezy-distribution.com"}
                                                    <!-- Ezy Distribution Marketing Layout -->
                                                    <div style="font-family: Arial, Helvetica, sans-serif; color: #4d4d4d; line-height: 18px;">
                                                        <div style="{companyNameStyle} margin-bottom: 2px;">{theme.companyName}</div>
                                                        <div style="font-size: 13px; color: #555; margin-bottom: 12px;">{theme.groupName}</div>
                                                        
                                                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 12px; border-collapse: collapse; table-layout: fixed;">
                                                            <tr valign="middle">
                                                                <td width="25%" align="center" style="padding: 0 8px;">
                                                                    <img src="https://e-comas.github.io/docs/signatures/ressources/icons/ezy-baby.png" width="75" height="38" style="display: block; width: 75px; height: auto; object-fit: contain; margin: 0 auto;">
                                                                </td>
                                                                <td width="25%" align="center" style="padding: 0 8px;">
                                                                    <img src="https://e-comas.github.io/docs/signatures/ressources/icons/ezy-pets.png" width="75" height="38" style="display: block; width: 75px; height: auto; object-fit: contain; margin: 0 auto;">
                                                                </td>
                                                                <td width="25%" align="center" style="padding: 0 8px;">
                                                                    <img src="https://e-comas.github.io/docs/signatures/ressources/icons/ezy-living.png" width="75" height="38" style="display: block; width: 75px; height: auto; object-fit: contain; margin: 0 auto;">
                                                                </td>
                                                                <td width="25%" align="center" style="padding: 0 8px;">
                                                                    <img src="https://e-comas.github.io/docs/signatures/ressources/icons/ezy-health.png" width="75" height="38" style="display: block; width: 75px; height: auto; object-fit: contain; margin: 0 auto;">
                                                                </td>
                                                                </tr>
                                                        </table>
                                                        
                                                        <a href="{theme.websiteUrl}" style="font-size: 14px; font-weight: bold; color: {theme.accentColor}; text-decoration: none;">{theme.website}</a>
                                                    </div>
                                                {:else}
                                                    <!-- Standard e-Comas Address Layout -->
                                                    <address style="font-style: normal; margin: 0;">
                                                        <span style="{companyNameStyle}">{theme.companyName}</span>
                                                        {theme.address[0]}<br>{theme.address[1]}
                                                    </address>
                                                {/if}
                                            </td>
                                        </tr>
        
                                        {#if theme.cta}
                                        <tr>
                                            <td colspan="2" align="left" bgcolor="#ffffff" style="line-height: 18px; font-size: 14px; font-weight: bold; color: #000000; background-color: #ffffff;">
                                                {theme.cta.text} <br>
                                                <a href="{theme.cta.href}" style="{ctaLinkStyle}">{theme.cta.linkText}</a>.
                                            </td>
                                        </tr>
                                        {/if}
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
