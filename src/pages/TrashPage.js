import React, { Component } from 'react';
import { PhotoGrid } from 'components/PhotoGrid';
import { Pagelayout } from 'components/PageLayout';
import { Vert } from 'components/Vert';
import { Http } from 'tools/Http';

export class TrashPage extends Component {
  static displayName = TrashPage.name;

  constructor(props) {
    super(props);
    this.state = { albumData: null };
  }

  async componentDidMount() {
    const albumData = Http.getTrashPhotos();
    const users = Http.getUsers();
    this.setState({ users: await users, albumData: await albumData });
  }

  render () {
    return <>{ this.state.albumData && (

      <Pagelayout Title="Trash" >
        <p><b>Photos: </b>{this.state.albumData.photos.length}</p>
        <Vert height='2'></Vert>
        <PhotoGrid photos={this.state.albumData.photos} users={this.state.users} />
        
      </Pagelayout>

    )}</>
  }
}
