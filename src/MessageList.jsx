import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends React.Component {
  render() {
    const message = this.props.messageList;
    const singleMessages = message.map((m) =>
      <Message key = {m.id} data = {m} type = {m.type} color= {m.colorz}/>
    );
    return (
      <main className="messages">
          {singleMessages}
      </main>
    )
  }
}

export default MessageList;
  
