module.exports.handler = async (event, context, callback) => {
  console.log(JSON.stringify(event, null, 2))

  event
    .Records
    .filter(record => record.eventName === 'REMOVE')
    .forEach(record => {
      console.log(
        'ES DE REMOVE, VA PARA SQS DE SALESFORCE !!!',
        JSON.stringify(record, null, 2)
      )
    });

  callback(null, {
    statusCode: 200,
    body: 'all ok',
  })
}
