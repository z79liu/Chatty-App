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
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.


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
  let activeUsers = {activeUsers: wss.clients.size }
  wss.broadcast(JSON.stringify(activeUsers))

  ws.on('message', data => {
    const json = JSON.parse(data)
    console.log('server received message', json)
    switch (json.type) {
      case "postMessage":
        let objToBroadcast = { id: uuid(), type: "incomingMessage", username: json.username, content: json.content }
        wss.broadcast(JSON.stringify(objToBroadcast))
        break;
      case "postNotification":
        let objToBroadcast2 = { type: "incomingNotification", content: json.content }
        wss.broadcast(JSON.stringify(objToBroadcast2))
        break;
    }

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  });
  ws.on('close', () => {
    console.log('current active sessions', wss.clients.size)
    console.log('Client disconnected');
    let activeUsers = {activeUsers: wss.clients.size }
    wss.broadcast(JSON.stringify(activeUsers))
  })
})