const Entities = require('html-entities').XmlEntities
const entities = new Entities()

const renderInlineCode = ({token: {value}}) => {
  const htmlEncodedContent = entities.encode(value)
  return `<code>${htmlEncodedContent}</code>`
}

module.exports = {renderInlineCode}
