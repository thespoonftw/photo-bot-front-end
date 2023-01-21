import React, { Component } from 'react';

export class Tag extends Component {
    static displayName = Tag.name;

    render() {
        return (
            <span className="badge badge-secondary">ㅤ{this.props.children}ㅤ</span>
        );
    }
}
