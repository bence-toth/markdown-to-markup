const renderCodeBlock = ({
  token: {lang, value}
}) => {
  return `<code><pre>${value}</pre></code>`
}

module.exports = {renderCodeBlock}
