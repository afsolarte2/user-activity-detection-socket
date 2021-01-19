const { getByUuid, updateTimestamp } = require('../db')

module.exports.handler = async (event, context, callback) => {
  const { uuid } = JSON.parse(event.body)

  if (uuid) {
    const uuidResult = await getByUuid(uuid)

    if (uuidResult) await updateTimestamp(uuid)
  }

  callback(null, {
    statusCode: 200,
    body: 'all ok',
  })
}
