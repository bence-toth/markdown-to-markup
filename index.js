const {tokenize} = require('./tokenizer')
const {tokenToMarkup} = require('./renderer')
const {resolveReferences} = require('./referenceResolver')
const {transformFigures} = require('./preprocessor')

const markdownToMarkup = markdown =>
  transformFigures(
    resolveReferences(
      tokenize(markdown)
    )
  )
    .map(tokenToMarkup)
    .join('\n')

module.exports = {markdownToMarkup}