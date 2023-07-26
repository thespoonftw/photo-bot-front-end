import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Pagelayout } from './PageLayout';
import Http from '../Http';

export class DirectoryPage extends Component {
  static displayName = DirectoryPage.name;

  constructor(props) {
    super(props);
    this.state = { albumData: [], loading: true };
  }

  async componentDidMount() {
    const data = await Http.getAllPhotos();
    this.setState({ albumData: data, loading: false });
  }

  render () {
    return (
      this.state.loading 
      ? <p><em>Loading...</em></p>
      :
      <Pagelayout Title="Albums">
        <ul>
          {
            this.state.albumData.map(a => 
              <li key={a.id}><Link to={"/album/" + a.name.replace(/ /g, "_") + "_" + a.year} style={{fontSize: "20px"}} >{a.year} - {a.name}</Link></li>
            )
          }
        </ul>
      </Pagelayout>
    );
  }
}
