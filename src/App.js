import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './Layout';
import { LoginPage } from './pages/LoginPage';
import { TestPage } from './pages/TestPage';
import { DirectoryPage } from './pages/DirectoryPage';
import { AlbumPage } from './pages/AlbumPage';
import './custom.css'


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={DirectoryPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/test' component={TestPage} />
        <Route path='/album/:name' component={AlbumPage} />
      </Layout>
    );
  }
}
