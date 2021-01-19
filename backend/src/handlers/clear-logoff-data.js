'use strict'

const { getByCron, deleteConnection } = require('../db')

module.exports.handler = async (event, context, callback) => {
  try {
    console.log('****************************************************************')
    console.log(event)
    console.log('****************************************************************')

    const records = await getByCron()
    console.log(records)

    if (records) {
      for (const record of records) {
        console.log(record)
        await deleteConnection(record.uuid)
      }
    }

    callback(null, {
      statusCode: 200,
      body: 'all ok',
    })
  } catch (error) {
    console.error(error)

    callback(null, JSON.stringify(error))
  }
}
