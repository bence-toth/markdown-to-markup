const {markdownToMarkup} = require('./index')
const {JSDOM} = require('jsdom')

describe('Blockquote', () => {
  it('should render correctly', () => {
    const textContent = 'This is a blockquote.'
    const markdown = `> ${textContent}`
    const dom = new JSDOM(
      `<!DOCTYPE html>
      <div id="root">
        ${markdownToMarkup(markdown)}
      </div>`
    )
    const root = dom.window.document.getElementById('root')
    expect(root.children.length).toBe(1)
    const blockquoteNode = root.children[0]
    expect(blockquoteNode.tagName.toLowerCase()).toBe('blockquote')
    expect(blockquoteNode.children.length).toBe(1)
    const paragraphNode = blockquoteNode.children[0]
    expect(paragraphNode.tagName.toLowerCase()).toBe('p')
    expect(paragraphNode.textContent).toBe(textContent)
  })
})

describe('Emphasis', () => {
  it('should render correctly with every syntax', () => {
    const textContent = 'emphasis'
    const paragraphs = [
      `Some _${textContent}_ here.`,
      `Some *${textContent}* here.`,
      `Some __${textContent}__ here.`,
      `Some **${textContent}** here.`
    ]
    paragraphs.map((paragraph, paragraphIndex) => {
      const dom = new JSDOM(
        `<!DOCTYPE html>
        <div id="root">
          ${markdownToMarkup(paragraph)}
        </div>`
      )
      const root = dom.window.document.getElementById('root')
      expect(root.children.length).toBe(1)
      const paragraphNode = root.children[0]
      expect(paragraphNode.children.length).toBe(1)
      const emphasisNode = root.children[0].children[0]
      const expectedTagName = (paragraphIndex < 2) ? 'em' : 'strong'
      expect(emphasisNode.tagName.toLowerCase()).toBe(expectedTagName)
      expect(emphasisNode.textContent).toBe(textContent)
    })
  })
})

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
      const dom = new JSDOM(
        `<!DOCTYPE html>
        <div id="root">
          ${markdownToMarkup(heading)}
        </div>`
      )
      const root = dom.window.document.getElementById('root')
      expect(root.children.length).toBe(1)
      expect(root.children[0].tagName.toLowerCase()).toBe(`h${headingIndex + 1}`)
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
      const dom = new JSDOM(
        `<!DOCTYPE html>
        <div id="root">
          ${markdownToMarkup(heading)}
        </div>`
      )
      const root = dom.window.document.getElementById('root')
      expect(root.children.length).toBe(1)
      expect(root.children[0].tagName.toLowerCase()).toBe(`h${headingIndex + 1}`)
      expect(root.children[0].textContent).toBe(text)
    })
  })
})

describe('HTML code', () => {
  it('should render intact', () => {
    const delContent = 'custom HTML'
    const smallContent = 'not be a problem'
    const markdown =
      `Some <del>${delContent}</del> should`
        + `<small>${smallContent}</small> at all.`
    const dom = new JSDOM(
      `<!DOCTYPE html>
      <div id="root">
        ${markdownToMarkup(markdown)}
      </div>`
    )
    const root = dom.window.document.getElementById('root')
    expect(root.children.length).toBe(1)
    const paragraphNode = root.children[0]
    expect(paragraphNode.children.length).toBe(2)
    const delNode = root.children[0].children[0]
    expect(delNode.tagName.toLowerCase()).toBe('del')
    expect(delNode.textContent).toBe(delContent)
    const smallNode = root.children[0].children[1]
    expect(smallNode.tagName.toLowerCase()).toBe('small')
    expect(smallNode.textContent).toBe(smallContent)
  })
})

describe('Link', () => {
  it('should render correctly', () => {
    const href = 'https://github.com/'
    const textContent = 'Link'
    const restOfTheParagraph = ' in a paragraph'
    const markdown = `[${textContent}](${href})${restOfTheParagraph}`
    const dom = new JSDOM(
      `<!DOCTYPE html>
      <div id="root">
        ${markdownToMarkup(markdown)}
      </div>`
    )
    const root = dom.window.document.getElementById('root')
    expect(root.children.length).toBe(1)
    const paragraphNode = root.children[0]
    expect(paragraphNode.children.length).toBe(1)
    expect(paragraphNode.textContent).toBe(`${textContent}${restOfTheParagraph}`)
    const anchorNode = root.children[0].children[0]
    expect(anchorNode.tagName.toLowerCase()).toBe('a')
    expect(anchorNode.textContent).toBe(textContent)
    expect(anchorNode.href).toBe(href)
  })

  it('should render correctly with title', () => {
    const href = 'https://github.com/'
    const textContent = 'Link'
    const title = 'Link title'
    const restOfTheParagraph = ' in a paragraph'
    const markdown = `[${textContent}](${href} "${title}")${restOfTheParagraph}`
    const dom = new JSDOM(
      `<!DOCTYPE html>
      <div id="root">
        ${markdownToMarkup(markdown)}
      </div>`
    )
    const root = dom.window.document.getElementById('root')
    expect(root.children.length).toBe(1)
    const paragraphNode = root.children[0]
    expect(paragraphNode.children.length).toBe(1)
    expect(paragraphNode.textContent).toBe(`${textContent}${restOfTheParagraph}`)
    const anchorNode = root.children[0].children[0]
    expect(anchorNode.tagName.toLowerCase()).toBe('a')
    expect(anchorNode.textContent).toBe(textContent)
    expect(anchorNode.href).toBe(href)
    expect(anchorNode.title).toBe(title)
  })
})

describe('Inline code', () => {
  it('should render correctly', () => {
    const textContent = 'run()'
    const markdown = `You can just call \`${textContent}\` to start.`
    const dom = new JSDOM(
      `<!DOCTYPE html>
      <div id="root">
        ${markdownToMarkup(markdown)}
      </div>`
    )
    const root = dom.window.document.getElementById('root')
    expect(root.children.length).toBe(1)
    const paragraphNode = root.children[0]
    expect(paragraphNode.children.length).toBe(1)
    const codeNode = root.children[0].children[0]
    expect(codeNode.tagName.toLowerCase()).toBe('code')
    expect(codeNode.textContent).toBe(textContent)
  })
})

describe('Paragraph', () => {
  it('should render correctly', () => {
    const textContent = 'Some text'
    const dom = new JSDOM(
      `<!DOCTYPE html>
      <div id="root">
        ${markdownToMarkup(textContent)}
      </div>`
    )
  const root = dom.window.document.getElementById('root')
    expect(root.children.length).toBe(1)
    expect(root.children[0].tagName.toLowerCase()).toBe('p')
    expect(root.children[0].textContent).toBe(textContent)
  })
})

describe('Thematic break', () => {
  it('should render correctly', () => {
    const markdown = 'Some text\n\n-----\n\nSome more text'
    const dom = new JSDOM(
      `<!DOCTYPE html>
      <div id="root">
        ${markdownToMarkup(markdown)}
      </div>`
    )
  const root = dom.window.document.getElementById('root')
    expect(root.children.length).toBe(3)
    expect(root.children[1].tagName.toLowerCase()).toBe('hr')
  })
})

// Blockquote with embedded markdown
// Code block (syntax highlighting, copying to clipboard)
// Headings with embedded markdown
// Image with and without title
// Link with embedded markdown (with and without title)
// Paragraph with embedded markdown
// Danger, warning, notice boxes
// Ordered list of simple paragraphs
// Ordered list of paragraphs with embedded markdown
// Unordered list of simple paragraphs
// Unordered list of paragraphs with embedded markdown
// Lists in lists, lists in lists in lists
// Auto links
// Reference resolver - Simple link
// Reference resolver - Link with embedded markdown
// Reference resolver - Images with and without title
