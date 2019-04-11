import React, { Component } from 'react';

class Message extends React.Component {
  render() {
    const style = {
      color: this.props.color
    }
    console.log('this the color at final stage', this.props.color)
    if (this.props.type === "incomingMessage") {
      return (
        <div className="message">
          <span style = {style} className="message-username">{this.props.data.username}</span>
          <span className="message-content">{this.props.data.content}</span>
        </div>
      )
    } else if (this.props.type === "incomingNotification") {
      return (
        <div className="message">
          <div className="system">
            <span className="notification-content">{this.props.data.content}</span>
          </div>
        </div>
      )
    }
  }
}

export default Message;

