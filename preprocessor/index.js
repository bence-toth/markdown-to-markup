const transformFigures = tokens => {
  const isFigure = token => (
    (token.type === 'paragraph')
      && (token.children && (token.children.length === 1))
      && (token.children[0].type === 'image')
  )
  const transformFigure = token => ({
    ...(token.children[0]),
    type: 'figure'
  })
  return tokens.map(token => (
    isFigure(token)
      ? transformFigure(token)
      : token
  ))
}

module.exports = {transformFigures}
