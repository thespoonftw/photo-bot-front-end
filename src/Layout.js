import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { Vert } from 'components/Vert';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div className="layoutWrapper">

        <NavMenu />
      
        <div className="layoutBody">
          <Container>
            {this.props.children}
          </Container>
        </div>
        <div className="footer">
          <Vert height='2'></Vert>
            <center>          
              <p>Brunch !</p>
            </center>
          <Vert height='2'></Vert>
        </div>
      </div>
    );
  }
}
