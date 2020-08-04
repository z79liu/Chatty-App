Chat App
=====================

A client-side SPA (single-page app) built with ReactJS, Webpack, Babel, Node.js and Web Sockets. The client-side app communicates with a server via WebSockets for multi-user real-time updates. No persistent database is involved; the focus is on the client-side experience and using ReactJS for real time updates.

## Start:
1. npm install
2. npm run start:dev


## Features
When any connected user sends a chat message, all connected users receive and display the message
When any connected user changes their name, all connected users are notified of the name change
Notifications are styled differently from chat messages
Header will display the count of connected users
When the number of connected users changes, this count will be updated for all connected users in real time
Different users' names will each be coloured differently, and the color stays then same even if they change their name.

## Demo
![](https://media.giphy.com/media/hQdEEYNowoFrESrjyT/giphy.gif) 


## Usage

Clone the repo and create your own git repo. 
Install the dependencies and start the server.


WebSocket Server

npm install
npm start


App server: 
npm install
npm start
open http://localhost:3000

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
