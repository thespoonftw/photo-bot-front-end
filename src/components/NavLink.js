import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class NavLink extends Component {
    static displayName = NavLink.name;

    render() {
        const type = window.location.pathname;
        const weight = type == this.props.to ? { fontWeight: "bold" } : { fontWeight: "normal" };

        return (
            <Link to={this.props.to} style={{color: "black", textDecoration: "none"}}>
                <span style={weight}>{this.props.children}</span>                
            </Link>
        );
    }
}
