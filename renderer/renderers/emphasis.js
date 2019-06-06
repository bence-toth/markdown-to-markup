const renderEmphasis = ({
  token: {children},
  tokenToMarkup
}) => {
  const renderedChildren = children.map(tokenToMarkup)
  const contents = renderedChildren.join('')
  return `<em>${contents}</em>`
}

module.exports = {renderEmphasis}
