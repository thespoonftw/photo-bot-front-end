import React, { Component } from 'react';
import { PhotoGrid } from '../components/PhotoGrid';
import { Pagelayout } from './PageLayout';
import { Vert } from '../components/Vert';
import { Http } from '../Http';
import { Helper } from '../Helper';
import { Badge } from 'reactstrap';

export class AlbumPage extends Component {
  static displayName = AlbumPage.name;

  constructor(props) {
    super(props);
    this.state = { albumData: [], loading: true };
  }

  async componentDidMount() {
    const data = await Http.getAlbumData(this.props.match.params.name);
    this.setState({ albumData: data, loading: false });
  }

  render () {
    return (
      this.state.loading 
      ? <p><em>Loading...</em></p>
      :
      <Pagelayout Title={this.state.albumData.album.name} Return={true} >
        <p><b>Date:</b> {Helper.getMonth(this.state.albumData.album.month)} {this.state.albumData.album.year}</p>

        <p><b>In Album:</b> {this.renderUsers(this.state.albumData.usersInAlbum)} </p>
        <Vert height='2'></Vert>
        <PhotoGrid photos={this.state.albumData.photos} />
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
