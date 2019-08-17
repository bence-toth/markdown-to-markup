const renderImage = ({token: {url, alt, title}}) =>
  `<img src="${url}" alt="${alt}" ${title ? `title="${title}"` : ''}/>`

module.exports = {renderImage}
