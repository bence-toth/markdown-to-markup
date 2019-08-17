const isFigure = ({type, children}) => (
  (type === 'paragraph')
    && (children && (children.length === 1))
    && (children[0].type === 'image')
)

const transformFigure = ({children}) => ({
  ...children[0],
  type: 'figure'
})

const transformFigures = tokens =>
  tokens.map(token => (
    isFigure(token)
      ? transformFigure(token)
      : token
  ))

module.exports = {transformFigures}
