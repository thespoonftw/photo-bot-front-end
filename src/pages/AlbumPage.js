import React, { Component } from 'react';
import { PhotoGrid } from 'components/PhotoGrid';
import { Pagelayout } from 'components/PageLayout';
import { Vert } from 'components/Vert';
import Http from 'tools/Http';
import { Users } from 'tools/Users';
import { Helper } from 'tools/Helper';
import { UserTag } from 'components/UserTag';

export class AlbumPage extends Component {
  static displayName = AlbumPage.name;

  constructor(props) {
    super(props);
    this.state = { albumData: [], loading: true };
  }

  async componentDidMount() {
    const albumData = await Http.getAlbumData(this.props.match.params.name);
    this.setState({ albumData: albumData, loading: false });
  }

  render () {
    return (
      this.state.loading 
      ? <p><em>Loading...</em></p>
      :
      <Pagelayout Title={this.state.albumData.album.name} Return={true} >
        <p><b>Date:</b> {Helper.getMonth(this.state.albumData.album.month)} {this.state.albumData.album.year}</p>
        <p><b>Photos: </b>{this.state.albumData.photos.length}</p>
        <p><b>Users:</b> {this.renderUsers(this.state.albumData.usersInAlbum)} </p>
        <Vert height='2'></Vert>
        <PhotoGrid photos={this.state.albumData.photos}/>
      </Pagelayout>
    );
  }

  renderUsers(userIds) {

    const user = Users.getUser();
    const users = Users.getUsersFromIds(userIds);

    const vips = users.filter((u) => u.level >= 1 && u.id !== user.id);
    const others = users.filter((u) => u.level < 1 && u.id !== user.id);

    return <span>
      {
        userIds.includes(user.id)
        ?
        <UserTag user={user} isActive={true} />
        :
        null
      }
      {vips.map(u => 
        <UserTag user={u} />
      )}
      {others.map(u => 
        <UserTag user={u} />
      )}
    </span>
  }
}
