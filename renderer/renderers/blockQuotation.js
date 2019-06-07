const renderBlockQuotation = ({
  token: {children},
  tokenToMarkup
}) => {
  const renderedChildren = children.map(tokenToMarkup)
  const contents = renderedChildren.join('')
  return `<blockquote>${contents}</blockquote>`
}

module.exports = {renderBlockQuotation}
