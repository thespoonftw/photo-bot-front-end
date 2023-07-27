import React, { Component } from 'react';
import { FetchData } from 'components/FetchData';
import { Upload } from 'components/Upload';
import { Vert } from 'components/Vert';
import { Pagelayout } from 'components/PageLayout';

export class TestPage extends Component {
  static displayName = TestPage.name;

  render () {
    return (
      <Pagelayout Title="Test">
        <FetchData />
        <Vert height='5'/>
        <Upload />
      </Pagelayout>      
    );
  }
}
