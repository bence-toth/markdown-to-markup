const {markdownToMarkup} = require('./index')
const {JSDOM} = require('jsdom')

// TODO: Blockquote with embedded markdown
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

// TODO: Code block (syntax highlighting, copying to clipboard)

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
    const textContent = 'Heading'
    const headings = [
      `# ${textContent}`,
      `## ${textContent}`,
      `### ${textContent}`,
      `#### ${textContent}`,
      `##### ${textContent}`,
      `###### ${textContent}`
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
      expect(root.children[0].textContent).toBe(textContent)
    })
  })

  it('with =/- syntax should render correctly', () => {
    const textContent = 'Heading'
    const headings = [
      `${textContent}\n=======`,
      `${textContent}\n-------`,
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
      expect(root.children[0].textContent).toBe(textContent)
    })
  })

  it('with nested markdown it should render correctly', () => {
    const [start, emphasis, end] = ['Heading with', 'emphasis', 'inside']
    const headingMarkdownContent = `${start} **${emphasis}** ${end}`
    const headings = [
      `# ${headingMarkdownContent}`,
      `## ${headingMarkdownContent}`,
      `### ${headingMarkdownContent}`,
      `#### ${headingMarkdownContent}`,
      `##### ${headingMarkdownContent}`,
      `###### ${headingMarkdownContent}`
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
      const headingNode = root.children[0]
      expect(headingNode.children.length).toBe(1)
      expect(headingNode.tagName.toLowerCase()).toBe(`h${headingIndex + 1}`)
      expect(headingNode.textContent).toBe(`${start} ${emphasis} ${end}`)
      const emphasisNode = headingNode.children[0]
      expect(emphasisNode.tagName.toLowerCase()).toBe('strong')
      expect(emphasisNode.textContent).toBe(emphasis)
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
    const delNode = paragraphNode.children[0]
    expect(delNode.tagName.toLowerCase()).toBe('del')
    expect(delNode.textContent).toBe(delContent)
    const smallNode = paragraphNode.children[1]
    expect(smallNode.tagName.toLowerCase()).toBe('small')
    expect(smallNode.textContent).toBe(smallContent)
  })
})

// TODO: Image with and without title
// TODO: Reference resolver - Images with and without title

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

// TODO: Link with embedded markdown (with and without title)
// TODO: Reference resolver - Simple link
// TODO: Reference resolver - Link with embedded markdown
// TODO: Auto links
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

// TODO: Ordered list of simple paragraphs
// TODO: Ordered list of paragraphs with embedded markdown
// TODO: Unordered list of simple paragraphs
// TODO: Unordered list of paragraphs with embedded markdown
// TODO: Lists in lists, lists in lists in lists

// TODO: Paragraph with embedded markdown
// TODO: Danger, warning, notice boxes
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
