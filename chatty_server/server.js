// server.js

const express = require('express');
// const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');
const WebSocket = require("ws");


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
const colors = ["#006400", "#800000", "#000080", "#2F4F4F","#9ACD32", "#808080","#E9967A","#B0C4DE",]
function getRandomInt(x, y) {
  return Math.floor(Math.random() * (y - x + 1)) + x;
}

wss.broadcast = data => {
  wss.clients.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(data);
    }
  });
};

wss.on('connection', (ws) => {
  console.log('current active sessions', wss.clients.size)
  console.log('Client connected');
  let activeUsers = { activeUsers: wss.clients.size }
  let color = { color: colors[getRandomInt(0, 7)] }
  console.log('server generated a random color, it is:', color)

  ws.send(JSON.stringify(color));
  wss.broadcast(JSON.stringify(activeUsers))

  ws.on('message', data => {
    const json = JSON.parse(data)
    console.log('server received message', json)
    switch (json.type) {
      case "postMessage":
        console.log(json.color)
        let objToBroadcast = { id: uuid(), type: "incomingMessage", username: json.username, content: json.content, colorz: json.color}
        wss.broadcast(JSON.stringify(objToBroadcast))
        break;
      case "postNotification":
        let objToBroadcast2 = { type: "incomingNotification", content: json.content }
        wss.broadcast(JSON.stringify(objToBroadcast2))
        break;
    }
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    let activeUsers = { activeUsers: wss.clients.size }
    console.log('Client disconnected remaining active users are:',activeUsers );
    wss.broadcast(JSON.stringify(activeUsers))
  })

})