import React, { Component } from 'react';
import { Http } from 'tools/Http';

export class EditMembersModal extends Component {
  static displayName = EditMembersModal.name;

  constructor(props) {
    super(props);
    this.state = { users: null, usersInAlbum: this.props.albumData.usersInAlbum };
  }

  async componentDidMount() {
    const users = await Http.getUsers();
    this.setState({ users: users });
  }

  handleRemoveUser = (userId) => {
    const newUsers = this.state.usersInAlbum.filter(item => item !== userId);
    this.setState({ usersInAlbum: newUsers });
  };

  handleUserChange = (e) => {
    const id = parseInt(e.target.value);
    if (id == -1) { return; }
    if (this.state.usersInAlbum.includes(id)) { return; }
    const newUsers = [...this.state.usersInAlbum, id];
    this.setState({ usersInAlbum: newUsers });
  };

  saveUsers = async () => {
    await Http.setAlbumUsers(this.props.albumData.id, this.state.usersInAlbum);
    window.location.reload();
  };

  render() {

    return (
      <>
        {
          this.state.users && 
          <>
            {this.state.usersInAlbum.map((userId) => (
              <div>
                <button style={{width: "25px"}} onClick={() => this.handleRemoveUser(userId)}>x</button>
                &nbsp;
                {this.state.users.getUserFromId(userId).name}
              </div>
            ))}

            <br />

            <div>
              Add:
              &nbsp;
              <select
                style={{ width: "100px" }}
                onChange={this.handleUserChange}
              >
                <option value={-1}>-</option>
                {this.state.users.getAll().map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            <br />
            <br />

            <button onClick={this.saveUsers}>Save</button>
          </>
        }        
      </>
    );
  }
}