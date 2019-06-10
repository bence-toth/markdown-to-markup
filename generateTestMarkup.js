const fs = require('fs')
const {markdownToMarkup} = require('./index')

fs.readFile('test.md', 'utf8', (error, markdown) => {
  if (!error) {
    const markup = markdownToMarkup(markdown)
    fs.writeFile('test.html', markup, error => {
      if (error) {
        console.err(error)
      }
      else {
        console.log('HTML content was successfully written to test.html.\n')
      }
    })
  }
  else {
    console.err(error)
  }
})

