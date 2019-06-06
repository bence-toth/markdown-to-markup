const fs = require('fs')
const {tokenize} = require('./tokenizer')
const {tokenToMarkup} = require('./renderer')
const {resolveReferences} = require('./referenceResolver')

fs.readFile('test.md', 'utf8', (error, markdownContent) => {
  if (!error) {
    const markup =
      resolveReferences(
        tokenize(markdownContent)
      )
        .map(tokenToMarkup)
        .join('\n')
    fs.writeFile('index.html', markup, error => {
      if (error) {
        console.err(error)
      }
      else {
        console.log('HTML content was successfully written to index.html.\n')
      }
    })
  }
  else {
    console.err(error)
  }
})

