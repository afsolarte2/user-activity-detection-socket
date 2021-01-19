module.exports.handler = async (event, context, callback) => {
  console.log(JSON.stringify(event, null, 2))
  for (const record of event.Records) {
    if (record.eventName === 'REMOVE') console.log('ES DE REMOVE !!!')
    else console.log('ES DE OTRA COSA ...')
  }

  callback(null, {
    statusCode: 200,
    body: 'all ok',
  })
}
