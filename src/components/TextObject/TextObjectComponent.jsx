import React, { Component } from 'react';
import { Motion, spring, presets } from 'react-motion';
import happyBee from '../../happy_bee.png';

import * as Style from './TextObjectStyle';

class TextObjectComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      xPosition: 100,
      yPosition: 200,
      finishXPosition: 0,
      finishYPosition: 0,
      width: 0,
      firstRender: true
    }

    this.toggleEditing = this.toggleEditing.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onChangeTextObjectValue = this.onChangeTextObjectValue.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.generateRandomPosition = this.generateRandomPosition.bind(this);
    this.returnWindowDimension = this.returnWindowDimension.bind(this);
    // this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.setWidth = this.setWidth.bind(this);

    this.tickAndGenerate = this.tickAndGenerate.bind(this);
  }

  toggleEditing () {
    const { editing } = this.state;
    this.setState({editing: !editing});
  }

  handleClick () {
    this.setState({editing: true});
  }

  onChangeTextObjectValue (e) {
    this.props.dispatchChangeValue(this.props.textObject, e.target.value);
    this.setWidth();
  }

  handleKeyPress (event) {
    if(event.key === 'Enter'){
      window.document.getElementById(`text${this.props.id}`).blur();
      if(this.state.firstRender === true) {
        console.log('first render')
      } else {
        console.log('not first render from enter event')
        this.generateRandomPosition();
      }
      this.setState({editing: false, firstRender: false});
    }
  }

  returnWindowDimension() {
    const windowSize = {
      height: window.innerHeight,
      width: window.innerWidth,
    }
    return windowSize;
  }

  generateRandomPosition() {
    const windowSize = this.returnWindowDimension();
    const randomXPosition = (Math.ceil((Math.random() - 0.2) * windowSize.width));
    const randomYPosition = (Math.ceil((Math.random() - 0.2) * windowSize.height));
    this.setState({xPosition: randomXPosition, yPosition: randomYPosition});
  }

  setWidth() {
    const elemntWidth = window.document.getElementById(`text${this.props.id}`).style.width;
    console.log(elemntWidth, 'this width');
  }

  tickAndGenerate() {
    console.log('lol')
    setInterval(() => {
      if(this.state.firstRender === false) {
        this.generateRandomPosition();
      }
    }, 1000);
  }

  componentDidMount() {
    setTimeout(()=> {
        this.tickAndGenerate();
    }, 1000);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  render() {
    return (
      <Motion defaultStyle={{x: 0, y: 0}}
        style={
          {
            x: spring(this.state.xPosition, {...presets.gentle, precision: 0.5}),
            y: spring(this.state.yPosition, {...presets.gentle, precision: 0.5})
          }
        }>
        {value => (
          <div style={{...Style.ContainerStyle, left: value.x, top: value.y}}>
            <span>{this.state.xPosition}, {this.state.yPosition}</span>
            <img src={happyBee} style={{height: '40px', width: '40px'}} />
            <input
              size={this.props.text.length}
              id={`text${this.props.id}`}
              readOnly={this.state.editing}
              style={{...Style.IntputStyle, width: `${this.props.text.length - 1}em`}}
              value={this.props.text}
              onClick={() => {this.handleClick}}
              onBlur={() => {console.log('bye')}}
              onChange={this.onChangeTextObjectValue}
              onKeyPress={this.handleKeyPress} />
              <span>{JSON.stringify(this.state.firstRender)}</span>
         </div>
       )}
      </Motion>
    );
 }
}

export default TextObjectComponent;
