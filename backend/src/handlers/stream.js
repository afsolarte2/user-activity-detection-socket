module.exports.handler = async (event, context, callback) => {
  console.log(JSON.stringify(event, null, 2))

  callback(null, {
    statusCode: 200,
    body: 'all ok',
  })
}
