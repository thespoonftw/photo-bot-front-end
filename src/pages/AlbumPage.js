import React, { Component } from 'react';
import { Vert } from '../components/Vert';
import { PhotoGrid } from '../components/PhotoGrid';
import { Link } from 'react-router-dom';

export class AlbumPage extends Component {
  static displayName = AlbumPage.name;

  constructor(props) {
    super(props);
    this.state = { albumData: [], loading: true };
  }

  componentDidMount() {
    this.getAlbumData();
  }
  
  async getAlbumData() {
    const id = this.props.match.params.id;
    const response = await fetch('album/' + id);
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
        <h3>{this.state.albumData.album.name} - {this.state.albumData.album.year}</h3>
        <Link to='/'>&#60;- Return</Link>
        <Vert height='2'></Vert>
        <PhotoGrid photos={this.state.albumData.photos} />
        <Vert height='20'></Vert>
      </div>
    );
  }
}
