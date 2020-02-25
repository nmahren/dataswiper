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
    return (
    <Container>
      <Name>DATASWIPER</Name>
      <Tutorial>
        <li>Create a new folder with two nested folders, called 'in' and 'out'.</li>
        <li>Make a copy of the dataset you want to sort and paste it into the folder 'in'</li>
        <li>Then you can start sorting the dataset bei pressing 'j' on the keyboard to keep the image, according to your classification, or to delete it by pressing 'f'. You find the classificated dataset in the folder 'out'-</li>
      </Tutorial>

      <Button onClick={this.selectFolder}>Select Folder</Button>
    </Container>);
  }
}

const Container = styled.div`
display: flex;
height: 100vh;
flex-direction: column;
align-items: center;
justify-content: space-around;
background-color: rgba(0, 0, 0, 0.05);

`;

const Name = styled.h1`
font-size: 50px;
color: rgb(255, 186, 0);


`;

const Tutorial = styled.ul`
font-size: 20px;
`;

const Button = styled.div`
font-size: 20px;
font-weight: bold;
color: white;
background-color: rgb(255,100,0);
padding: 10px 20px;
margin-bottom: 50px;
border-radius: 50px;
box-shadow: 0px 2px 4px rgba(255, 100, 0, 0.5);

:hover  {
  transition: all .2s ease-in-out;
  transform: scale(1.1);
  }
`;
