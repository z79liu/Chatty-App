/* eslint-disable react/prop-types */
import React from "react";
import Message from "./Message.jsx";

const MessageList = ({ messageList }) => {
  const message = messageList;
  const singleMessages = message.map(m => (
    <Message key={m.id} data={m} type={m.type} color={m.colorz} />
  ));
  return <main className="messages">{singleMessages}</main>;
};

export default MessageList;
