import React, { Component } from 'react';
import { Imgur } from './Imgur'
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
    //const modalStyle = { width: "80%" };
  
    return (
      <div className="container">
        {rows.map(y => 
          <div className="row" key={y}>
            {columns.map(x =>
              x + (y * 3) < this.props.photos.length ?
                <Imgur square url={this.props.photos[x + (y * 3)]} onClick={() => this.clickImage(x + (y * 3))} key={x + (y * 3)}></Imgur>
                :
                <div className="col-md"></div>
            )}
          </div>          
        )}        
  
        <Modal isOpen={this.state.fullScreen} toggle={toggle} size="xl">
            <ModalHeader toggle={toggle}>
                
            </ModalHeader>
            <ModalBody>
              <img src={this.props.photos[this.state.imageIndex]} style={{width: "100%"}} alt=""></img>
            </ModalBody>
          
          
        </Modal>
  
      </div>      
    );
  }

  
}