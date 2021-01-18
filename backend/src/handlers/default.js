const { updateTimestamp } = require('../db')

module.exports.handler = async (event, context, callback) => {
  const { uuid } = JSON.parse(event.body)

  await updateTimestamp(uuid)

  callback(null, {
    statusCode: 200,
    body: 'all ok',
  })
}
