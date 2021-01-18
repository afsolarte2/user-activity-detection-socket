'use strict'

module.exports.handler = async (event, context, callback) => {
  console.log(event)

  return {
    statusCode: 200,
    body: 'all ok',
  }
}
