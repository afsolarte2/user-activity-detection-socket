'use strict'

const { getByConnectionId, updateTimestamp, deleteConnection } = require('../db')

module.exports.handler = async (event, context, callback) => {
  try {
    const connectionId = event.requestContext.connectionId

    const result = await getByConnectionId(connectionId)

    await updateTimestamp(result[0].uuid)

    //await deleteConnection(result[0].uuid)

    callback(null, {
      statusCode: 200,
      body: 'all ok',
    })
  } catch (error) {
    console.error(error)

    callback(null, {
      statusCode: 500,
      body: 'Failed to connect: ' + JSON.stringify(error),
    })
  }
}
