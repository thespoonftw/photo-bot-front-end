import React, { Component } from 'react';
import { PhotoGrid } from 'components/PhotoGrid';
import { Pagelayout } from 'components/PageLayout';
import { Vert } from 'components/Vert';
import Http from 'tools/Http';
import { Users } from 'tools/Users';

export class UploadsPage extends Component {
  static displayName = UploadsPage.name;

  constructor(props) {
    super(props);
    this.state = { albumData: [], loading: true };
  }

  async componentDidMount() {
    const photoList = await Http.getPhotosByUser(Users.getUser().id);
    this.setState({ loading: false, photoList: photoList });
  }

  render () {
    return (
      this.state.loading 
      ? <p><em>Loading...</em></p>
      :
      <Pagelayout Title="My Uploads" >
        <p><b>Photos: </b>{this.state.photoList.length}</p>
        <Vert height='2'></Vert>
        <PhotoGrid photos={this.state.photoList} />
        
      </Pagelayout>
    );
  }
}
