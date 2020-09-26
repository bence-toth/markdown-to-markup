const {tokenize} = require('./tokenizer')
const {tokenToMarkup} = require('./renderer')
const {resolveReferences} = require('./referenceResolver')
const {transformFigures} = require('./preprocessor')
const {codeBlockCopyToClipboardSnippet} = require('./codeBlockCopyToClipboardSnippet')

const markdownToMarkup = markdown => {
  const tokens = transformFigures(
    resolveReferences(
      tokenize(markdown)
    )
  )
  const includesCodeBlock = (
    tokens
      .find(({type}) => type === 'code') !== undefined
  )
  const markup = (
    tokens
      .map(tokenToMarkup)
      .join('\n')
  )
  if (includesCodeBlock) {
    return `${codeBlockCopyToClipboardSnippet}${markup}`
  }
  return markup
}

module.exports = {markdownToMarkup}