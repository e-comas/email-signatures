<script lang="ts">
  const getSignatureHTML = () => document.getElementById("signature").outerHTML;

  function copyHTML(e) {
    e.preventDefault();
    navigator.clipboard.write([
      new ClipboardItem({
        "text/html": new Blob([getSignatureHTML()], { type: "text/html" }),
      }),
    ]);
  }
  function copyPlainHTML(e) {
    e.preventDefault();
    navigator.clipboard.writeText(getSignatureHTML());
  }
</script>

<button on:click={copyHTML}>Copy signature</button>
<button on:click={copyPlainHTML}>Copy HTML code</button>
