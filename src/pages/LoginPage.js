import React, { Component } from 'react';
import { Pagelayout } from 'components/PageLayout';
import { User } from 'tools/User'
import { Http } from 'tools/Http';
import { UserTag } from 'components/UserTag';

export class LoginPage extends Component {
  static displayName = LoginPage.name;

  constructor(props) {
    super(props);
    this.state = { users: null };
    this.passwordRef = React.createRef();
  } 

  async componentDidMount() {
    const users = await Http.getUsers();
    this.setState({ users: users });
  }

  render () {
    return <>{ this.state.users && (

      <Pagelayout Title="Login">
        { 
          User.getUser()
          ?
          this.renderLogout() 
          :
          this.renderLogin()
        }
      </Pagelayout>

    )}</>
  }

  renderLogin() {
    return <>
      <p>User:</p>
      {this.state.users.getActive().map(u => 
        <UserTag user={u} onClick={() => this.selectUser(u)} isActive={u === this.state.selectedUser} />
      )}
      <br/>
      <br/>
      <p>Password:</p>
      <input type="password" style={{width: "200px"}} ref={this.passwordRef}/>
      <br/>
      <br/>
      <br/>
      {
        this.state.incorrectPassword 
        ?
        <p>Incorrect password</p>
        :
        <p>&nbsp;</p>
      }      
      <button style={{width: "200px"}} disabled={!this.state.selectedUser} onClick={() => this.tryLogin()}>Login</button>

    </>
  }

  renderLogout() {
    return <>
      Logged in as: &nbsp;&nbsp;<UserTag user={User.getUser()} isActive={true} />
      <br/>
      <br/>
      <button onClick={() => this.logout()} style={{width: "200px"}}>Logout</button>
    </>
  }

  selectUser(user) {
    this.setState({selectedUser: user});
  }

  tryLogin() {
    const password = this.passwordRef.current.value;

    if (password === this.state.selectedUser.name) {
      this.login(this.state.selectedUser);
    } else {
      this.setState({incorrectPassword: true});
    }
  }

  login(user) {
    User.setUser(user);
    window.location.reload();
  }

  logout() {
    User.setUser();
    window.location.reload();
  }
}
