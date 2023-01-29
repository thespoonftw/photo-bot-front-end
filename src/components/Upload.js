import React, { Component } from 'react';

export class Upload extends Component {
  static displayName = Upload.name;

  render() {
    return (
      <div>
        <h4>Upload photo: </h4>
        <span> Url: </span><input id="photo-url-input" type="text"></input>
        <span> Channel ID: </span><input id="photo-channelId-input" type="text"></input>
        <button onClick={() => this.postPhoto()}>Send</button>
        <br />
        <br />
        <h4> Create album: </h4>
        <span>Name: </span><input id="album-name-input" type="text"></input>
        <span> Channel ID: </span><input id="album-channelId-input" type="text"></input>
        <button onClick={() => this.postAlbum()}>Send</button>
      </div>      
    );
  }

  postPhoto() {

    const url = document.getElementById("photo-url-input").value;
    const channelId = document.getElementById("photo-channelId-input").value;

    const photoPost = {
      "url": url,
      "channelId": channelId
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

    const name = document.getElementById("album-name-input").value;
    const channelId = document.getElementById("album-channelId-input").value;

    const albumPost = {
      "name": name,
      "channelId": channelId
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
