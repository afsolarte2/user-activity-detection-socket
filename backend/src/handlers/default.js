const { updateConnection } = require('../db')

module.exports.handler = async (event, context, callback) => {
    const { uuid } = JSON.parse(event.requestContext.body)

    await updateConnection(uuid)

    callback(null, {
        statusCode: 200,
        body: 'all ok'
    })
}
