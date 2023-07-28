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
    this.state = { photoList: null };
  }

  async componentDidMount() {
    const photoList = await Http.getPhotosByUser(Users.getUser().id);
    this.setState({ photoList: photoList });
  }

  render () {
    return <>{ this.state.photoList && (

      <Pagelayout Title="My Uploads" >
        <p><b>Photos: </b>{this.state.photoList.length}</p>
        <Vert height='2'></Vert>
        <PhotoGrid photos={this.state.photoList} />
        
      </Pagelayout>

    )}</>
  }
}
