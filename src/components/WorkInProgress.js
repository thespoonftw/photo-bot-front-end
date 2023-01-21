import React, { Component } from 'react';
import { Vert } from './Vert';

export class WorkInProgress extends Component {
    static displayName = WorkInProgress.name;

    render() {
        return (
            <div>
                <p>Page work in progress. Try another page.</p>
                <Vert height='30' />
            </div>
            
        );
    }
}
