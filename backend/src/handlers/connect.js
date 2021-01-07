'use strict';

const { addConnection } = require("../db");

module.exports.handler = async (event, context, callback) => {

  try {
    const uuid = event.queryStringParameters.uuid
    const connectionId = event.requestContext.connectionId

    await addConnection(uuid, connectionId)

    callback(null, {
      statusCode: 200,
      body: 'all ok'
    });
  } catch (error) {
    console.error(error)

    callback(null, JSON.stringify(error));
  }
}
