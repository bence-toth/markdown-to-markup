const prism = require('prismjs')

const microcopy = {
  copy: 'Copy to clipboard',
  copySuccessful: 'Copied to clipboard',
  copyFailed: 'Failed to copy to clipboard'
}

const copyMessageDuration = 1000

const addSyntaxHighlight = ({code, language}) => {
  const {[language]: languagePack} = Prism.languages
  if (languagePack) {
    const html = prism.highlight(code, languagePack, language)
    return html
  }
  return code
}

let isFirstCodeBlock = true

const renderCodeBlock = ({
  token: {lang: language, value: code}
}) => {
  const className = `language-${language}`
  const classAttribute = `class="${className}"`
  const content = addSyntaxHighlight({
    code,
    language
  })
  const script = isFirstCodeBlock
    ? `
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
    : ''
  isFirstCodeBlock = false
  return `
    ${script}
    <pre ${classAttribute}><code ${classAttribute}>${content}</code></pre>
    <div><button onclick="copyToClipboard(event)">${microcopy.copy}</button></div>
  `

}

module.exports = {renderCodeBlock}
