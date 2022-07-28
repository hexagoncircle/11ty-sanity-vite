const client = require('../_sanity/client')

module.exports = async function () {
  const query = `*[_type == "pet"] {
    name,
    shortDescription
  }`
  const params = {}

  return await client.fetch(query, params)
}
