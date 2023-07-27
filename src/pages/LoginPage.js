import React, { Component } from 'react';
import { Pagelayout } from './PageLayout';
import { Badge } from 'reactstrap';
import { Users } from '../Users';

export class LoginPage extends Component {
  static displayName = LoginPage.name;

  constructor(props) {
    super(props);
    this.state = { users: [], loading: true };
  }

  async componentDidMount() {
    const users = await Users.getActiveUsers();
    this.setState({ users: users, loading: false });
  }

  render () {
    return (
      this.state.loading 
      ? <p><em>Loading...</em></p>
      :
      <Pagelayout Title="Login">
        { 
          Users.getUser()
          ?
          this.renderLogout() 
          :
          this.renderLogin()
        }
      </Pagelayout>
    );
  }

  renderLogin() {
    return <>
      <p>Select User:</p>
      {this.state.users.map(u => 
        <span>
        <Badge color="info" style={{ minWidth: '60px' }} onClick={() => this.login(u)} >{u.name}</Badge>
        <span> </span>
        </span>
      )}
    </>
  }

  renderLogout() {
    return <>
      Logged in as: <Badge color="info" style={{ minWidth: '60px' }}>{Users.getUser().name}</Badge>
      <br/>
      <br/>
      <button onClick={() => this.logout()}>Logout</button>
    </>
  }

  login(user) {
    Users.setUser(user);
    window.location.reload();
  }

  logout() {
    Users.setUser();
    window.location.reload();
  }
}
