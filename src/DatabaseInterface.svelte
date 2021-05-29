<script lang="ts">
  import * as TOML from "@aduh95/toml";
  // @ts-ignore
  import tomlParserUrl from "@aduh95/toml/wasm";
  import Form from "./Form.svelte";
  import Preview from "./Template.svelte";
  import ClipboardHandler from "./ClipboardHandler.svelte";

  const CDN = "https://www.e-comas.com/docs/signatures/ressources";
  const documentId = "1YrdCY5heoUS2eLGvU8-YsIspk9ez42glfd-hWRUxo2Q";

  function* stringifySubTable(subTableName: string, subTable: any) {
    for (const [key, value] of Object.entries(subTable)) {
      if (value) {
        yield `${subTableName}.${TOML.stringify({ [key]: value })}`;
      }
    }
  }
  function* stringifyUser(email: string, obj: any) {
    yield "";
    yield "";

    const subTables = [];
    yield TOML.stringify({
      [email]: Object.fromEntries(
        Object.entries(obj).filter(([key, value]) => {
          if (!value) return false;
          if (typeof value === "object" && !Array.isArray(value)) {
            subTables.push(stringifySubTable(key, value));
            return false;
          }
          return true;
        })
      ),
    }).trimEnd();

    for (const subTable of subTables) {
      yield* subTable;
    }
  }

  const containsDeepChange = (database, obj) =>
    Object.entries(obj).some(([key, value]) =>
      typeof value === "object"
        ? containsDeepChange(database[key], value)
        : database[key] !== value
    );
  const getAssociatedValue = (database, key) => {
    if (key.includes(".")) {
      const [key0, key1] = key.split(".", 2);
      return database[key0][key1];
    } else {
      return database[key];
    }
  };
  const getLeftOverEntries = (database, userData, prefix = "") =>
    Object.entries(database).flatMap(([key, value]) =>
      value && value !== userData[key]
        ? typeof value === "string" || Array.isArray(value)
          ? { entry: [`${prefix}${key}`, value] }
          : getLeftOverEntries(value, userData[key], `${key}.`)
        : []
    );

  function exploreGDoc(content) {
    if (!content || typeof content !== "object") return;

    if (content.content) return content.content;

    return Object.values(content).map(exploreGDoc).join("\n");
  }

  let loadUserData = Promise.all([
    TOML.default(tomlParserUrl),
    gapi.client.docs.documents.get({ documentId }),
    location.hash.includes("@")
      ? Promise.resolve({ result: { email: location.hash.slice(1) } })
      : gapi.client.request({ method: "GET", path: "/userinfo/v2/me" }),
  ]).then(([_, data, userData]) => [
    TOML.parse(exploreGDoc(data.result.body.content))[
      userData.result.email
    ] ?? {
      Name: userData.result.name,
      newUser: true,
    },
    userData.result.email,
  ]);

  window.addEventListener("hashchange", () => {
    if (location.hash.includes("@")) {
      const email = location.hash.slice(1);
      loadUserData = gapi.client.docs.documents
        .get({ documentId })
        .then((data) => [
          TOML.parse(exploreGDoc(data.result.body.content))[email] ?? {
            newUser: true,
          },
          email,
        ]);
    }
  });

  async function onsubmit(this: HTMLFormElement, ev: Event) {
    ev.preventDefault();
    const requests = [];
    const [userData, email] = await loadUserData;
    const formData = {};
    for (const [key, value] of new FormData(this).entries()) {
      if (key.includes(".")) {
        const [key0, key1] = key.split(".", 2);
        formData[key0] ??= {};
        formData[key0][key1] = value;
      } else if (key === "Phone" && value !== "") {
        formData[key] = "+" + /\D/g[Symbol.replace](value, "");
      } else {
        formData[key] = value;
      }
    }
    if (userData.newUser) {
      formData.pictureUrl = `${CDN}/${email.substring(0, email.indexOf("@"))}`;
      userData.newUser = false;
      const text = [...stringifyUser(email, formData)].join("\n");
      requests.push({
        insertText: {
          text,
          endOfSegmentLocation: { segmentId: "" },
        },
      });
      loadUserData = Promise.resolve([TOML.parse(text)[email], email]);
    } else if (JSON.stringify(userData) !== JSON.stringify(formData)) {
      const data = await gapi.client.docs.documents.get({ documentId });
      const lines = data.result.body.content.flatMap(
        (p) =>
          p.paragraph?.elements.map(({ startIndex, endIndex, textRun }) => ({
            startIndex,
            endIndex,
            text: textRun.content,
          })) ?? []
      );
      const tableHeader = /^\s*\["[^"]+@[^"]+"\]\s*$/;
      const nonEmptyLine = /\S/;

      let parsingCurrentUser = false;
      let endOfCurrentUserSectionIndex;
      for (const { startIndex, endIndex, text } of lines) {
        if (!nonEmptyLine.test(text)) {
          // Ignore empty lines.
        } else if (tableHeader.test(text)) {
          if (parsingCurrentUser) {
            // We've reached next user.
            break;
          } else if (text.trim() === `[${TOML.stringify(email)}]`) {
            parsingCurrentUser = true;
          }
        } else if (parsingCurrentUser) {
          endOfCurrentUserSectionIndex = endIndex;
          if (containsDeepChange(formData, TOML.parse(text))) {
            const key = text.slice(0, text.indexOf("=")).trim();
            const value = getAssociatedValue(formData, key);
            if (value === "") {
              delete userData[key];
            } else {
              userData[key] = value;
            }
            requests.unshift(
              {
                deleteContentRange: {
                  range: {
                    segmentId: "",
                    startIndex,
                    endIndex,
                  },
                },
              },
              value === ""
                ? undefined
                : {
                    insertText: {
                      location: { index: startIndex, segmentId: "" },
                      text: `${key} = ${TOML.stringify(value)}\n`,
                    },
                  }
            );
          }
        }
      }
      for (const {
        entry: [key, value],
      } of getLeftOverEntries(formData, userData)) {
        userData[key] = value;
        requests.unshift({
          insertText: {
            location: {
              index: endOfCurrentUserSectionIndex,
              segmentId: "",
            },
            text: `${key} = ${TOML.stringify(value)}\n`,
          },
        });
      }

      loadUserData = Promise.resolve([userData, email]);
    }

    if (requests.length) {
      await gapi.client.docs.documents.batchUpdate({
        documentId,
        requests,
      });
    }
  }
</script>

{#await loadUserData}
  <p>...loading</p>
{:then [userData, email]}
  <!-- <p style="color: red">{users}</p> -->
  <Form user={userData} {onsubmit} />
  {#if !userData.newUser}
    <hr />
    <Preview user={userData} emailAddress={email} />
    <hr />
    <ClipboardHandler />
  {/if}
{:catch error}
  <p style="color: red">{error}</p>
{/await}
