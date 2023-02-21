import React, { Component } from 'react';

export class Upload extends Component {
  static displayName = Upload.name;

  render() {
    return (
      <div>
        <h4>Post photo: </h4>
        <span> Url: </span><input id="photo-url-input" type="text"></input>
        <span> Channel ID: </span><input id="photo-channelId-input" type="text"></input>
        <span> Uploader ID: </span><input id="photo-uploaderId-input" type="text"></input>
        <span> Caption: </span><input id="photo-caption-input" type="text"></input>
        <button onClick={() => this.postPhoto()}>Send</button>
        <br />
        <br />
        <h4> Post album: </h4>
        <span> Name: </span><input id="album-name-input" type="text"></input>
        <span> Channel ID: </span><input id="album-channelId-input" type="text"></input>
        <span> Participant IDs: </span><input id="album-participantIds-input" type="text"></input>
        <button onClick={() => this.postAlbum()}>Send</button>
      </div>      
    );
  }

  postPhoto() {

    const photoPost = {
      "url": document.getElementById("photo-url-input").value,
      "channelId": document.getElementById("photo-channelId-input").value,
      "uploaderId": document.getElementById("photo-uploaderId-input").valuerId,
      "uploadTime": new Date().toISOString(),
      "caption": document.getElementById("photo-caption-input").value
    }

    fetch('photo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(photoPost)
    })
  }

  postAlbum() {

    const albumPost = {
      "name": document.getElementById("album-name-input").value,
      "channelId": document.getElementById("album-channelId-input").value,
      "participantIds": document.getElementById("album-participantIds-input").value.split(',').filter(i => i)
    }

    fetch('album', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(albumPost)
    })
  }


}
