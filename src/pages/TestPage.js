import React, { Component } from 'react';
import { FetchData } from '../components/FetchData';
import { Upload } from '../components/Upload';
import { Vert } from '../components/Vert';

export class TestPage extends Component {
  static displayName = TestPage.name;

  render () {
    return (
      <div>
        <Vert height='5'/>
        <FetchData />
        <Vert height='5'/>
        <Upload />
        <Vert height='5'/>
      </div>      
    );
  }
}
