import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';


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
  }

  toggleEditing () {
    const { editing } = this.state;
    this.setState({editing: !editing});
  }

  handleClick () {
    console.log('this.state');
    this.setState({editing: true});
  }

  onChangeTextObjectValue (e) {
    this.props.dispatchChangeValue(this.props.textObject, e.target.value);
    this.setWidth();
  }

  handleKeyPress (event) {
    if(event.key === 'Enter'){
      window.document.getElementById(`text${this.props.id}`).blur();
      this.state.firstRender ? this.generateRandomPosition() : null;
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
    console.log(windowSize, randomXPosition, randomYPosition)
  }

  setWidth() {
    const elemntWidth = window.document.getElementById(`text${this.props.id}`).style.width;
    console.log(elemntWidth, 'this width');
  }



  componentDidMount() {}

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  render() {
    return (
      <div style={{...Style.ContainerStyle, left: this.state.xPosition, top: this.state.yPosition}}>
        <span>{this.state.xPosition}, {this.state.yPosition}</span>
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

          <Motion defaultStyle={{x: 0}} style={{x: spring(100)}}>
            {value => <div style={{left:value.x, position: 'fixed', top: '200'}}> {value.x} </div>}
          </Motion>
     </div>
    );
 }
}

export default TextObjectComponent;
