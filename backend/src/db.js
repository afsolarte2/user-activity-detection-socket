const AWS = require('aws-sdk')
const documentClient = new AWS.DynamoDB.DocumentClient()

const addConnection = (uuid, connectionId) => {
  const putParams = {
    TableName: process.env.USER_CONNECTION_STATUS_TABLE,
    Item: {
      uuid,
      connectionId,
      timestamp: new Date().toISOString(),
    },
  }

  return documentClient.put(putParams).promise()
}

const updateConnectionAndTimestamp = (uuid, connectionId) => {
  const updateParams = {
    TableName: process.env.USER_CONNECTION_STATUS_TABLE,
    Key: { uuid },
    UpdateExpression: 'set #timestamp = :timestamp, #connectionId = :connectionId',
    ExpressionAttributeNames: {
      '#timestamp': 'timestamp',
      '#connectionId': 'connectionId',
    },
    ExpressionAttributeValues: {
      ':timestamp': new Date().toISOString(),
      ':connectionId': connectionId,
    },
  }

  return documentClient.update(updateParams).promise()
}

const updateTimestamp = (uuid) => {
  const updateParams = {
    TableName: process.env.USER_CONNECTION_STATUS_TABLE,
    Key: { uuid },
    UpdateExpression: 'set #timestamp = :timestamp',
    ExpressionAttributeNames: {
      '#timestamp': 'timestamp',
    },
    ExpressionAttributeValues: {
      ':timestamp': new Date().toISOString(),
    },
  }

  return documentClient.update(updateParams).promise()
}

const getByUuid = async (uuid) => {
  const queryParameters = {
    TableName: process.env.USER_CONNECTION_STATUS_TABLE,
    KeyConditionExpression: '#uuid = :uuid',
    ExpressionAttributeNames: {
      '#uuid': 'uuid'
    },
    ExpressionAttributeValues: {
      ':uuid': uuid,
    },
  }

  const { Items } = await documentClient.query(queryParameters).promise()

  return Items.length ? Items : null
}

const getByConnectionId = async (connectionId) => {
  const queryParameters = {
    TableName: process.env.USER_CONNECTION_STATUS_TABLE,
    IndexName: 'ByConnectionId',
    KeyConditionExpression: 'connectionId = :connectionId',
    ExpressionAttributeValues: {
      ':connectionId': connectionId,
    },
  }

  const { Items } = await documentClient.query(queryParameters).promise()

  return Items.length ? Items : null
}

const deleteByGlobalSecondayIndex = async (connectionId) => {
  //Sin uso
  const { Items } = await getByConnectionId(connectionId)

  for (const item of Items) {
    await deleteConnection(item.uuid)
  }
}

const deleteConnection = (uuid) => {
  const deleteParams = {
    TableName: process.env.USER_CONNECTION_STATUS_TABLE,
    Key: {
      uuid: uuid,
    },
  }

  return documentClient.delete(deleteParams).promise()
}

module.exports = {
  addConnection,
  updateConnectionAndTimestamp,
  updateTimestamp,
  deleteConnection,
  getByUuid,
  getByConnectionId,
  deleteByGlobalSecondayIndex,
}
