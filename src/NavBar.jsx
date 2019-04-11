import React, { Component } from 'react';


class NavBar extends React.Component {
  render() {
      return (
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span id="activeUsers">Current active users online: {this.props.activeUsers}</span>
        </nav>
      )
  }
}

export default NavBar;
