import React from 'react';
import styled from 'styled-components';

// Or with ECMAScript 6
const { dialog } = require('electron').remote;

export default class StartScreen extends React.Component {
  constructor(props) {
    super(props);

    this.selectFolder = this.selectFolder.bind(this);
  }

  selectFolder() {
    dialog.showOpenDialog({
      title: 'Select a folder',
      properties: ['openDirectory'],
    }, (folderPaths) => {
      // folderPaths is an array that contains all the selected paths
      if (folderPaths === undefined) {
        console.log('No destination folder selected');
      } else {
        this.props.folderSelected(folderPaths[0]);
      }
    });
  }

  render() {
    return (<div>
      <h2>Welcome to test!</h2>
      <Title>Hello</Title>

      <Button onClick={this.selectFolder}>Select Folder</Button>
    </div>);
  }
}

const Title = styled.p``;

const Button = styled.div``;