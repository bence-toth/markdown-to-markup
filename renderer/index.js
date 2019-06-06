const headingLevelOffset = 0

const {
  renderEmphasis,
  renderHeading,
  renderHtml,
  renderImage,
  renderInlineCode,
  renderList,
  renderParagraph,
  renderStrong,
  renderText,
  renderThematicBreak
} = require('./renderers')

const tokenToMarkup = token => {
  const {type} = token
  const tokenRenderer = {
    emphasis: () => renderEmphasis({
      token,
      tokenToMarkup
    }),
    heading: () => renderHeading({
      token,
      headingLevelOffset,
      tokenToMarkup
    }),
    html: () => renderHtml({token}),
    image: () => renderImage({token}),
    inlineCode: () => renderInlineCode({token}),
    list: () => renderList({
      token,
      tokenToMarkup
    }),
    paragraph: () => renderParagraph({
      token,
      tokenToMarkup
    }),
    strong: () => renderStrong({
      token,
      tokenToMarkup
    }),
    text: () => renderText({token}),
    thematicBreak: () => renderThematicBreak()
  }
  return tokenRenderer[type] ? tokenRenderer[type]() : ''
}

module.exports = {tokenToMarkup}