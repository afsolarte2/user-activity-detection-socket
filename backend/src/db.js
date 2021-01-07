const AWS = require("aws-sdk")
const documentClient = new AWS.DynamoDB.DocumentClient()

const addConnection = (uuid, connectionId) => {
    const putParams = {
        TableName: process.env.USER_CONNECTION_STATUS_TABLE,
        Item: {
            uuid,
            connectionId,
            timestamp: new Date().toISOString()
        }
    }

    return documentClient.put(putParams).promise()
}

const updateConnection = uuid => {
    const updateParams = {
        TableName: process.env.USER_CONNECTION_STATUS_TABLE,
        ConditionExpression: '#uuid = :uuid',
        UpdateExpression: 'set #timestamp = :timestamp',
        ExpressionAttributeNames: {
            '#uuid': 'uuid',
            '#timestamp': 'timestamp'
        },
        ExpressionAttributeValues: {
            ':uuid': uuid,
            ':timestamp': new Date().toISOString()
        }
    }

    return documentClient.update(updateParams).promise()
}

const getByGlobalSecondayIndex = connectionId => {
    const queryParameters = {
        TableName: process.env.USER_CONNECTION_STATUS_TABLE,
        IndexName: 'ByConnectionId',
        KeyConditionExpression: "connectionId = :connectionId",
        ExpressionAttributeValues: {
            ":connectionId": connectionId
        }
    }

    return documentClient.query(queryParameters).promise()
}

const deleteByGlobalSecondayIndex = async connectionId => {
    const { Items } = await getByGlobalSecondayIndex(connectionId)

    for (const item of Items) {
        await deleteConnection(item.uuid)
    }
}

const deleteConnection = uuid => {
    const deleteParams = {
        TableName: process.env.USER_CONNECTION_STATUS_TABLE,
        Key: {
            uuid: uuid
        }
    }

    return documentClient.delete(deleteParams).promise()
}

module.exports = {
    addConnection,
    updateConnection,
    deleteConnection,
    deleteByGlobalSecondayIndex
}
