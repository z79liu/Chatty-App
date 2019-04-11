import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    // this.keyPress = this.keyPress.bind(this)
  }


  render() {
    return (
    <footer className="chatbar">
      {/* when name field is out of focus, run the props that changes the state of currentuser */}
      <input className="chatbar-username" placeholder="Your Name (Optional)" onBlur={this.nameChange}/>
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={( e )=> this.keyPress(e) }/>
    </footer>
    )
  }

  keyPress(e){
    if(e.charCode == 13){
      //  console.log('value', e.target.value);
      //  this.props.addMessage(e.target.value)
      //  console.log('pressed enter',this.refs.myInput.value)
       this.props.sendMsg(e.target.value)
       e.target.value = ""
    }
  }

  nameChange = (e) => {
    this.props.nameChange(e.target.value)
  }

}
export default ChatBar;
