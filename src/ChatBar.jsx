import React, {Component} from 'react';

const ChatBar = (props) => (
  <footer className="chatbar">
    <input className="chatbar-username" placeholder="Your Name (Optional)" value ={props.currentUser}/>
    <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
  </footer>
)

export default ChatBar;
