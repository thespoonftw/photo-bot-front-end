import React, { Component } from 'react';
import { Vert } from './Vert';

export class Loading extends Component {
    static displayName = Loading.name;

    render() {
        return (
            <div>
                <Vert height='5' />
                <p>Loading content...</p>
                <Vert height='30' />
            </div>
            
        );
    }
}
