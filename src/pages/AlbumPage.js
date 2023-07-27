import React, { Component } from 'react';
import { PhotoGrid } from 'components/PhotoGrid';
import { Pagelayout } from 'components/PageLayout';
import { Vert } from 'components/Vert';
import Http from 'tools/Http';
import { Users } from 'tools/Users';
import { Helper } from 'tools/Helper';
import { Badge } from 'reactstrap';

export class AlbumPage extends Component {
  static displayName = AlbumPage.name;

  constructor(props) {
    super(props);
    this.state = { albumData: [], loading: true };
  }

  async componentDidMount() {
    const albumData = await Http.getAlbumData(this.props.match.params.name);
    const userDict = await Users.getUserDict();
    //console.log(userData);
    this.setState({ albumData: albumData, userDict: userDict, loading: false });
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
        <PhotoGrid photos={this.state.albumData.photos} userDict={this.state.userDict} />
      </Pagelayout>
    );
  }

  renderUsers(users) {

    const vips = users.filter((u) => u.level >= 1);
    const others = users.filter((u) => u.level < 1);

    return <span>
      {vips.map(u => 
          <span>
          <Badge color="info" style={{ minWidth: '60px' }} >{u.name}</Badge>
          <span> </span>
          </span>
      )}
      {others.map(u => 
          <span>
          <Badge style={{ minWidth: '60px' }} >{u.name}</Badge>
          <span> </span>
          </span>
      )}
    </span>
  }
}
