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

  it('should render correctly with multiple paragraphs', () => {
    const textContents = ['This is a paragraph.', 'This is another paragraph.']
    const markdown = [textContents[0], '', textContents[1]]
      .map(textContent => `> ${textContent}`)
      .join('\n')
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
    expect(blockquoteNode.children.length).toBe(2)
    const paragraphNodes = blockquoteNode.children
    expect(paragraphNodes[0].tagName.toLowerCase()).toBe('p')
    expect(paragraphNodes[0].textContent).toBe(textContents[0])
    expect(paragraphNodes[1].tagName.toLowerCase()).toBe('p')
    expect(paragraphNodes[1].textContent).toBe(textContents[1])
  })

  it('should render correctly with embedded markdown', () => {
    const textContents = ['This is a blockquote', '.']
    const emphasisTextContent = 'with emphasis'
    const markdown = `> ${textContents[0]} **${emphasisTextContent}** ${textContents[1]}`
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
    const fullParagraphText = `${textContents[0]} ${emphasisTextContent} ${textContents[1]}`
    expect(paragraphNode.textContent).toBe(fullParagraphText)
    expect(paragraphNode.children.length).toBe(1)
    const emphasisNode = paragraphNode.children[0]
    expect(emphasisNode.tagName.toLowerCase()).toBe('strong')
    expect(emphasisNode.textContent).toBe(emphasisTextContent)
  })
})

// TODO: Code block (syntax highlighting, copying to clipboard)
describe('Code block', () => {})

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
      const emphasisNode = paragraphNode.children[0]
      const expectedTagName = (paragraphIndex < 2) ? 'em' : 'strong'
      expect(emphasisNode.tagName.toLowerCase()).toBe(expectedTagName)
      expect(emphasisNode.textContent).toBe(textContent)
    })
  })
})

// TODO: Reference resolver - Figure with and without title
describe('Figure', () => {
  it('should render correctly', () => {
    const imageUrl = 'http://www.placecage.com/200/200'
    const altText = 'Alt text'
    const markdown = `![${altText}](${imageUrl})\n`
    const dom = new JSDOM(
      `<!DOCTYPE html>
      <div id="root">
        ${markdownToMarkup(markdown)}
      </div>`
    )
    const root = dom.window.document.getElementById('root')
    expect(root.children.length).toBe(1)
    const wrapperNode = root.children[0]
    expect(wrapperNode.tagName.toLowerCase()).toBe('div')
    expect(wrapperNode.classList.contains('figureWrapper')).toBe(true)
    expect(wrapperNode.children.length).toBe(1)
    const figureNode = wrapperNode.children[0]
    expect(figureNode.tagName.toLowerCase()).toBe('figure')
    expect(figureNode.children.length).toBe(1)
    const imageNode = figureNode.children[0]
    expect(imageNode.tagName.toLowerCase()).toBe('img')
    expect(imageNode.src).toBe(imageUrl)
    expect(imageNode.alt).toBe(altText)
  })

  it('should render correctly with title', () => {
    const imageUrl = 'http://www.placecage.com/200/200'
    const altText = 'Alt text'
    const titleText = 'Title text'
    const markdown = `![${altText}](${imageUrl} "${titleText}")\n`
    const dom = new JSDOM(
      `<!DOCTYPE html>
      <div id="root">
        ${markdownToMarkup(markdown)}
      </div>`
    )
    const root = dom.window.document.getElementById('root')
    expect(root.children.length).toBe(1)
    const wrapperNode = root.children[0]
    expect(wrapperNode.tagName.toLowerCase()).toBe('div')
    expect(wrapperNode.classList.contains('figureWrapper')).toBe(true)
    expect(wrapperNode.children.length).toBe(1)
    const figureNode = wrapperNode.children[0]
    expect(figureNode.tagName.toLowerCase()).toBe('figure')
    expect(figureNode.children.length).toBe(2)
    const imageNode = figureNode.children[0]
    expect(imageNode.tagName.toLowerCase()).toBe('img')
    expect(imageNode.src).toBe(imageUrl)
    expect(imageNode.alt).toBe(altText)
    const captionNode = figureNode.children[1]
    expect(captionNode.tagName.toLowerCase()).toBe('figcaption')
    expect(captionNode.textContent).toBe(titleText)
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

// TODO: Reference resolver - Images with and without title
describe('Image', () => {
  it('should render correctly', () => {
    const imageUrl = 'http://www.placecage.com/200/200'
    const altText = 'Alt text'
    const markdown = `A ![${altText}](${imageUrl}) B\n`
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
    const imageNode = paragraphNode.children[0]
    expect(imageNode.tagName.toLowerCase()).toBe('img')
    expect(imageNode.src).toBe(imageUrl)
    expect(imageNode.alt).toBe(altText)
  })

  it('should render correctly with title', () => {
    const imageUrl = 'http://www.placecage.com/200/200'
    const altText = 'Alt text'
    const titleText = 'Title text'
    const markdown = `A ![${altText}](${imageUrl} "${titleText}") B\n`
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
    const imageNode = paragraphNode.children[0]
    expect(imageNode.tagName.toLowerCase()).toBe('img')
    expect(imageNode.src).toBe(imageUrl)
    expect(imageNode.alt).toBe(altText)
    expect(imageNode.title).toBe(titleText)
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
    const codeNode = paragraphNode.children[0]
    expect(codeNode.tagName.toLowerCase()).toBe('code')
    expect(codeNode.textContent).toBe(textContent)
  })
})

// TODO: Link with embedded markdown (with and without title)
// TODO: Reference resolver - Simple link
// TODO: Reference resolver - Link with embedded markdown
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
    const anchorNode = paragraphNode.children[0]
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
    const anchorNode = paragraphNode.children[0]
    expect(anchorNode.tagName.toLowerCase()).toBe('a')
    expect(anchorNode.textContent).toBe(textContent)
    expect(anchorNode.href).toBe(href)
    expect(anchorNode.title).toBe(title)
  })

  it('should render correctly with auto link', () => {
    const [start, href, end] = ['You should visit', 'https://github.com/', 'for cool stuff.']
    const markdown = `${start} ${href} ${end}`
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
    expect(paragraphNode.textContent).toBe(`${start} ${href} ${end}`)
    const anchorNode = paragraphNode.children[0]
    expect(anchorNode.tagName.toLowerCase()).toBe('a')
    expect(anchorNode.textContent).toBe(href)
    expect(anchorNode.href).toBe(href)
  })

  it('should render correctly with auto email link', () => {
    const [start, email, end] = ['You should write to', 'some.address@domain.com', 'for cool stuff.']
    const markdown = `${start} ${email} ${end}`
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
    expect(paragraphNode.textContent).toBe(`${start} ${email} ${end}`)
    const anchorNode = paragraphNode.children[0]
    expect(anchorNode.tagName.toLowerCase()).toBe('a')
    expect(anchorNode.textContent).toBe(email)
    expect(anchorNode.href).toBe(`mailto:${email}`)
  })
})

// TODO: Lists in lists, lists in lists in lists
describe('List', () => {
  describe('Ordered list', () => {
    it('should render correctly', () => {
      const textContents = ['Some text', 'Some other text', 'Even more text']
      const markdown = textContents
        .map(text => `1. ${text}`)
        .join('\n')
      const dom = new JSDOM(
        `<!DOCTYPE html>
        <div id="root">
          ${markdownToMarkup(markdown)}
        </div>`
      )
      const root = dom.window.document.getElementById('root')
      expect(root.children.length).toBe(1)
      const listNode = root.children[0]
      expect(listNode.tagName.toLowerCase()).toBe('ol')
      expect(listNode.children.length).toBe(3)
      Array.from(listNode.children).forEach((listItem, index) => {
        expect(listItem.tagName.toLowerCase()).toBe('li')
        expect(listItem.children.length).toBe(1)
        expect(listItem.children[0].tagName.toLowerCase()).toBe('p')
        expect(listItem.children[0].textContent).toBe(textContents[index])
      })
    })

    it('should render correctly with embedded markdown', () => {
      const textContents = [
        {
          beginning: 'Some text',
          emphasis: 'with emphasis',
          end: 'inside'
        },
        {
          beginning: 'Some text',
          emphasis: 'with emphasis',
          end: 'inside'
        }
      ]
      const markdownContents = [
        `${textContents[0].beginning} *${textContents[0].emphasis}* ${textContents[0].end}`,
        `${textContents[1].beginning} __${textContents[1].emphasis}__ ${textContents[1].end}`
      ]
      const markdown = markdownContents
        .map(text => `1. ${text}`)
        .join('\n')
      const dom = new JSDOM(
        `<!DOCTYPE html>
        <div id="root">
          ${markdownToMarkup(markdown)}
        </div>`
      )
      const root = dom.window.document.getElementById('root')
      expect(root.children.length).toBe(1)
      const listNode = root.children[0]
      expect(listNode.tagName.toLowerCase()).toBe('ol')
      expect(listNode.children.length).toBe(2)
      const firstListItem = listNode.children[0]
      expect(firstListItem.tagName.toLowerCase()).toBe('li')
      expect(firstListItem.textContent).toBe(
        `${textContents[0].beginning} ${textContents[0].emphasis} ${textContents[0].end}`
      )
      expect(firstListItem.children.length).toBe(1)
      expect(firstListItem.children[0].tagName.toLowerCase()).toBe('p')
      expect(firstListItem.children[0].children.length).toBe(1)
      expect(firstListItem.children[0].children[0].tagName.toLowerCase()).toBe('em')
      expect(firstListItem.children[0].children[0].textContent).toBe(textContents[0].emphasis)
      const secondListItem = listNode.children[0]
      expect(secondListItem.tagName.toLowerCase()).toBe('li')
      expect(secondListItem.textContent).toBe(
        `${textContents[1].beginning} ${textContents[1].emphasis} ${textContents[1].end}`
      )
      expect(secondListItem.children.length).toBe(1)
      expect(secondListItem.children[0].tagName.toLowerCase()).toBe('p')
      expect(secondListItem.children[0].children.length).toBe(1)
      expect(secondListItem.children[0].children[0].tagName.toLowerCase()).toBe('em')
      expect(secondListItem.children[0].children[0].textContent).toBe(textContents[1].emphasis)
    })

    it('should render correctly with multiple paragraphs', () => {
      const subParagraphs = [
        'This is the second paragraph in the list item.',
        'It breaks in two lines for show.'
      ]
      const paragraphs = [
        'This is a list item with two paragraphs.',
        `${subParagraphs[0]}\n    ${subParagraphs[1]}`,
        'Another item in the same list.'
      ]
      const markdown = `1.  ${paragraphs[0]}\n\n    ${paragraphs[1]}\n\n1.  ${paragraphs[2]}`
      const dom = new JSDOM(
        `<!DOCTYPE html>
        <div id="root">
          ${markdownToMarkup(markdown)}
        </div>`
      )
      const root = dom.window.document.getElementById('root')
      expect(root.children.length).toBe(1)
      const listNode = root.children[0]
      expect(listNode.tagName.toLowerCase()).toBe('ol')
      expect(listNode.children.length).toBe(2)
      const firstListItem = listNode.children[0]
      expect(firstListItem.tagName.toLowerCase()).toBe('li')
      expect(firstListItem.textContent).toBe(
        `${paragraphs[0]}${subParagraphs[0]}\n${subParagraphs[1]}`
      )
      expect(firstListItem.children.length).toBe(2)
      expect(firstListItem.children[0].tagName.toLowerCase()).toBe('p')
      expect(firstListItem.children[0].textContent).toBe(paragraphs[0])
      expect(firstListItem.children[1].tagName.toLowerCase()).toBe('p')
      expect(firstListItem.children[1].textContent).toBe(paragraphs[1].replace('    ', ''))
      const secondListItem = listNode.children[1]
      expect(secondListItem.tagName.toLowerCase()).toBe('li')
      expect(secondListItem.children.length).toBe(1)
      expect(secondListItem.children[0].tagName.toLowerCase()).toBe('p')
      expect(secondListItem.children[0].textContent).toBe(paragraphs[2])
    })
  })

  describe('Unordered list', () => {
    it('should render correctly with * syntax', () => {
      const textContents = ['Some text', 'Some other text', 'Even more text']
      const markdown = textContents
        .map(text => `* ${text}`)
        .join('\n')
      const dom = new JSDOM(
        `<!DOCTYPE html>
        <div id="root">
          ${markdownToMarkup(markdown)}
        </div>`
      )
      const root = dom.window.document.getElementById('root')
      expect(root.children.length).toBe(1)
      const listNode = root.children[0]
      expect(listNode.tagName.toLowerCase()).toBe('ul')
      expect(listNode.children.length).toBe(3)
      Array.from(listNode.children).forEach((listItem, index) => {
        expect(listItem.tagName.toLowerCase()).toBe('li')
        expect(listItem.children.length).toBe(1)
        expect(listItem.children[0].tagName.toLowerCase()).toBe('p')
        expect(listItem.children[0].textContent).toBe(textContents[index])
      })
    })

    it('should render correctly with - syntax', () => {
      const textContents = ['Some text', 'Some other text', 'Even more text']
      const markdown = textContents
        .map(text => `- ${text}`)
        .join('\n')
      const dom = new JSDOM(
        `<!DOCTYPE html>
        <div id="root">
          ${markdownToMarkup(markdown)}
        </div>`
      )
      const root = dom.window.document.getElementById('root')
      expect(root.children.length).toBe(1)
      const listNode = root.children[0]
      expect(listNode.tagName.toLowerCase()).toBe('ul')
      expect(listNode.children.length).toBe(3)
      Array.from(listNode.children).forEach((listItem, index) => {
        expect(listItem.tagName.toLowerCase()).toBe('li')
        expect(listItem.children.length).toBe(1)
        expect(listItem.children[0].tagName.toLowerCase()).toBe('p')
        expect(listItem.children[0].textContent).toBe(textContents[index])
      })
    })

    it('should render correctly with + syntax', () => {
      const textContents = ['Some text', 'Some other text', 'Even more text']
      const markdown = textContents
        .map(text => `+ ${text}`)
        .join('\n')
      const dom = new JSDOM(
        `<!DOCTYPE html>
        <div id="root">
          ${markdownToMarkup(markdown)}
        </div>`
      )
      const root = dom.window.document.getElementById('root')
      expect(root.children.length).toBe(1)
      const listNode = root.children[0]
      expect(listNode.tagName.toLowerCase()).toBe('ul')
      expect(listNode.children.length).toBe(3)
      Array.from(listNode.children).forEach((listItem, index) => {
        expect(listItem.tagName.toLowerCase()).toBe('li')
        expect(listItem.children.length).toBe(1)
        expect(listItem.children[0].tagName.toLowerCase()).toBe('p')
        expect(listItem.children[0].textContent).toBe(textContents[index])
      })
    })

    it('should render correctly with * syntax and embedded markdown', () => {
      const textContents = [
        {
          beginning: 'Some text',
          emphasis: 'with emphasis',
          end: 'inside'
        },
        {
          beginning: 'Some text',
          emphasis: 'with emphasis',
          end: 'inside'
        }
      ]
      const markdownContents = [
        `${textContents[0].beginning} *${textContents[0].emphasis}* ${textContents[0].end}`,
        `${textContents[1].beginning} __${textContents[1].emphasis}__ ${textContents[1].end}`
      ]
      const markdown = markdownContents
        .map(text => `* ${text}`)
        .join('\n')
      const dom = new JSDOM(
        `<!DOCTYPE html>
        <div id="root">
          ${markdownToMarkup(markdown)}
        </div>`
      )
      const root = dom.window.document.getElementById('root')
      expect(root.children.length).toBe(1)
      const listNode = root.children[0]
      expect(listNode.tagName.toLowerCase()).toBe('ul')
      expect(listNode.children.length).toBe(2)
      const firstListItem = listNode.children[0]
      expect(firstListItem.tagName.toLowerCase()).toBe('li')
      expect(firstListItem.textContent).toBe(
        `${textContents[0].beginning} ${textContents[0].emphasis} ${textContents[0].end}`
      )
      expect(firstListItem.children.length).toBe(1)
      expect(firstListItem.children[0].tagName.toLowerCase()).toBe('p')
      expect(firstListItem.children[0].children.length).toBe(1)
      expect(firstListItem.children[0].children[0].tagName.toLowerCase()).toBe('em')
      expect(firstListItem.children[0].children[0].textContent).toBe(textContents[0].emphasis)
      const secondListItem = listNode.children[0]
      expect(secondListItem.tagName.toLowerCase()).toBe('li')
      expect(secondListItem.textContent).toBe(
        `${textContents[1].beginning} ${textContents[1].emphasis} ${textContents[1].end}`
      )
      expect(secondListItem.children.length).toBe(1)
      expect(secondListItem.children[0].tagName.toLowerCase()).toBe('p')
      expect(secondListItem.children[0].children.length).toBe(1)
      expect(secondListItem.children[0].children[0].tagName.toLowerCase()).toBe('em')
      expect(secondListItem.children[0].children[0].textContent).toBe(textContents[1].emphasis)
    })

    it('should render correctly with - syntax and embedded markdown', () => {
      const textContents = [
        {
          beginning: 'Some text',
          emphasis: 'with emphasis',
          end: 'inside'
        },
        {
          beginning: 'Some text',
          emphasis: 'with emphasis',
          end: 'inside'
        }
      ]
      const markdownContents = [
        `${textContents[0].beginning} *${textContents[0].emphasis}* ${textContents[0].end}`,
        `${textContents[1].beginning} __${textContents[1].emphasis}__ ${textContents[1].end}`
      ]
      const markdown = markdownContents
        .map(text => `- ${text}`)
        .join('\n')
      const dom = new JSDOM(
        `<!DOCTYPE html>
        <div id="root">
          ${markdownToMarkup(markdown)}
        </div>`
      )
      const root = dom.window.document.getElementById('root')
      expect(root.children.length).toBe(1)
      const listNode = root.children[0]
      expect(listNode.tagName.toLowerCase()).toBe('ul')
      expect(listNode.children.length).toBe(2)
      const firstListItem = listNode.children[0]
      expect(firstListItem.tagName.toLowerCase()).toBe('li')
      expect(firstListItem.textContent).toBe(
        `${textContents[0].beginning} ${textContents[0].emphasis} ${textContents[0].end}`
      )
      expect(firstListItem.children.length).toBe(1)
      expect(firstListItem.children[0].tagName.toLowerCase()).toBe('p')
      expect(firstListItem.children[0].children.length).toBe(1)
      expect(firstListItem.children[0].children[0].tagName.toLowerCase()).toBe('em')
      expect(firstListItem.children[0].children[0].textContent).toBe(textContents[0].emphasis)
      const secondListItem = listNode.children[0]
      expect(secondListItem.tagName.toLowerCase()).toBe('li')
      expect(secondListItem.textContent).toBe(
        `${textContents[1].beginning} ${textContents[1].emphasis} ${textContents[1].end}`
      )
      expect(secondListItem.children.length).toBe(1)
      expect(secondListItem.children[0].tagName.toLowerCase()).toBe('p')
      expect(secondListItem.children[0].children.length).toBe(1)
      expect(secondListItem.children[0].children[0].tagName.toLowerCase()).toBe('em')
      expect(secondListItem.children[0].children[0].textContent).toBe(textContents[1].emphasis)
    })

    it('should render correctly with + syntax and embedded markdown', () => {
      const textContents = [
        {
          beginning: 'Some text',
          emphasis: 'with emphasis',
          end: 'inside'
        },
        {
          beginning: 'Some text',
          emphasis: 'with emphasis',
          end: 'inside'
        }
      ]
      const markdownContents = [
        `${textContents[0].beginning} *${textContents[0].emphasis}* ${textContents[0].end}`,
        `${textContents[1].beginning} __${textContents[1].emphasis}__ ${textContents[1].end}`
      ]
      const markdown = markdownContents
        .map(text => `+ ${text}`)
        .join('\n')
      const dom = new JSDOM(
        `<!DOCTYPE html>
        <div id="root">
          ${markdownToMarkup(markdown)}
        </div>`
      )
      const root = dom.window.document.getElementById('root')
      expect(root.children.length).toBe(1)
      const listNode = root.children[0]
      expect(listNode.tagName.toLowerCase()).toBe('ul')
      expect(listNode.children.length).toBe(2)
      const firstListItem = listNode.children[0]
      expect(firstListItem.tagName.toLowerCase()).toBe('li')
      expect(firstListItem.textContent).toBe(
        `${textContents[0].beginning} ${textContents[0].emphasis} ${textContents[0].end}`
      )
      expect(firstListItem.children.length).toBe(1)
      expect(firstListItem.children[0].tagName.toLowerCase()).toBe('p')
      expect(firstListItem.children[0].children.length).toBe(1)
      expect(firstListItem.children[0].children[0].tagName.toLowerCase()).toBe('em')
      expect(firstListItem.children[0].children[0].textContent).toBe(textContents[0].emphasis)
      const secondListItem = listNode.children[0]
      expect(secondListItem.tagName.toLowerCase()).toBe('li')
      expect(secondListItem.textContent).toBe(
        `${textContents[1].beginning} ${textContents[1].emphasis} ${textContents[1].end}`
      )
      expect(secondListItem.children.length).toBe(1)
      expect(secondListItem.children[0].tagName.toLowerCase()).toBe('p')
      expect(secondListItem.children[0].children.length).toBe(1)
      expect(secondListItem.children[0].children[0].tagName.toLowerCase()).toBe('em')
      expect(secondListItem.children[0].children[0].textContent).toBe(textContents[1].emphasis)
    })

    it('should render correctly with * syntax with multiple paragraphs', () => {
      const subParagraphs = [
        'This is the second paragraph in the list item.',
        'It breaks in two lines for show.'
      ]
      const paragraphs = [
        'This is a list item with two paragraphs.',
        `${subParagraphs[0]}\n    ${subParagraphs[1]}`,
        'Another item in the same list.'
      ]
      const markdown = `*   ${paragraphs[0]}\n\n    ${paragraphs[1]}\n\n*   ${paragraphs[2]}`
      const dom = new JSDOM(
        `<!DOCTYPE html>
        <div id="root">
          ${markdownToMarkup(markdown)}
        </div>`
      )
      const root = dom.window.document.getElementById('root')
      expect(root.children.length).toBe(1)
      const listNode = root.children[0]
      expect(listNode.tagName.toLowerCase()).toBe('ul')
      expect(listNode.children.length).toBe(2)
      const firstListItem = listNode.children[0]
      expect(firstListItem.tagName.toLowerCase()).toBe('li')
      expect(firstListItem.textContent).toBe(
        `${paragraphs[0]}${subParagraphs[0]}\n${subParagraphs[1]}`
      )
      expect(firstListItem.children.length).toBe(2)
      expect(firstListItem.children[0].tagName.toLowerCase()).toBe('p')
      expect(firstListItem.children[0].textContent).toBe(paragraphs[0])
      expect(firstListItem.children[1].tagName.toLowerCase()).toBe('p')
      expect(firstListItem.children[1].textContent).toBe(paragraphs[1].replace('    ', ''))
      const secondListItem = listNode.children[1]
      expect(secondListItem.tagName.toLowerCase()).toBe('li')
      expect(secondListItem.children.length).toBe(1)
      expect(secondListItem.children[0].tagName.toLowerCase()).toBe('p')
      expect(secondListItem.children[0].textContent).toBe(paragraphs[2])
    })

    it('should render correctly with - syntax with multiple paragraphs', () => {
      const subParagraphs = [
        'This is the second paragraph in the list item.',
        'It breaks in two lines for show.'
      ]
      const paragraphs = [
        'This is a list item with two paragraphs.',
        `${subParagraphs[0]}\n    ${subParagraphs[1]}`,
        'Another item in the same list.'
      ]
      const markdown = `-   ${paragraphs[0]}\n\n    ${paragraphs[1]}\n\n-   ${paragraphs[2]}`
      const dom = new JSDOM(
        `<!DOCTYPE html>
        <div id="root">
          ${markdownToMarkup(markdown)}
        </div>`
      )
      const root = dom.window.document.getElementById('root')
      expect(root.children.length).toBe(1)
      const listNode = root.children[0]
      expect(listNode.tagName.toLowerCase()).toBe('ul')
      expect(listNode.children.length).toBe(2)
      const firstListItem = listNode.children[0]
      expect(firstListItem.tagName.toLowerCase()).toBe('li')
      expect(firstListItem.textContent).toBe(
        `${paragraphs[0]}${subParagraphs[0]}\n${subParagraphs[1]}`
      )
      expect(firstListItem.children.length).toBe(2)
      expect(firstListItem.children[0].tagName.toLowerCase()).toBe('p')
      expect(firstListItem.children[0].textContent).toBe(paragraphs[0])
      expect(firstListItem.children[1].tagName.toLowerCase()).toBe('p')
      expect(firstListItem.children[1].textContent).toBe(paragraphs[1].replace('    ', ''))
      const secondListItem = listNode.children[1]
      expect(secondListItem.tagName.toLowerCase()).toBe('li')
      expect(secondListItem.children.length).toBe(1)
      expect(secondListItem.children[0].tagName.toLowerCase()).toBe('p')
      expect(secondListItem.children[0].textContent).toBe(paragraphs[2])
    })

    it('should render correctly with + syntax with multiple paragraphs', () => {
      const subParagraphs = [
        'This is the second paragraph in the list item.',
        'It breaks in two lines for show.'
      ]
      const paragraphs = [
        'This is a list item with two paragraphs.',
        `${subParagraphs[0]}\n    ${subParagraphs[1]}`,
        'Another item in the same list.'
      ]
      const markdown = `+   ${paragraphs[0]}\n\n    ${paragraphs[1]}\n\n+   ${paragraphs[2]}`
      const dom = new JSDOM(
        `<!DOCTYPE html>
        <div id="root">
          ${markdownToMarkup(markdown)}
        </div>`
      )
      const root = dom.window.document.getElementById('root')
      expect(root.children.length).toBe(1)
      const listNode = root.children[0]
      expect(listNode.tagName.toLowerCase()).toBe('ul')
      expect(listNode.children.length).toBe(2)
      const firstListItem = listNode.children[0]
      expect(firstListItem.tagName.toLowerCase()).toBe('li')
      expect(firstListItem.textContent).toBe(
        `${paragraphs[0]}${subParagraphs[0]}\n${subParagraphs[1]}`
      )
      expect(firstListItem.children.length).toBe(2)
      expect(firstListItem.children[0].tagName.toLowerCase()).toBe('p')
      expect(firstListItem.children[0].textContent).toBe(paragraphs[0])
      expect(firstListItem.children[1].tagName.toLowerCase()).toBe('p')
      expect(firstListItem.children[1].textContent).toBe(paragraphs[1].replace('    ', ''))
      const secondListItem = listNode.children[1]
      expect(secondListItem.tagName.toLowerCase()).toBe('li')
      expect(secondListItem.children.length).toBe(1)
      expect(secondListItem.children[0].tagName.toLowerCase()).toBe('p')
      expect(secondListItem.children[0].textContent).toBe(paragraphs[2])
    })
  })
})

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

  it('should render with embedded markdown correctly', () => {
    const textContents = ['Some text', 'inside.']
    const emphasisContent = 'with emphasis'
    const textContent = `${textContents[0]} **${emphasisContent}** ${textContents[1]}`
    const dom = new JSDOM(
      `<!DOCTYPE html>
      <div id="root">
        ${markdownToMarkup(textContent)}
      </div>`
    )
  const root = dom.window.document.getElementById('root')
    expect(root.children.length).toBe(1)
    const paragraphNode = root.children[0]
    expect(paragraphNode.tagName.toLowerCase()).toBe('p')
    expect(paragraphNode.textContent).toBe(
      `${textContents[0]} ${emphasisContent} ${textContents[1]}`
    )
    expect(paragraphNode.children.length).toBe(1)
    const emphasisNode = paragraphNode.children[0]
    expect(emphasisNode.tagName.toLowerCase()).toBe('strong')
    expect(emphasisNode.textContent).toBe(emphasisContent)
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

// TODO: Backslash escaping
describe('Backslash escaping', () => {})
