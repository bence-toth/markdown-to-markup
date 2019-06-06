const resolveReferences = tokens => {
  const definitions = tokens.filter(
    ({type}) => (type === 'definition')
  )
  const resolveReferencesInSubtree = token => {
    const {type, alt, identifier: id, position, children} = token
    if (type === 'imageReference') {
      const {title, url} = definitions.find(
        ({identifier: imageId}) => (imageId === id)
      )
      return {
        type: 'image',
        alt,
        position,
        title,
        url
      }
    }
    if (children) {
      return {
        ...token,
        children: children.map(resolveReferencesInSubtree)
      }
    }
    return token
  }
  return tokens
    .map(resolveReferencesInSubtree)
    .filter(({type}) => type !== 'definition')
}

module.exports = {resolveReferences}
