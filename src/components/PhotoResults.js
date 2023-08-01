import React, { Component } from 'react';
import { PhotoGrid } from 'components/PhotoGrid';
import { Vert } from 'components/Vert';
import { User } from 'tools/User';
import { Helper } from 'tools/Helper';
import { UserTag } from 'components/UserTag';

const POPULAR = "Most Popular";
const NEWEST = "Newest";
const OLDEST = "Oldest";

export class PhotoResults extends Component {
  static displayName = PhotoResults.name;

  constructor(props) {
    super(props);
    this.state = { photos: null };
  }

  componentDidMount() {
    this.sortPhotos(POPULAR);
  }

  handleSortChange = (event) => {
    this.sortPhotos(event.target.value);
  };

  sortPhotos(mode) {
    let photos;
    if (mode == POPULAR) {
      photos = this.props.photos.slice().sort((a, b) => b.score - a.score)
    } else if (mode == NEWEST) {
      photos = this.props.photos.slice().sort((a, b) => b.id - a.id);
    } else if (mode == OLDEST) {
      photos = this.props.photos.slice().sort((a, b) => a.id - b.id);
    }
    this.setState({photos: photos});    
  }

  render () {
    return <>
      { this.props.month && this.props.year &&
        <p><b>Date:</b> {Helper.getMonth(this.props.month)} {this.props.year}</p>
      }

      <p><b>Photos: </b>{this.props.photos.length}</p>

      { this.props.usersInAlbum &&
        <p><b>Users:</b> {this.renderUsers()} </p>
      }
      
      <p>
        <b>Sort By: &nbsp;</b>
        <select style={{width: "150px"}} onChange={this.handleSortChange} >
          <option>{POPULAR}</option>
          <option>{OLDEST}</option>
          <option>{NEWEST}</option>
        </select>
      </p> 
      <Vert height='2'></Vert>
      { this.state.photos &&
        <PhotoGrid photos={this.state.photos} users={this.props.users} albums={this.props.albums}/>
      }
      
    </>
  }

  setSorting() {

  }

  renderUsers() {

    const user = User.getUser();
    const isUserInAlbum = this.props.usersInAlbum.filter((u) => u.id === user.id).length > 0;
    const vips = this.props.usersInAlbum.filter((u) => u.level >= 1 && (!user || u.id !== user.id));
    const others = this.props.usersInAlbum.filter((u) => u.level < 1 && (!user || u.id !== user.id));

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
