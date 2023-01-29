import React, { Component } from 'react';
import { Photo } from './Photo'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

export class PhotoGrid extends Component {
  static displayName = PhotoGrid.name;

  constructor(props) {
      super(props);
      this.state = { fullScreen: false, imageIndex: 0 };
  }

  clickImage(index) {
    this.setState({ fullScreen: true, imageIndex: index });
  }

  render() {
    if (this.props.photos.length === 0) { return <></> }
    var columns = [0, 1, 2];
    var numberOfRows = Math.ceil(this.props.photos.length / 3);
    var rows = Array.from(Array(numberOfRows).keys());
    const toggle = () => this.setState({ fullScreen: !this.state.fullScreen });
  
    return (
      <div className="container">
        {rows.map(y => 
          <div className="row" key={y}>
            {columns.map(x =>
              x + (y * 3) < this.props.photos.length ?
                <Photo 
                  url={`thumbnails/${this.props.photos[x + (y * 3)].id}.jpg`} 
                  onClick={() => this.clickImage(x + (y * 3))} key={x + (y * 3)}
                ></Photo>
                :
                <div className="col-md"></div>
            )}
          </div>          
        )}        
  
        <Modal isOpen={this.state.fullScreen} toggle={toggle} size="xl">
            <ModalHeader toggle={toggle}>
                <div style={{color: "lightgray"}}>#{this.props.photos[this.state.imageIndex].id}</div>
            </ModalHeader>
            <ModalBody>
              <div style={{ width: "100%", paddingBottom: "80vh", overflow: "hidden", position: "relative", background: "#fff", cursor: "pointer" }}>
                <img 
                  src={this.props.photos[this.state.imageIndex].url} 
                  style={{ position: "absolute", top: "50%", left: "50%", maxWidth: "100%", maxHeight: "100%", transform: "translateX(-50%) translateY(-50%)" }} 
                  alt=""
                />
              </div>              
            </ModalBody>
          
          
        </Modal>
  
      </div>      
    );
  }

  
}