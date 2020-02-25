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
        const currentFile = files[Math.floor(Math.random() * files.length)];

        fs.readFile(`${folder}/in/${currentFile}`, (err, data) => {
          if (err) {
            alert('Error reading file: ', err);
          } else {
            const imageSrc = Buffer.from(data).toString('base64');

            this.setState({ currentImage: currentFile, currentImageSrc: imageSrc });
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
      <Container>
        <InnerContainer>
          <Image src={`data:image/jpeg;base64,${currentImageSrc}`} />

          <HorizontalGroup>
            <Dislike onClick={this.deleteImage}>Delete(f)</Dislike>
            <Like onClick={this.moveImage}>Keep(j)</Like>
          </HorizontalGroup>

          <BackButton onClick={this.props.back}>Back</BackButton>
        </InnerContainer>
      </Container>);
  }

}

const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 100vh;
background-color: rgba(0, 0, 0, 0.05);
flex-direction: row;
`;

const InnerContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
margin: 50px;
height: calc(100vh - 100px);
flex: 1;
`;

const Image = styled.img`
width: 100%;
max-height: 60%;
object-fit: contain;
`;

const HorizontalGroup = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
width: 400px;
`;

const Like = styled.div`
display: flex;
align-items: center;
flex-direction: column;
padding: 15px 25px;
border-radius: 100px;
font-size: 23px;
font-weight: bold;
color: white;
background-color: rgb(102, 204, 0);
width: 100px;
box-shadow: 0px 2px 5px rgba(102, 204, 0, 0.5);

:hover  {
  transition: all .2s ease-in-out;
  transform: scale(1.1);
`;

const Dislike = styled.div`
display: flex;
align-items: center;
flex-direction: column;
padding: 15px 25px;
border-radius: 100px;
font-size: 23px;
font-weight: bold;
color: white;
background-color: rgb(255, 51, 80);
width: 100px;
box-shadow: 0px 2px 5px rgba(255, 51, 80, 0.5);

:hover  {
  transition: all .2s ease-in-out;
  transform: scale(1.1);
`;

const BackButton = styled.div`
font-size: 20px;
font-weight: bold;
color: white;
background-color: rgb(160, 160, 160);
padding: 10px 20px;
border-radius: 50px;
box-shadow: 0px 2px 4px rgba(160, 160, 160, 0.5);
margin-bottom: 0px;

:hover  {
  transition: all .2s ease-in-out;
  transform: scale(1.1);
`;
