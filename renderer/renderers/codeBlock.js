const prism = require('prismjs')
const {microcopy} = require('../../codeBlockCopyToClipboardSnippet')

const addSyntaxHighlight = ({code, language}) => {
  const {[language]: languagePack} = Prism.languages
  if (languagePack) {
    const html = prism.highlight(code, languagePack, language)
    return html
  }
  return code
}

const renderCodeBlock = ({
  token: {lang: language, value: code}
}) => {
  const className = `language-${language}`
  const classAttribute = `class="${className}"`
  const content = addSyntaxHighlight({
    code,
    language
  })
  return `
    <pre ${classAttribute}><code ${classAttribute}>${content}</code></pre>
    <div><button onclick="copyToClipboard(event)">${microcopy.copy}</button></div>
  `
}

module.exports = {renderCodeBlock}
