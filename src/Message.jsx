import React, {Component} from 'react';

class Message extends React.Component {
  render() {
    console.log(this.props)
    return (
        <div className="message">
          <span className="message-username">{this.props.data.username}</span>
          <span className="message-content">{this.props.data.content}</span>
        </div>
    )
  }
}

export default Message;
  
