const microcopy = {
  copy: 'Copy to clipboard',
  copySuccessful: 'Copied to clipboard',
  copyFailed: 'Failed to copy to clipboard'
}

const copyMessageDuration = 1000

const codeBlockCopyToClipboardSnippet = `
  <script>
    const copyToClipboard = event => {
      const textToCopy = event
        .target
        .parentNode
        .previousElementSibling
        .firstElementChild
        .innerText
      navigator.clipboard.writeText(textToCopy).then(
        () => {
          event.target.disabled = true
          event.target.textContent = '${microcopy.copySuccessful}'
          setTimeout(() => {
            event.target.textContent = '${microcopy.copy}'
            event.target.disabled = false
          }, ${copyMessageDuration})
        },
        () => {
          event.target.disabled = true
          event.target.textContent = '${microcopy.copySuccessful}'
          setTimeout(() => {
            event.target.textContent = '${microcopy.copy}'
            event.target.disabled = false
          }, ${copyMessageDuration})
        })
    }
  </script>
`
module.exports = {codeBlockCopyToClipboardSnippet, microcopy}
