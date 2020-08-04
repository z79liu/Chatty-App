import React, { Component } from "react";

const Message = ({ color, type, data }) => {
  const style = {
    color: color
  };
  if (type === "incomingMessage") {
    return (
      <div className="message">
        <span style={style} className="message-username">
          {data.username}
        </span>
        <span className="message-content">{data.content}</span>
      </div>
    );
  } else if (type === "incomingNotification") {
    return (
      <div className="message">
        <div className="system">
          <span className="notification-content">{data.content}</span>
        </div>
      </div>
    );
  }
};

export default Message;
