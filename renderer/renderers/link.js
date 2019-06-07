const renderLink = ({
  token: {children, title, url},
  tokenToMarkup
}) => {
  const hrefAttribute = `href="${url}"`
  const titleAttribute = title
    ? `title="${title}"`
    : ''
  const attributes = `${hrefAttribute} ${titleAttribute}`
  const renderedChildren = children.map(tokenToMarkup)
  const contents = renderedChildren.join('')
  return `<a ${attributes}>${contents}</a>`
}

module.exports = {renderLink}