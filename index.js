const {tokenize} = require('./tokenizer')
const {tokenToMarkup} = require('./renderer')
const {resolveReferences} = require('./referenceResolver')

const markdownToMarkup = markdown =>
  resolveReferences(
    tokenize(markdown)
  )
    .map(tokenToMarkup)
    .join('\n')

module.exports = {markdownToMarkup}