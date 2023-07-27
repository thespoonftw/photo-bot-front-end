import React, { Component } from 'react';
import { Vert } from 'components/Vert';
import { Container } from 'reactstrap';

export class Pagelayout extends Component {

  render () {
    return (
      <div>
        <Vert height='3'></Vert> 
        <h3>{this.props.Title}</h3>

        <> { this.props.Return ? 
            <p
              onClick={() => window.history.back()}
              style={{ color: 'blue', cursor: 'pointer' }}
              onMouseEnter={(e) => { e.target.style.textDecoration = 'underline'; }}
              onMouseLeave={(e) => { e.target.style.textDecoration = 'none'; }}
            >&#60;- Return</p>
            :
            <div/>
        } </>
        

        <Vert height='2'></Vert>
        
        <Container>{this.props.children}</Container>

        <Vert height='2'></Vert>

      </div>
    );
  }
}
