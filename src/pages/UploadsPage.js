import React, { Component } from 'react';
import { PhotoResults } from 'components/PhotoResults';
import { Pagelayout } from 'components/PageLayout';
import { Http } from 'tools/Http';
import { User } from 'tools/User';

export class UploadsPage extends Component {
  static displayName = UploadsPage.name;

  constructor(props) {
    super(props);
    this.state = { photoList: null };
  }

  async componentDidMount() {
    const photos = Http.getPhotosByUser(User.getUser().id);
    const albums = Http.getAlbumDict();
    const users = Http.getUsers();
    this.setState({ photos: await photos, users: await users, albums: await albums });
  }

  render () {
    return <>{ this.state.photos && (

      <Pagelayout Title="My Uploads" >
        <PhotoResults photos={this.state.photos} users={this.state.users} albums={this.state.albums} />        
      </Pagelayout>

    )}</>
  }
}
