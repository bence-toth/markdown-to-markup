const {renderBlockQuotation} = require('./blockQuotation.js')
const {renderEmphasis} = require('./emphasis.js')
const {renderHeading} = require('./heading.js')
const {renderHtml} = require('./html.js')
const {renderInlineCode} = require('./inlineCode.js')
const {renderImage} = require('./image.js')
const {renderList} = require('./list.js')
const {renderParagraph} = require('./paragraph.js')
const {renderStrong} = require('./strong.js')
const {renderText} = require('./text.js')
const {renderThematicBreak} = require('./thematicBreak.js')

module.exports = {
  renderBlockQuotation,
  renderEmphasis,
  renderHeading,
  renderHtml,
  renderInlineCode,
  renderImage,
  renderList,
  renderParagraph,
  renderStrong,
  renderText,
  renderThematicBreak
}
