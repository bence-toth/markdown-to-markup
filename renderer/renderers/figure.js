const renderFigure = ({token: {url, alt, title}}) => `
  <div class="figureWrapper">
    <figure>
        <img src="${url}" alt="${alt}" />
        ${title ? `<figcaption>${title}</figcaption>` : ''}
    </figure>
  </div>
`

module.exports = {renderFigure}
