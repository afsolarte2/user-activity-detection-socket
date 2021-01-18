'use strict'

const { addConnection, getByUuid, updateConnectionAndTimestamp } = require('../db')

module.exports.handler = async (event, context, callback) => {
  try {
    const uuid = event.queryStringParameters.uuid
    const connectionId = event.requestContext.connectionId

    const uuidResult = await getByUuid(uuid)

    if (!uuidResult) await addConnection(uuid, connectionId)
    else updateConnectionAndTimestamp(uuidResult[0].uuid, connectionId)

    callback(null, {
      statusCode: 200,
      body: 'all ok',
    })
  } catch (error) {
    console.error(error)

    callback(null, JSON.stringify(error))
  }
}
