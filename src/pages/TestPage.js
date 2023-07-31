import React, { Component } from 'react';
import { FetchData } from 'components/FetchData';
import { Upload } from 'components/Upload';
import { Vert } from 'components/Vert';
import { Pagelayout } from 'components/PageLayout';
import { PhotoGrid } from 'components/PhotoGrid';
import { Http } from 'tools/Http';

export class TestPage extends Component {
  static displayName = TestPage.name;

  constructor(props) {
    super(props);
    this.state = { albumData: null };
  }

  async componentDidMount() {
    const albumData = Http.getAlbumData("Test+Album");
    const users = Http.getUsers();
    this.setState({ users: await users, albumData: await albumData });
  }

  render () {
    return (
      <Pagelayout Title="Test">
        <FetchData />
        <Vert height='5'/>
        <Upload />
        <Vert height='3'/>
        <h3>Test Album</h3>
        {
          this.state.albumData && 
          <PhotoGrid photos={this.state.albumData.photos} users={this.state.users}/>
        }        
      </Pagelayout>      
    );
  }
}
