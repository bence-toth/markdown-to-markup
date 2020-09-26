const headingLevelOffset = 0

const {
  renderBlockQuotation,
  renderCodeBlock,
  renderEmphasis,
  renderFigure,
  renderHeading,
  renderHtml,
  renderImage,
  renderInlineCode,
  renderList,
  renderLink,
  renderParagraph,
  renderStrong,
  renderText,
  renderThematicBreak
} = require('./renderers')

const tokenToMarkup = token => {
  const {type} = token
  const tokenRenderer = {
    blockquote: () => renderBlockQuotation({
      token,
      tokenToMarkup
    }),
    code: () => renderCodeBlock({
      token
    }),
    emphasis: () => renderEmphasis({
      token,
      tokenToMarkup
    }),
    figure: () => renderFigure({token}),
    heading: () => renderHeading({
      token,
      headingLevelOffset,
      tokenToMarkup
    }),
    html: () => renderHtml({token}),
    image: () => renderImage({token}),
    inlineCode: () => renderInlineCode({token}),
    link: () => renderLink({
      token,
      tokenToMarkup
    }),
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
  return tokenRenderer[type]()
}

module.exports = {tokenToMarkup}
