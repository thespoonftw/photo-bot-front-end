import React, { Component } from 'react';
import { Pagelayout } from 'components/PageLayout';
import { Http } from 'tools/Http';
import { PhotoResults} from 'components/PhotoResults';
import { User } from 'tools/User';
import { Helper } from 'tools/Helper';
import { UserTag } from 'components/UserTag';
import { EditButton } from 'components/EditButton';
import { EditDateModal } from 'components/EditDateModal';
import { EditMembersModal } from 'components/EditMembersModal';

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

        <p>
          <b>Date:</b> 
          &nbsp;
          {Helper.getMonth(this.state.albumData.month)} 
          &nbsp;
          {this.state.albumData.year}

          { User.isAdmin() &&
          <EditButton>
            <EditDateModal albumData={this.state.albumData}/>
          </EditButton>
          }
        </p>

        <p>
          <b>Users:</b> 
          &nbsp;
          {this.renderUsers()} 
          { User.isAdmin() &&
          <EditButton>
            <EditMembersModal albumData={this.state.albumData}/>
          </EditButton>
          }
        </p>

        <PhotoResults
          users={this.state.users}
          photos={this.state.albumData.photos}
        />

      </Pagelayout>

    )}</>
  }
  
  renderUsers() {

    const user = User.getUser();
    const isUserInAlbum = user && this.state.usersInAlbum.filter((u) => u.id === user.id).length > 0;
    const vips = this.state.usersInAlbum.filter((u) => u.level >= 1 && (!user || u.id !== user.id));
    const others = this.state.usersInAlbum.filter((u) => u.level < 1 && (!user || u.id !== user.id));

    return <span>
      { isUserInAlbum &&
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
