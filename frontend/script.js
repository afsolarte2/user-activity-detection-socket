const uuid = 'abc-123'
//const webSocketUrl = `wss://etllebuog9.execute-api.us-east-1.amazonaws.com/local?uuid=${uuid}`
const webSocketUrl = `ws://localhost:3001?uuid=${uuid}`

let webSocket

const onOpen = evt => {
  console.log('onOpen', evt)
  alert('WebSocket rocks')
}

const onClose = evt => {
  console.log('onClose', evt)
}

const onMessage = evt => {
  console.log('onMessage', evt)
  webSocket.close()
}

const onError = evt => {
  console.log('onError', evt)
  webSocket.close()
}

//http://127.0.0.1:5500/frontend/
const sendStillAlivePing = () => {
  webSocket.send(JSON.stringify({ uuid }))
}

const openSocketConnection = () => {
  webSocket = new WebSocket(webSocketUrl)

  webSocket.onopen = evt => onOpen(evt)
  webSocket.onclose = evt => onClose(evt)
  webSocket.onmessage = evt => onMessage(evt)
  webSocket.onerror = evt => onError(evt)

  window.setInterval(() => sendStillAlivePing(), 50000)
}
