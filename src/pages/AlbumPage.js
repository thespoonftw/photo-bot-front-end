import React, { Component } from 'react';
import { PhotoGrid } from 'components/PhotoGrid';
import { Pagelayout } from 'components/PageLayout';
import { Vert } from 'components/Vert';
import { Http } from 'tools/Http';
import { User } from 'tools/User';
import { Helper } from 'tools/Helper';
import { UserTag } from 'components/UserTag';

export class AlbumPage extends Component {
  static displayName = AlbumPage.name;

  constructor(props) {
    super(props);
    this.state = { albumData: null };
  }

  async componentDidMount() {
    const albumData = Http.getAlbumData(this.props.match.params.name);
    const users = Http.getUsers();
    this.setState({ albumData: await albumData, users: await users });
  }

  render () {
    return <>{ this.state.albumData && (
      
      <Pagelayout Title={this.state.albumData.name} Return={true} >
        <p><b>Date:</b> {Helper.getMonth(this.state.albumData.month)} {this.state.albumData.year}</p>
        <p><b>Photos: </b>{this.state.albumData.photos.length}</p>
        <p><b>Users:</b> {this.renderUsers(this.state.albumData.usersInAlbum)} </p>
        <Vert height='2'></Vert>
        <PhotoGrid photos={this.state.albumData.photos} users={this.state.users}/>
      </Pagelayout>

    )}</>
  }

  renderUsers(userIds) {

    const user = User.getUser();
    const users = this.state.users.getUsersFromIds(userIds);

    const vips = users.filter((u) => u.level >= 1 && (!user || u.id !== user.id));
    const others = users.filter((u) => u.level < 1 && (!user || u.id !== user.id));

    return <span>
      { user && userIds.includes(user.id) &&
        <UserTag user={user} isActive={true} />
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
