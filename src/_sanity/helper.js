const client = require('./client.js')
const { AssetCache } = require('@11ty/eleventy-fetch')
const shorthash = require('short-hash')

const sanityClient = client()

class SanityHelper {
  constructor(queryStr, globalData = {}, options = {}) {
    this.options = Object.assign(
      {
        overlayDrafts:
          !!process.env.SANITY_DRAFTS ||
          SanityHelper.currentServerlessPathMatches(globalData, ['/_preview/'])
      },
      options
    )

    this.queryString = this.modifyQueryForDrafts(queryStr)
    this.globalData = globalData

    if (!options.bypassCache && !process.env.ELEVENTY_SERVERLESS) {
      this.localCache = new AssetCache(
        shorthash(this.queryString, '.cache', {
          duration: '1d' // TODO talk about this
        })
      )
    }
  }

  // When we’re in Preview mode, we don’t want to fetch all the sanity data.
  // This checks against a list of eligible pathnames to make sure this query is relevant to the preview

  // if not serverless, return false
  // if serverless but no path matches, return false
  // if serverless but a path does match, return true
  static currentServerlessPathMatches(globalData = {}, eligiblePathnames = []) {
    if (!globalData.eleventy) {
      return false
    }

    let serverless = globalData.eleventy.serverless

    // We are in serverless and a match is found
    if (
      serverless &&
      serverless.pathname &&
      eligiblePathnames.filter((entry) => serverless.pathname.startsWith(entry))
        .length > 0
    ) {
      return true
    }

    return false
  }

  currentServerlessPathMatches(eligiblePathnames = []) {
    return SanityHelper.currentServerlessPathMatches(
      this.globalData,
      eligiblePathnames
    )
  }

  modifyQueryForDrafts(queryStr) {
    if (this.options.overlayDrafts) {
      return queryStr
    }

    // Don't build unpublished documents
    const ignoreDraft = `!(_id in path("drafts.**"))`
    let modifiedQueryStr = queryStr.replace(/\*\[/gi, `*[${ignoreDraft} &&`)
    return modifiedQueryStr
  }

  async query(params) {
    // use a local cache in dev mode
    if (!params) {
      if (
        !process.env.BYPASS_CACHE &&
        this.localCache &&
        !process.env.ELEVENTY_PRODUCTION &&
        this.localCache.isCacheValid('1h')
      ) {
        let saved = await this.localCache.getCachedValue()
        return saved
      }
    }

    let data = await sanityClient
      .fetch(this.queryString, params)
      .catch((err) => console.error(err))
    if (!params && this.localCache) {
      await this.localCache.save(data, 'json')
    }
    return data
  }

  filter(data) {
    return this.filterDataForPreview(this.overlayDrafts(data))
  }

  overlayDrafts(data) {
    if (!this.options.overlayDrafts) {
      return data
    }

    // filter out duplicate ids from Sanity data when a draft id exists.
    let draftIds = {}
    for (let entry of data) {
      if ((entry._id || '').startsWith('drafts.')) {
        draftIds[entry._id.substr('drafts.'.length)] = true
      }
    }

    return data.filter((entry) => !draftIds[entry._id])
  }

  filterDataForPreview(data) {
    if (!this.globalData.eleventy) return data

    let serverless = this.globalData.eleventy.serverless
    let slug = serverless && serverless.query.url

    if (!slug) {
      return data
    }

    return data.filter((entry) => {
      if (entry.slug === slug) {
        console.log('> Sanity filter for preview found a slug:', entry.slug)
      }
      return entry.slug === slug
    })
  }
}

module.exports = SanityHelper
