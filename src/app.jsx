import React from 'react';
import styled from 'styled-components';
import SwipeScreen from './SwipeScreen';
import StartScreen from './StartScreen';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      folderPath: undefined,
    };
  }

  render() {
    const { folderPath } = this.state;

    return folderPath ? <SwipeScreen folder={folderPath} back={() => this.setState({ folderPath: undefined })} /> : <StartScreen folderSelected={folderPath => this.setState({ folderPath })} />;
  }
}
