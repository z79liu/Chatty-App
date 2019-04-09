import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    // this.keyPress = this.keyPress.bind(this)
  }

  keyPress(e){
    if(e.charCode == 13){
       console.log('value', e.target.value);
       this.props.addMessage(e.target.value)
       e.target.value = ""
    }
 }

  render() {
    return (
    <footer className="chatbar">
      <input className="chatbar-username" placeholder="Your Name (Optional)" value ={this.props.currentUser}/>
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={( e )=> this.keyPress(e) }/>
    </footer>
    )
  }
}
export default ChatBar;
