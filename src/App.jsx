import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {
  constructor() {
    super();

    this.state =  {
      currentUser: {}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }

    this.sendMsg = this.sendMsg.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Zeyu", content: "Hello Welcome to my Chat app built on React and WebSocket!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 1500);

    this.socket = new WebSocket('ws://localhost:3001');

    // This event listener is fired when the socket is opened (i.e. connected)
    this.socket.onopen = () => {
      console.log('Connected to server');
    };

    
    // This event listener is fired whenever the socket receives a message from the server
    // The parameter e is a MessageEvent which contains the message from the server along with some metadata.
    this.socket.onmessage = this._handleServerMessage

    // This event listener is fired when the socket is closed (either by us or the server)
    this.onclose = () => {
      console.log('Client disconnected');
    };
  }



  render() {

    return (
    <div>
      {/* <h1>Hello React :)</h1> */}
      <MessageList messageList = {this.state.messages}/>
      <ChatBar changeName= {this.changeName} sendMsg = {this.sendMsg} currentUser = {this.state.currentUser.name}/>
    </div>
    );
  }

  sendMsg(msg) {
    const newmsg = {username: this.state.currentUser.name, content: msg}
    this.socket.send(JSON.stringify(newmsg));
  }

 
 _handleServerMessage = e => {
    // TODO: Handle message from server
    console.log('received message from server')
    const message = JSON.parse(e.data);

    this.setState({ messages: [...this.state.messages, message] });
  };

  changeName = (input) => {
    if (input === ""){
    console.log('running line 76')

      this.setState({currentUser: {name: "Anonymous" }})
    } else {
    this.setState({currentUser: {name: input }})
    }
  }

}
export default App;
