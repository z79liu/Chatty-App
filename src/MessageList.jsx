import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends React.Component {
  render() {
    const message = this.props.messageList;
    const singleMessages = message.map((m) =>
      <Message key = {m.id} data = {m}/>
    );
   
    return (
      <main className="messages">
          {singleMessages}
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    )
  }
}

export default MessageList;
  
