import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'
import NavBar from './NavBar.jsx'

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: {}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      activeUsers: 0
    }

    this.sendMsg = this.sendMsg.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = { type: "incomingMessage", id: 3, username: "Zeyu", content: "Hello Welcome to my Chat app built on React and WebSocket!" };
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
    }, 1500);

    this.socket = new WebSocket('ws://localhost:3001');

    // This event listener is fired when the socket is opened (i.e. connected)
    this.socket.onopen = () => {
      console.log('Connected to server');
    };


    // This event listener is fired whenever the socket receives a message from the server
    // The parameter e is a MessageEvent which contains the message from the server along with some metadata.
    this.socket.onmessage = (event) => {
      console.log('server sent a message:',event)
      const sessions = JSON.parse(event.data);
      if (sessions.activeUsers) {
        console.log('this is the current active users', sessions.activeUsers)
        this._activeUsers(sessions.activeUsers)
      } else {
        const message = JSON.parse(event.data);
        console.log('this is the parsed response from server', message)
        switch (message.type) {
          case "incomingMessage":
            this._handleServerMessage(message)
            break;
          case "incomingNotification":
            this._handleServerNotification(message)
            break;
          default:
            // show an error in the console if the message type is unknown
            throw new Error("Unknown event type " + data.type);
        }
      }
    }


    // This event listener is fired when the socket is closed (either by us or the server)
    this.onclose = () => {
      console.log('Client disconnected');
    };
  }



  render() {
    return (
      <div>
        {/* <h1>Hello React :)</h1> */}
        <NavBar activeUsers= {this.state.activeUsers}/>
        <MessageList messageList={this.state.messages} />
        <ChatBar nameChange={this.nameChange} sendMsg={this.sendMsg} currentUser={this.state.currentUser.name} />
      </div>
    );
  }

  sendMsg(msg) {
    const user = this.state.currentUser.name === undefined ? "Anonymous" : this.state.currentUser.name
    console.log('my name is', user)
    const newmsg = { type: "postMessage", username: user, content: msg }
    this.socket.send(JSON.stringify(newmsg));
  }

  _activeUsers = (users) => {
    this.setState({ activeUsers: users });
    console.log('current active users', this.state.activeUsers)
  }

  _handleServerMessage = e => {
    // TODO: Handle message from server
    this.setState({ messages: [...this.state.messages, e] });
  };

  _handleServerNotification = e => {
    // TODO: Handle message from server
    this.setState({ messages: [...this.state.messages, e] });
  };

  // _systemnotif = e => {
  //   const currentUser = this.state.currentUser.name === undefined ? "Anonymous" : this.state.currentUser.name
  //   const newmsg = { type: "postNotification", username: e, content: msg}
  //   this.socket.send(JSON.stringify(newmsg));
  // }


  nameChange = (input) => {
    if (input === "") {
      this.setState({ currentUser: { name: "Anonymous" } })
    } else if (input !== this.state.currentUser.name) {
      const user = this.state.currentUser.name === undefined ? "Anonymous" : this.state.currentUser.name
      const notif = { type: "postNotification", content: `${user} has changed their name to ${input}` }
      this.socket.send(JSON.stringify(notif));
      this.setState({ currentUser: { name: input } })
    } else {

    }
  }

}
export default App;
