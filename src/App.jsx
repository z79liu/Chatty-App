/* eslint-disable no-console */
import React, { useEffect, useState, useRef } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import NavBar from "./NavBar.jsx";

const App = () => {
  const ws = useRef(null);
  const [currentUser, setCurrentUser] = useState("Anonymous");
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState(0);
  const [color, setColor] = useState("");

  //useEffect for componentdidmount
  useEffect(() => {
    generateGreetingMessage();
    ws.current = new WebSocket("ws://localhost:3001");
    ws.current.onopen = () => console.log("Client opened");
    ws.current.onclose = () => console.log("Client leaving");
    ws.current.onmessage = e => socketOnMessage(e);

    return () => {
      ws.current.close();
    };
  }, []);

  const generateGreetingMessage = () => {
    setTimeout(() => {
      const newMessage = {
        type: "incomingMessage",
        id: 3,
        username: "Admin Zeyu",
        content: "Hello, Welcome to my Chat app built on React and WebSocket!"
      };
      setMessages([...messages, newMessage]);
    }, 1000);
  };

  const socketOnMessage = event => {
    const sessions = JSON.parse(event.data);
    if (sessions.activeUsers) {
      _activeUsers(sessions.activeUsers);
    } else if (sessions.color) {
      _changecolor(sessions.color);
    } else {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case "incomingMessage":
          _handleServerMessage(message);
          break;
        case "incomingNotification":
          _handleServerNotification(message);
          break;
        default:
          // show an error in the console if the message type is unknown
          _handleServerMessage(message);
        // throw new Error("Unknown event type " + data.type);
      }
    }
  };

  const sendMsg = msg => {
    const user = currentUser === undefined ? "Anonymous" : currentUser;
    const newmsg = {
      color: color,
      type: "postMessage",
      username: user,
      content: msg
    };
    ws.current.send(JSON.stringify(newmsg));
  };

  const _activeUsers = users => {
    setActiveUsers(users);
  };
  const _changecolor = color => {
    setColor(color);
  };

  const _handleServerMessage = newMessage => {
    setMessages(messages => [...messages, newMessage]);
  };

  const _handleServerNotification = newMessage => {
    setMessages(messages => [...messages, newMessage]);
  };

  const nameChange = input => {
    if (input === "") {
      setCurrentUser("Anonymous");
    } else if (input !== currentUser) {
      const prevUserName = currentUser;
      console.log("i am testtt", prevUserName);
      const notif = {
        type: "postNotification",
        content: `${prevUserName} has changed their name to ${input}`
      };
      ws.current.send(JSON.stringify(notif));
      setCurrentUser(input);
    }
  };

  return (
    <div>
      <NavBar activeUsers={activeUsers} />
      <MessageList messageList={messages} color={color} />
      <ChatBar
        nameChange={nameChange}
        sendMsg={sendMsg}
        currentUser={currentUser.name}
      />
    </div>
  );
};
export default App;
