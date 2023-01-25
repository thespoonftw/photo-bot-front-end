import React, { Component } from 'react';

export class Upload extends Component {
  static displayName = Upload.name;

  render() {
    return (
      <div>
        <div>Add Image URL: </div>
        <input id="upload-input" type="text"></input>
        <button onClick={() => this.upload()}>Upload</button>
      </div>
    );
  }

  upload() {

    const url = document.getElementById("upload-input").value;

    fetch('photo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: url
    })
  }
}
