import React from 'react';
import styled from 'styled-components';
import fs from 'fs';

const { app, globalShortcut } = require('electron');


export default class SwipeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImage: '',
      currentImageSrc: '',
    };

    this.loadImages = this.loadImages.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.moveImage = this.moveImage.bind(this);
    this.keyboardEvent = this.keyboardEvent.bind(this);

    this.loadImages();

    window.addEventListener('keyup', this.keyboardEvent, true);
  }

  keyboardEvent(event) {
    const { key } = event;

    if (key === 'f') {
      this.deleteImage();
    } else if (key === 'j') {
      this.moveImage();
    }
  }

  loadImages() {
    const { folder } = this.props;

    fs.readdir(`${folder}/in`, (err, files) => {
      if (err) {
        alert('Error opening folder: ', err);
      } else {
        fs.readFile(`${folder}/in/${files[0]}`, (err, data) => {
          if (err) {
            alert('Error reading file: ', err);
          } else {
            const imageSrc = Buffer.from(data).toString('base64');

            this.setState({ currentImage: files[0], currentImageSrc: imageSrc });
          }
        });
      }
    });
  }

  deleteImage() {
    const { folder } = this.props;
    const { currentImage } = this.state;

    const path = `${folder}/in/${currentImage}`;

    fs.unlinkSync(path);

    this.loadImages();
  }

  moveImage() {
    const { folder } = this.props;
    const { currentImage } = this.state;

    const oldPath = `${folder}/in/${currentImage}`;
    const newPath = `${folder}/out/${currentImage}`;

    fs.rename(oldPath, newPath, (err) => {
      if (err) throw err;
      console.log('Successfully renamed - AKA moved!');

      this.loadImages();
    });
  }

  render() {
    const { currentImageSrc } = this.state;

    return (
      <div>
        <Image src={`data:image/jpeg;base64,${currentImageSrc}`} />

        <HorizontalGroup>
          <Button onClick={this.deleteImage}>X</Button>
          <Button onClick={this.moveImage}>H</Button>
        </HorizontalGroup>

        <div>Hello</div>

        <BackButton onClick={this.props.back}>Back</BackButton>
      </div>);
  }

}

const Image = styled.img`
width: 100px;
height: 100px;
`;

const HorizontalGroup = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const Button = styled.div`
width: 50px;
height: 50px;
background-color: red;
border-radius: 25px;
`;

const BackButton = styled.div``;
