/* eslint-disable react/prop-types */
import React from "react";

const ChatBar = ({ sendMsg, nameChange }) => {
  const handleKeyPress = e => {
    if (e.charCode == 13) {
      sendMsg(e.target.value);
      e.target.value = "";
    }
  };

  const handleNameChange = e => {
    nameChange(e.target.value);
  };

  return (
    <footer className="chatbar">
      {/* when name field is out of focus, run the props that changes the state of currentuser */}
      <input
        className="chatbar-username"
        placeholder="Your Name (Optional)"
        onBlur={handleNameChange}
      />
      <input
        className="chatbar-message"
        placeholder="Type a message and hit ENTER"
        onKeyPress={e => handleKeyPress(e)}
      />
    </footer>
  );
};
export default ChatBar;
