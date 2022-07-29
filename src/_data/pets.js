const client = require('../_sanity/client')

module.exports = async function () {
  const query = `*[_type == "pet"] {
    name,
    shortDescription,
    picture {
      asset->{ url }
    }
  }`
  const params = {}

  return await client.fetch(query, params)
}
