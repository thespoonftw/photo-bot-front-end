import React, { Component } from 'react';
import { Vert } from '../components/Vert';
import { Link } from 'react-router-dom';

export class DirectoryPage extends Component {
  static displayName = DirectoryPage.name;

  constructor(props) {
    super(props);
    this.state = { albumData: [], loading: true };
  }

  componentDidMount() {
    this.getAllPhotos();
  }
  
  async getAllPhotos() {
    const response = await fetch('album');
    const data = await response.json();
    this.setState({ albumData: data, loading: false });
  }

  render () {
    return (
      this.state.loading 
      ? <p><em>Loading...</em></p>
      :
      <div>
        <Vert height='3'></Vert> 
        <h2>Albums</h2>
        <Vert height='2'></Vert>
        <ul>
          {
            this.state.albumData.map(a => 
              <li key={a.id}><Link to={"/album/" + a.id} style={{fontSize: "20px"}} >{a.year} - {a.name}</Link></li>
            )
          }
        </ul>        
        <Vert height='20'></Vert>
      </div>
    );
  }
}
