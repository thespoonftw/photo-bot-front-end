import React, { Component } from 'react';
import { Pagelayout } from './PageLayout';

export class LoginPage extends Component {
  static displayName = LoginPage.name;

  render () {
    return (
      <Pagelayout Title="Login">
        <p>You are not logged in?</p>
      </Pagelayout>
    );
  }
}
