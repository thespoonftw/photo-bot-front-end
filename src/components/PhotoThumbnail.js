import React, { Component } from 'react';

export class PhotoThumbnail extends Component {
    static displayName = PhotoThumbnail.name;

    constructor(props){
        super(props);
        this.state = {loaded: false};
        this.state = {errored: false};
      }

    render() {
        return (
            <div className="col-md">
                <br></br>
                <div style={{ width: "100%", paddingBottom: "100%", overflow: "hidden", position: "relative", background: "#fff", cursor: "pointer" }}>
                    {!this.state.loaded ? 
                        <img src={'./loading.gif'} style={{ position: "absolute", width: "100%" }} alt=""/>
                        :
                        null
                    }
                    {this.state.errored ? 
                        <img 
                            src={'./nothumbnail.png'} style={{ position: "absolute", width: "100%" }} alt=""
                            onClick={this.props.onClick} 
                        />
                        :
                        null
                    }
                    {!this.state.errored ?
                        <img 
                            onClick={this.props.onClick} 
                            style={{ position: "absolute", top: "50%", left: "50%", maxWidth: "100%", maxHeight: "100%", transform: "translateX(-50%) translateY(-50%)" }} 
                            src={this.props.url} 
                            alt="alt text yet to be added" 
                            onLoad={() => this.setState({loaded: true})}
                            onError={()=> this.setState({errored: true})}
                        />
                        :
                        null
                    }                    
                </div>      
            </div>
        );
    }
}
