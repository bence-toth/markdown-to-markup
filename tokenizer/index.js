const unified = require('unified')
const markdown = require('remark-parse')

const tokenize = markdownContent =>
  unified()
    .use(markdown)
    .parse(markdownContent)
    .children

module.exports = {tokenize}
