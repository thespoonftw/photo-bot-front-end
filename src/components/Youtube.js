import React, { Component } from 'react';

export class Youtube extends Component {
    static displayName = Youtube.name;

    render() {
        var src = "https://www.youtube.com/embed/" + this.props.src
        return (
            <div className="col-md">
                <br></br>
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe
                        className="embed-responsive-item"
                        src={src}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={src}
                    >
                    </iframe>
                </div>
            </div>
            
        );
    }
}
