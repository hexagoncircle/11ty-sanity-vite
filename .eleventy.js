const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')

const EleventyPluginNavigation = require('@11ty/eleventy-navigation')
const EleventyPluginSyntaxhighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const EleventyPluginRss = require('@11ty/eleventy-plugin-rss')
const EleventyVitePlugin = require('@11ty/eleventy-plugin-vite')

const filters = require('./utils/filters.js')
const transforms = require('./utils/transforms.js')
const shortcodes = require('./utils/shortcodes.js')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyPluginNavigation)
  eleventyConfig.addPlugin(EleventyPluginRss)
  eleventyConfig.addPlugin(EleventyPluginSyntaxhighlight)
  eleventyConfig.addPlugin(EleventyVitePlugin)

  eleventyConfig.addPassthroughCopy({
    public: '/'
  })

  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName])
  })

  Object.keys(transforms).forEach((transformName) => {
    eleventyConfig.addTransform(transformName, transforms[transformName])
  })

  Object.keys(shortcodes).forEach((shortcodeName) => {
    eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName])
  })

  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`)

  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: 'after',
      class: 'direct-link',
      symbol: '#',
      level: [1, 2, 3, 4]
    }),
    slugify: eleventyConfig.getFilter('slug')
  })
  eleventyConfig.setLibrary('md', markdownLibrary)

  eleventyConfig.addLayoutAlias('base', 'base.njk')
  eleventyConfig.addPassthroughCopy('src/assets/css')
  eleventyConfig.addPassthroughCopy('src/assets/js')
  eleventyConfig.setServerPassthroughCopyBehavior('copy')

  return {
    // templateFormats: ['md', 'njk', 'html', 'liquid'],
    // htmlTemplateEngine: 'njk',
    // passthroughFileCopy: true,
    dir: {
      input: 'src',
      layouts: 'layouts'
    }
  }
}
