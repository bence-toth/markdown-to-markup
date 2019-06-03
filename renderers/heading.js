const renderHeading = ({
  token: {depth, children},
  headingLevelOffset,
  tokenToMarkup
}) => {
  const level = Math.min(depth + headingLevelOffset, 6)
  const renderedChildren = children.map(tokenToMarkup)
  const contents = renderedChildren.join('')
  return `<h${level}>${contents}</h${level}>`
}

module.exports = {renderHeading}
