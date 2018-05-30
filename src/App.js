import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import reduxLogo from './redux.png';
import jestLogo from './jest.png';

import './App.css';

import TextObjectComponent from './components/TextObject/TextObjectComponent'

import { simpleAction } from './actions/SimpleAction'
import {
  changeTextObjectValue,
  addTextBox } from './actions/AnimationAction'

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
 simpleAction: () => dispatch(simpleAction()),
 addTextBox: (lastId) => dispatch(addTextBox(lastId)),
 animationAction: (textObject, newTextValue) => dispatch(changeTextObjectValue(textObject, newTextValue))
})

class App extends Component {
  simpleAction = (event) => {
   this.props.simpleAction();
  }
  addTextBox = (event) => {
    const lastId = this.props.animationReducer.texts.length;
    this.props.addTextBox(lastId);
  }
  animationAction = (textObject, newTextValue) => {
   this.props.animationAction(textObject, newTextValue);
  }
 render() {
  return (
   <div className="App">
    <header className="App-header">
     <img alt="1" id="logo" src={logo} className="App-logo" alt="logo" />
     <img alt="2" src={reduxLogo} className="App-logo" />
     <img alt="3" src={jestLogo} className="App-logo" />
     <h1 className="App-title">use redux, motion and jest</h1>
    </header>

    {
      this.props.animationReducer.texts.map((textObject, i) => {
        return (
          <TextObjectComponent
          key={i} id={textObject.id} textObject={textObject} text={textObject.text} animation={textObject.animation}
          dispatchChangeValue={this.animationAction} />
        )
      })
    }
    <button onClick={this.addTextBox}>Add TextBox</button>
   </div>
  );
 }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
