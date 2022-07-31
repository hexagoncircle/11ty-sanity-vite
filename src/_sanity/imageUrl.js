const imageUrl = require('@sanity/image-url')
const client = require('./client')

// Learn more: https://www.sanity.io/docs/asset-pipeline/image-urls
function urlFor(source) {
  return imageUrl(client).image(source)
}

module.exports = urlFor
