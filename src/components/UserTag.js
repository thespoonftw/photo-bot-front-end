import React, { Component } from 'react';
import { Badge } from 'reactstrap';

export class UserTag extends Component {
    static displayName = UserTag.name;

    render() {

        let color = "secondary";
        let name = "";
        let cursor = "auto";

        if (this.props.isActive) {
            color = "warning";
        }
        else if (this.props.user && this.props.user.level >= 1) {
            color = "info";
        }
        if (this.props.user) {
            name = this.props.user.name;
        }
        if (this.props.onClick) {
            cursor = "pointer";
        }

        return (
            <span>
                <Badge color={color} style={{ minWidth: '70px', cursor: cursor }} onClick={this.props.onClick} >{name}</Badge>
                <span> </span>
            </span>
        );
    }
}
