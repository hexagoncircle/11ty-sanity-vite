const client = require('../_sanity/client')

module.exports = async function () {
  const query = `*[_type == "human"] {
    name,
  }`
  const params = {}

  return await client.fetch(query, params)
}
