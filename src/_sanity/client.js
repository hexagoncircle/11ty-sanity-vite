require('dotenv').config()
const sanityClient = require('@sanity/client')

const projectId = process.env.SANITY_PROJECT_ID
const token = process.env.SANITY_API_TOKEN
const dataset = 'production'
const useCdn = process.env.SANITY_USE_CDN || false

const client = sanityClient({
  projectId,
  dataset,
  token,
  useCdn,
  apiVersion: '2022-07-27'
})

module.exports = client
