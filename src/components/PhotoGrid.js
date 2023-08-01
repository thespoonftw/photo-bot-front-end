import React, { Component } from 'react';
import { PhotoThumbnail } from './PhotoThumbnail'
import { PhotoModal } from './PhotoModal';
import './PhotoGrid.css';

export class PhotoGrid extends Component {
  static displayName = PhotoGrid.name;

  constructor(props) {
      super(props);
      this.state = { isModalOpen: false, imageIndex: 0 };
  }

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  nextPhoto = () => {
    this.setState({ imageIndex: Math.min(this.props.photos.length - 1, this.state.imageIndex + 1)});
  }

  previousPhoto = () => {
    this.setState({ imageIndex: Math.max(0, this.state.imageIndex - 1)});
  }

  clickImage(index) {
    this.setState({ isModalOpen: true, imageIndex: index });
  }

  render() {
    if (this.props.photos.length === 0) { return <></> }
    var columns = [0, 1, 2];
    var numberOfRows = Math.ceil(this.props.photos.length / 3);
    var rows = Array.from(Array(numberOfRows).keys());

    return (
      <div className="container">
        {rows.map(y => 
          <div className="row" key={y}>
            {columns.map(x =>
              x + (y * 3) < this.props.photos.length ?
                <PhotoThumbnail 
                  url={`thumbnails/${this.props.photos[x + (y * 3)].id}.jpg`} 
                  onClick={() => this.clickImage(x + (y * 3))} key={x + (y * 3)}
                ></PhotoThumbnail>
                :
                <div className="col-md"></div>
            )}
          </div>          
        )}        
  
        <PhotoModal 
          index={this.state.imageIndex+1}
          maxIndex={this.props.photos.length}
          isOpen={this.state.isModalOpen} 
          toggle={this.toggleModal} 
          photo={this.props.photos[this.state.imageIndex]} 
          next={this.nextPhoto}
          prev={this.previousPhoto}
          users={this.props.users}
          albums={this.props.albums}
        />
  
      </div>     
    );
  }
}
