'use strict'

const { addConnection, getByUuid, updateConnectionAndTimestamp, getByCron } = require('../db')

module.exports.handler = async (event, context, callback) => {
  try {
    console.log('****************************************************************')
    console.log(event)
    console.log(new Date().toISOString())
    console.log('****************************************************************')

    const records = await getByCron()
    console.log(records)

    callback(null, {
      statusCode: 200,
      body: 'all ok',
    })
  } catch (error) {
    console.error(error)

    callback(null, JSON.stringify(error))
  }
}
