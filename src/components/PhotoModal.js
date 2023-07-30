import React, { Component } from 'react';
import { User } from 'tools/User';
import { UserTag } from 'components/UserTag';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { AlbumTag } from './AlbumTag';

export class PhotoModal extends Component {
    static displayName = PhotoModal.name;

    constructor(props){
        super(props);
        this.state = {loaded: false};
        this.state = {errored: false};
    }

    componentDidUpdate(prevProps) {
        if (prevProps.photo !== this.props.photo) {
            this.setState({ loaded: false, errored: false, });
        }
    }

    render() {

        const imgVis = this.state.loaded ? "visible" : "hidden";

        return <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} size="xl">
            <ModalHeader toggle={this.props.toggle}>
                <div style={{display: "flex"}}>

                    <div style={{flex: "0"}}>
                        <span>{this.props.index}&nbsp;/&nbsp;{this.props.maxIndex}</span>
                    </div>

                    <div style={{flex: "1", textAlign: "center", fontStyle: "italic"}}>
                    {this.props.photo.caption}
                    </div>
                    
                </div>              
            </ModalHeader>

            <ModalBody>

                <div style={{display: "flex"}}>

                    <button style={{width: "75px", fontSize: "40px", color: "#999999", backgroundColor: "white", border: "none"}} onClick={this.props.prev}>&lt;</button>

                    <div style={{ width: "100%", height: "75vh", overflow: "hidden", position: "relative", background: "#fff" }}>

                        {!this.state.loaded && !this.state.errored && 
                            <img 
                                src={`thumbnails/${this.props.photo.id}.jpg`} 
                                style={{ width: "100%", height: "100%", objectFit: "contain", top: "0", left: "0" }} 
                                alt=""
                            />
                        }

                        {this.state.errored &&
                            <div style={{position: "absolute", height: "75vh", width: "100%", alignItems: "center", justifyContent: "center", display: "flex"}}>
                                <p>Not found</p>
                            </div>
                        }

                        {!this.state.errored &&
                            <img 
                                src={this.props.photo.url} 
                                style={{ visibility: imgVis,  width: "100%", height: "100%", objectFit: "contain", top: "0", left: "0" }} 
                                alt=""
                                onLoad={() => this.setState({loaded: true})}
                                onError={()=> this.setState({errored: true})}
                            />
                        } 

                    </div>                 

                    <button style={{width: "75px", fontSize: "40px", color: "#999999", backgroundColor: "white", border: "none"}} onClick={this.props.next}>&gt;</button>
                </div>              
                    
                <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center"}}>

                    <div>
                    <img style={{width: "30px", height: "30px"}} alt=""
                        src={"https://static.vecteezy.com/system/resources/previews/000/330/671/original/arrow-up-glyph-black-icon-vector.jpg"}
                    />
                    <img style={{width: "30px", height: "30px", transform: "rotate(180deg)"}} alt=""
                        src={"https://static.vecteezy.com/system/resources/previews/000/330/671/original/arrow-up-glyph-black-icon-vector.jpg"}
                    />
                    <span>{this.props.photo.score}</span>
                    </div>               

                    <div>

                        { User.isAdmin() &&
                        <span>
                            ID: <span style={{display: "inline-block", width: "50px", textAlign: "center"}}><b>{this.props.photo.id}</b></span> &nbsp;
                        </span>
                        }

                        { this.props.albums && <>
                                <span>In: </span>
                            <AlbumTag
                                name={this.props.albums[this.props.photo.albumId].name}
                            />
                            &nbsp;   
                        </>}
                        
                        <span>By: </span>
                        <UserTag 
                            user={this.props.users.getUserFromId(this.props.photo.userId)} 
                            isActive={User.getUser().id === this.props.photo.userId}
                        />
                    </div>

                </div>
            </ModalBody>
        </Modal>
    }
}
