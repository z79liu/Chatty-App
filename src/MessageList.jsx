import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends React.Component {
  render() {
    const message = this.props.messageList;
    console.log('this is the message list', this.props.color)
    const singleMessages = message.map((m) =>
      <Message key = {m.id} data = {m} type = {m.type} color= {this.props.color}/>
    );
    return (
      <main className="messages">
          {singleMessages}
      </main>
    )
  }
}

export default MessageList;
  
