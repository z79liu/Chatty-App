import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {
  constructor() {
    super();

    this.state =  {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id : 1
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: 2
        }
      ]
    }
    this.addMessage = this.addMessage.bind(this);


  }
  

  componentDidMount() {
    console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);

    this.socket = new WebSocket('ws://localhost:3001');

    // This event listener is fired when the socket is opened (i.e. connected)
    this.socket.onopen = () => {
      console.log('Connected to server');
      this.socket.send('hello')
    };

    
    // This event listener is fired whenever the socket receives a message from the server
    // The parameter e is a MessageEvent which contains the message from the server along with some metadata.
    this.socket.onmessage = e => {
      // the actual message from the server is contained in the `data` key
      console.log(`Got message from the server: ${e.data}`);
    };

    // This event listener is fired when the socket is closed (either by us or the server)
    this.onclose = () => {
      console.log('Client disconnected');
    };
  }


  addMessage(msg) {
    const newmsg = {username: this.state.currentUser.name, content: msg, id: this.state.messages[this.state.messages.length-1].id + 1 }
    this.setState({ messages: [...this.state.messages, newmsg] });
 }

  render() {

    return (
    <div>
      {/* <h1>Hello React :)</h1> */}
      <MessageList messageList = {this.state.messages}/>
      <ChatBar addMessage = {this.addMessage} currentUser = {this.state.currentUser.name}/>
    </div>
    );
  }
}
export default App;
