const renderMiscellaneousParagraph = ({
  children,
  firstWord,
  tokenToMarkup
}) => {
  const firstChild = children[0]
  const className =
    (firstWord === 'DANGER:')  ? 'danger' :
    (firstWord === 'WARNING:') ? 'warning' :
    'notice'
  const updatedFirstChild = {
    ...firstChild,
    value: firstChild.value.replace(
      `${firstWord} `,
      ''
    )
  }
  const renderedChildren = [
    updatedFirstChild,
    ...children.slice(1)
  ].map(tokenToMarkup)
  const contents = renderedChildren.join('')
  return `<p class="${className}">${contents}</p>`
}

const renderParagraph = ({
  token: {
    children
  },
  tokenToMarkup
}) => {
  const firstChild = children[0]
  if (firstChild.type === 'text') {
    const firstWord = firstChild.value.split(' ')[0]
    if (['DANGER:', 'WARNING:', 'NOTICE:'].includes(firstWord)) {
      return renderMiscellaneousParagraph({
        children,
        firstWord,
        tokenToMarkup
      })
    }
  }
  const renderedChildren = children.map(tokenToMarkup)
  const contents = renderedChildren.join('')
  return `<p>${contents}</p>`
}

module.exports = {renderParagraph}
