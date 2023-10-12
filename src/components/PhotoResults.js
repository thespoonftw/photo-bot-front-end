import React, { Component } from 'react';
import { PhotoGrid } from 'components/PhotoGrid';
import { Vert } from 'components/Vert';

const POPULAR = "Most Popular";
const NEWEST = "Newest";
const OLDEST = "Oldest";

export class PhotoResults extends Component {
  static displayName = PhotoResults.name;

  constructor(props) {
    super(props);
    this.state = { photos: null };
  }

  componentDidMount() {
    this.sortPhotos(POPULAR);
  }

  handleSortChange = (event) => {
    this.sortPhotos(event.target.value);
  };

  sortPhotos(mode) {
    let photos;
    if (mode === POPULAR) {
      photos = this.props.photos.slice().sort((a, b) => b.score - a.score)
    } else if (mode === NEWEST) {
      photos = this.props.photos.slice().sort((a, b) => b.id - a.id);
    } else if (mode === OLDEST) {
      photos = this.props.photos.slice().sort((a, b) => a.id - b.id);
    }
    this.setState({photos: photos});    
  }

  render () {
    return <>
      <p><b>Photos: </b>{this.props.photos.length}</p>

      <p>
        <b>Sort By: &nbsp;</b>
        <select style={{width: "150px"}} onChange={this.handleSortChange} >
          <option>{POPULAR}</option>
          <option>{OLDEST}</option>
          <option>{NEWEST}</option>
        </select>
      </p> 
      <Vert height='2'></Vert>
      { this.state.photos &&
        <PhotoGrid photos={this.state.photos} users={this.props.users} albums={this.props.albums}/>
      }
      
    </>
  }
}
