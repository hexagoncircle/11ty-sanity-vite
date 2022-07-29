const Image = require('@11ty/eleventy-img')

module.exports = {
  image: async function (
    src,
    alt,
    attrs = {},
    widths = [400, 800, 1280],
    formats = ['webp', 'jpeg'],
    sizes = '100vw'
  ) {
    let metadata = await Image(src, {
      widths: [...widths, null],
      formats: [...formats, null],
      outputDir: '_site/assets/images',
      urlPath: '/assets/images'
    })

    let imageAttributes = {
      alt,
      sizes,
      loading: 'lazy',
      decoding: 'async',
      ...attrs
    }

    // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes)
  }
}
