const renderImage = ({token: {url, alt, title}}) => `
  <figure>
      <img src="${url}" alt="${alt}" />
      ${title ? `<figcaption>${title}</figcaption>` : ''}
  </figure>
`

module.exports = {renderImage}
