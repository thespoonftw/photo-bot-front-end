import React, { Component } from 'react';
import { PhotoGrid } from 'components/PhotoGrid';
import { Pagelayout } from 'components/PageLayout';
import { Vert } from 'components/Vert';
import { Http } from 'tools/Http';
import { User } from 'tools/User';

export class UploadsPage extends Component {
  static displayName = UploadsPage.name;

  constructor(props) {
    super(props);
    this.state = { photoList: null };
  }

  async componentDidMount() {
    const photoList = Http.getPhotosByUser(User.getUser().id);
    const users = Http.getUsers();
    this.setState({ photoList: await photoList, users: await users });
  }

  render () {
    return <>{ this.state.photoList && (

      <Pagelayout Title="My Uploads" >
        <p><b>Photos: </b>{this.state.photoList.length}</p>
        <Vert height='2'></Vert>
        <PhotoGrid photos={this.state.photoList} users={this.state.users} />
        
      </Pagelayout>

    )}</>
  }
}
