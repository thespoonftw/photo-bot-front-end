import React, { Component } from 'react';
import { Photo } from './Photo'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import './PhotoGrid.css';
import { UserTag } from 'components/UserTag';
import { Users } from 'tools/Users';

export class PhotoGrid extends Component {
  static displayName = PhotoGrid.name;

  constructor(props) {
      super(props);
      this.state = { fullScreen: false, imageIndex: 0, loading: true };
  }

  clickImage(index) {
    this.setState({ fullScreen: true, imageIndex: index });
  }

  async componentDidMount() {
    const userDict = await Users.getUserDict();
    this.setState({ userDict: userDict, loading: false });
  }

  render() {
    if (this.props.photos.length === 0) { return <></> }
    var columns = [0, 1, 2];
    var numberOfRows = Math.ceil(this.props.photos.length / 3);
    var rows = Array.from(Array(numberOfRows).keys());
    const toggle = () => this.setState({ fullScreen: !this.state.fullScreen });
  
    return (
      this.state.loading 
      ? <p><em>Loading...</em></p>
      :
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
              <div style={{display: "flex"}}>
                <div style={{flex: "0"}}>
                  #{this.props.photos[this.state.imageIndex].id}
                </div>
                <div style={{flex: "1", textAlign: "center", fontStyle: "italic"}}>
                  {this.props.photos[this.state.imageIndex].caption}
                </div>
              </div>              
            </ModalHeader>
            <ModalBody>
              <div style={{ width: "100%", paddingBottom: "75vh", overflow: "hidden", position: "relative", background: "#fff" }}>
                <img 
                  src={this.props.photos[this.state.imageIndex].url} 
                  style={{ position: "absolute", top: "50%", left: "50%", maxWidth: "100%", maxHeight: "100%", transform: "translateX(-50%) translateY(-50%)" }} 
                  alt=""
                />
              </div>
              <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center"}}>

                <div>
                  <img style={{width: "30px", height: "30px"}} alt=""
                    src={"https://static.vecteezy.com/system/resources/previews/000/330/671/original/arrow-up-glyph-black-icon-vector.jpg"}
                  />
                  <img style={{width: "30px", height: "30px", transform: "rotate(180deg)"}} alt=""
                    src={"https://static.vecteezy.com/system/resources/previews/000/330/671/original/arrow-up-glyph-black-icon-vector.jpg"}
                  />
                  <span>{this.props.photos[this.state.imageIndex].score}</span>
                </div>               

                <div>
                  <span>By: </span>
                  <UserTag 
                    user={this.state.userDict[this.props.photos[this.state.imageIndex].userId]} 
                    isActive={Users.getUser().id === this.props.photos[this.state.imageIndex].userId}
                  />
                </div>

              </div>
                 
            </ModalBody>
          
          
        </Modal>
  
      </div>     
    );
  }

  
}