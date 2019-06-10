const {markdownToMarkup} = require('./index')

test('Renders headings correctly', () => {
  const text = 'Heading'
  const headings = [
    [`# ${text}`, `<h1>${text}</h1>`],
    [`## ${text}`, `<h2>${text}</h2>`],
    [`### ${text}`, `<h3>${text}</h3>`],
    [`#### ${text}`, `<h4>${text}</h4>`],
    [`##### ${text}`, `<h5>${text}</h5>`],
    [`###### ${text}`, `<h6>${text}</h6>`]
  ]
  headings.map(([markdown, markup]) => {
    expect(markdownToMarkup(markdown)).toBe(markup)
  })
})

test('Renders underscore headings correctly', () => {
  const text = 'Heading'
  const headings = [
    [`${text}\n=======`, `<h1>${text}</h1>`],
    [`${text}\n-------`, `<h2>${text}</h2>`]
  ]
  headings.map(([markdown, markup]) => {
    expect(markdownToMarkup(markdown)).toBe(markup)
  })
})
