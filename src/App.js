import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import reduxLogo from './redux.png';
import jestLogo from './jest.png';

import './App.css';

import { simpleAction } from './actions/SimpleAction'

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
 simpleAction: () => dispatch(simpleAction())
})

class App extends Component {
  simpleAction = (event) => {
   this.props.simpleAction();
  }
 render() {
  return (
   <div className="App">
    <header className="App-header">
     <img src={logo} className="App-logo" alt="logo" />
     <img src={reduxLogo} className="App-logo" />
     <img src={jestLogo} className="App-logo" />
     <h1 className="App-title">use redux, motion and jest</h1>
    </header>
    <p className="App-intro">
     To get started, edit <code>src/App.js</code> and save to reload
    </p>

    <button onClick={this.simpleAction}>Test redux action</button>
    <pre>
     {
      JSON.stringify(this.props)
     }
    </pre>
   </div>
  );
 }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
