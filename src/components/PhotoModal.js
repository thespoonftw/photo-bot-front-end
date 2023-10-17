import React, { Component } from 'react';
import { User } from 'tools/User';
import { UserTag } from 'components/UserTag';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import { AlbumTag } from 'components/AlbumTag';
import { Http } from 'tools/Http'; 

export class PhotoModal extends Component {
    static displayName = PhotoModal.name;

    constructor(props){
        super(props);
        this.state = {loaded: false, errored: false, trashed: false, reactLevel: null, score: 0};
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }
    
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (event) => {
        if (event.keyCode === 37) { // Left
            this.props.prev();
        } else if (event.keyCode === 38) { // Up
            this.setReactLevel(0);
        } else if (event.keyCode === 39) { // Right
            this.props.next();
        } else if (event.keyCode === 40) { // Down
            this.setReactLevel(null);
        } else if (event.keyCode === 46) { // Delete
            this.sendToTrash();
        }
      };

    async componentDidUpdate(prevProps) {
        if ((!prevProps.isOpen && this.props.isOpen) || prevProps.photo !== this.props.photo) {
            this.setState({ loaded: false, errored: false, score: this.props.photo.score, reactLevel: null });
            this.setState({ trashed: this.props.photo.isTrashed })

            if (!User.getUser()) { return; }
            const reply = await Http.getReactLevel(User.getUser().id, this.props.photo.id);
            this.setState({ reactLevel: reply.level });
        }
    }

    setReactLevel(reactLevel) {
        const newScore = this.state.score + this.levelToScore(reactLevel) - this.levelToScore(this.state.reactLevel);
        this.props.photo.score = newScore;
        this.setState({reactLevel: reactLevel, score: newScore})
        Http.postReact(this.props.photo.id, User.getUser().id, reactLevel);
    }

    levelToScore(reactLevel) {
        if (reactLevel === 0) {
            return 1;
        } else if (reactLevel === 1) {
            return 3;
        } else {
            return 0;
        }
    }

    sendToTrash() {
        this.setState({trashed: true});
        this.props.photo.isTrashed = true;
        Http.sendToTrash(this.props.photo.id);
    }

    deletePhoto() {
        this.setState({trashed: true});
        this.props.photo.isTrashed = true;
        Http.deletePhoto(User.getUser().id, this.props.photo.id);
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

                    <div style={{outline: "1px"}}>

                        <span style={{display: "inline-block", width: "25px", textAlign: "center", fontWeight: "bold", fontSize: "24px"}}>{this.state.score}</span>

                        { this.state.reactLevel === 0 ?
                            <span style={{width: "20px", height: "20px", cursor: "pointer", backgroundColor: "gold", fontSize: "24px"}} onClick={() => this.setReactLevel(null)}>
                                👍
                            </span>
                            :
                            <span style={{width: "20px", height: "20px", cursor: "pointer", fontSize: "24px"}} onClick={() => this.setReactLevel(0)}>
                                👍
                            </span>
                        }

                        &nbsp;

                        { this.state.reactLevel === 1 ?
                            <span style={{width: "20px", height: "20px", cursor: "pointer", backgroundColor: "gold", fontSize: "24px"}} onClick={() => this.setReactLevel(null)}>
                                ❤️
                            </span>
                            :
                            <span style={{width: "20px", height: "20px", cursor: "pointer", fontSize: "24px"}} onClick={() => this.setReactLevel(1)}>
                                ❤️
                            </span>
                        }

                        { User.isAdmin() &&
                            <span>
                                &nbsp;
                                &nbsp;
                                { this.state.trashed 
                                ?
                                <>
                                    <Button
                                        outline 
                                        disabled
                                        style={{width: "75px", height: "20px", display: "inline-flex", alignItems: "center", justifyContent: "center"}}
                                        >Trashed
                                    </Button>
                                </>
                                
                                :
                                <>
                                    <Button 
                                        outline 
                                        color="secondary" 
                                        style={{width: "75px", height: "20px", display: "inline-flex", alignItems: "center", justifyContent: "center"}}
                                        onClick={() => this.sendToTrash()}
                                        >Trash
                                    </Button>
                                    &nbsp;
                                    <Button 
                                        outline 
                                        color="secondary" 
                                        style={{width: "75px", height: "20px", display: "inline-flex", alignItems: "center", justifyContent: "center"}}
                                        onClick={() => this.deletePhoto()}
                                        >Delete
                                    </Button>
                                </>                                
                                }

                                
                            </span>
                        }

                                          
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
                            isActive={User.getUser() && User.getUser().id === this.props.photo.userId}
                        />
                    </div>

                </div>
            </ModalBody>
        </Modal>
    }
}
