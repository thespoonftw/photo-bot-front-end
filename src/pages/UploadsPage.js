import React, { Component } from 'react';
import { PhotoResults } from 'components/PhotoResults';
import { Pagelayout } from 'components/PageLayout';
import { Http } from 'tools/Http';
import { User } from 'tools/User';

export class UploadsPage extends Component {
  static displayName = UploadsPage.name;

  constructor(props) {
    super(props);
    this.state = { photoData: null };
  }

  async componentDidMount() {
    
    const albums = Http.getAlbumDict();
    const users = Http.getUsers();
    const photoData = await Http.getPhotosByUser(User.getUser().id);
    
    this.setState({ photoData: photoData, users: await users, albums: await albums });
  }

  render () {
    return <>{ this.state.photoData && (

      <Pagelayout Title="My Uploads" >
        <PhotoResults photos={this.state.photoData.photos} users={this.state.users} albums={this.state.albums} />        
      </Pagelayout>

    )}</>
  }
}
