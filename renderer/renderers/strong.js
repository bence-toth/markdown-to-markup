const renderStrong = ({
  token: {children},
  tokenToMarkup
}) => {
  const renderedChildren = children.map(tokenToMarkup)
  const contents = renderedChildren.join('')
  return `<strong>${contents}</strong>`
}

module.exports = {renderStrong}
