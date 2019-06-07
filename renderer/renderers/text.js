const emailAddressPattern = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim

const turnEmailAddressesToLinks = text => text.replace(
  emailAddressPattern,
  '<a href="mailto:$1">$1</a>'
)

const renderText = ({token: {value}}) =>
  turnEmailAddressesToLinks(value)

module.exports = {renderText}
