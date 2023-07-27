import React, { Component } from 'react';
import { Container } from 'reactstrap';
//import { NoMobile } from './components/NoMobile';
import { NavMenu } from './NavMenu';
import { Vert } from 'components/Vert';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div className="layoutWrapper">

        <NavMenu />

      {/*<NoMobile />*/}

      
        <div className="layoutBody">
          <Container>
            {this.props.children}
          </Container>
        </div>
        <div className="footer">
          <Vert height='3'></Vert>
            <center>          
              <p>Footer</p>
            </center>
          <Vert height='3'></Vert>
        </div>
      </div>
    );
  }
}
