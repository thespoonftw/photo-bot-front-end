import React, { Component } from 'react';
import { Pagelayout } from 'components/PageLayout';
import { Http } from 'tools/Http';
import { PhotoResults} from 'components/PhotoResults';
import { User } from 'tools/User';

export class AlbumPage extends Component {
  static displayName = AlbumPage.name;

  constructor(props) {
    super(props);
    this.state = { albumData: null };
  }

  async componentDidMount() {
    const albumData = await Http.getAlbumData(this.props.match.params.name);
    const users = await Http.getUsers();
    const usersInAlbum = users.getUsersFromIds(albumData.usersInAlbum)
    this.setState({ albumData: albumData, users: users, usersInAlbum: usersInAlbum });
  }

  render () {
    return <>{ this.state.albumData && (
      
      <Pagelayout Title={this.state.albumData.name} >

        {
          User.getUser() &&
          <>
            <p><a href="/albums">&#60;- Return</a></p>
            <p>&nbsp;</p>
          </>
        }        

        <PhotoResults
          month={this.state.albumData.month}
          year={this.state.albumData.year}
          users={this.state.users}
          usersInAlbum={this.state.usersInAlbum}
          photos={this.state.albumData.photos}
        />
      </Pagelayout>

    )}</>
  }
}
