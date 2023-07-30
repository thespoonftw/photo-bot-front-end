import React, { Component } from 'react';
import { Badge } from 'reactstrap';

export class AlbumTag extends Component {
    static displayName = AlbumTag.name;

    render() {
        return (
            <span>
                <Badge color="info" style={{ minWidth: '140px' }} onClick={this.props.onClick} >{this.props.name}</Badge>
                <span> </span>
            </span>
        );
    }
}
