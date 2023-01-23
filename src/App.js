import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './Layout';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { PhotoHoliday } from './pages/PhotoHoliday';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={PhotoHoliday} />
        <Route path='/counter' component={Counter} />
        <Route path='/test' component={FetchData} />
      </Layout>
    );
  }
}
