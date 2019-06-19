const {markdownToMarkup} = require('./index')
const {JSDOM} = require('jsdom')

describe('Headings', () => {
  it('with # syntax should render correctly', () => {
    const text = 'Heading'
    const headings = [
      `# ${text}`,
      `## ${text}`,
      `### ${text}`,
      `#### ${text}`,
      `##### ${text}`,
      `###### ${text}`
    ]
    headings.map((heading, headingIndex) => {
      const dom = new JSDOM(`<!DOCTYPE html><div id="root">${markdownToMarkup(heading)}</div>`)
      const root = dom.window.document.getElementById('root')
      expect(root.children.length).toBe(1)
      expect(root.children[0].tagName).toBe(`H${headingIndex + 1}`)
      expect(root.children[0].textContent).toBe(text)
    })
  })

  it('with =/- syntax should render correctly', () => {
    const text = 'Heading'
    const headings = [
      `${text}\n=======`,
      `${text}\n-------`,
    ]
    headings.map((heading, headingIndex) => {
      const dom = new JSDOM(`<!DOCTYPE html><div id="root">${markdownToMarkup(heading)}</div>`)
      const root = dom.window.document.getElementById('root')
      expect(root.children.length).toBe(1)
      expect(root.children[0].tagName).toBe(`H${headingIndex + 1}`)
      expect(root.children[0].textContent).toBe(text)
    })
  })
})

