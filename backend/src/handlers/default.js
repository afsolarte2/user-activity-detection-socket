const { getByUuid, updateTimestamp } = require('../db')

module.exports.handler = async (event, context, callback) => {
  const { uuid } = JSON.parse(event.body)
  const connectionId = event.requestContext.connectionId

  if (uuid && connectionId) {
    const uuidResult = await getByUuid(uuid)

    if (uuidResult) await updateTimestamp(uuid)
    else await addConnection(uuid, connectionId)
  }

  callback(null, {
    statusCode: 200,
    body: 'all ok',
  })
}
