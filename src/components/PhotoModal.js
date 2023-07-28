import React, { Component } from 'react';
import { User } from 'tools/User';
import { UserTag } from 'components/UserTag';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

export class PhotoModal extends Component {
    static displayName = PhotoModal.name;

    render() {
        return <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} size="xl">
            <ModalHeader toggle={this.props.toggle}>
                <div style={{display: "flex"}}>
                    <div style={{flex: "0"}}>
                    #{this.props.photo.id}
                    </div>
                    <div style={{flex: "1", textAlign: "center", fontStyle: "italic"}}>
                    {this.props.photo.caption}
                    </div>
                </div>              
            </ModalHeader>

            <ModalBody>

                <div style={{display: "flex"}}>

                    <button style={{width: "75px", fontSize: "40px", color: "#999999", backgroundColor: "white", border: "none"}} onClick={this.props.prev}>&lt;</button>

                    <div style={{ width: "100%", paddingBottom: "75vh", overflow: "hidden", position: "relative", background: "#fff" }}>
                    <img 
                        src={this.props.photo.url} 
                        style={{ position: "absolute", top: "50%", left: "50%", maxWidth: "100%", maxHeight: "100%", transform: "translateX(-50%) translateY(-50%)" }} 
                        alt=""
                    />
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
