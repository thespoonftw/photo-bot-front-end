import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './Layout';
import { LoginPage } from 'pages/LoginPage';
import { TestPage } from 'pages/TestPage';
import { UploadsPage } from 'pages/UploadsPage';
import { DirectoryPage } from 'pages/DirectoryPage';
import { AlbumPage } from 'pages/AlbumPage';
import { TrashPage } from 'pages/TrashPage';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={DirectoryPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/uploads' component={UploadsPage} />
        <Route path='/test' component={TestPage} />
        <Route path='/trash' component={TrashPage} />
        <Route path='/album/:name' component={AlbumPage} />
      </Layout>
    );
  }
}
