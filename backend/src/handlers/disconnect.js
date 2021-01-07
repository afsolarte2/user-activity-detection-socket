'use strict';

const { deleteByGlobalSecondayIndex } = require("../db");

module.exports.handler = async (event, context, callback) => {
    console.log(event)

    try {
        const connectionId = event.requestContext.connectionId

        await deleteByGlobalSecondayIndex(connectionId)

        callback(null, {
            statusCode: 200,
            body: 'all ok'
          });
    } catch (error) {
        console.error(error)

        callback(null, {
            statusCode: 500,
            body: "Failed to connect: " + JSON.stringify(error)
        });
    }
}
