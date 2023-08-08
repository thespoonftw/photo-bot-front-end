import React, { Component } from 'react';
import { Vert } from 'components/Vert';
import { Container } from 'reactstrap';
import { User } from 'tools/User';

export class Pagelayout extends Component {

  render () {
    return (
      <div>

        <Vert height='3'></Vert> 

        { this.props.Title &&
          <h3>{this.props.Title}</h3>
        }

        {
          this.props.Title &&
            <Vert height='2'></Vert>
        }        
        
        <Container>{this.props.children}</Container>

        <Vert height='5'></Vert>

      </div>
    );
  }
}
