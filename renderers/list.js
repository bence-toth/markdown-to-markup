const renderListItem = ({
  token: {children},
  tokenToMarkup
}) => {
  const renderedChildren = children.map(tokenToMarkup)
  const contents = renderedChildren.join('')
  return `<li>${contents}</li>`
}

const renderList = ({
  token: {ordered, children},
  tokenToMarkup
}) => {
  const listElement = ordered ? 'ol' : 'ul'
  const renderedListItems = children.map(
    listItem => renderListItem({
      token: listItem,
      tokenToMarkup
    })
  )
  const contents = renderedListItems.join('')
  return `<${listElement}>${contents}</${listElement}>`
}

module.exports = {renderList}
