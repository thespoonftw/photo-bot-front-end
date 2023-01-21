import React, { Component } from 'react';
//import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
//import { Link } from 'react-router-dom';
//import './NavMenu.css';
//import { NavLink } from './components/NavLink';
import { NavLink } from 'react-router-dom';
import './Common.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>        
        <div style={{ backgroundColor: "#dddddd" }}>
          <br></br>
          <div className="container">
            <div className="row">
              <div className="col-md">
                <div className="row" style={{display: "table"}}>
                  <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                    <span style={{ fontSize: "32px" }}><b>Discord PhotoBot</b></span>
                  </div>
                </div>
              </div>

              <div className="col-md" style={{display: "table"}}>
                <span style={{ fontSize: "18px", display: "table-cell", verticalAlign: "middle", textAlign: "right" }}>
                  
                  <br></br>
                  <br></br>
                  <span><NavLink to="/" className="navMenuItem" activeClassName="navMenuItemActive" exact>Home</NavLink></span>
                  <span> • </span>
                  <span><NavLink to="/counter" className="navMenuItem" activeClassName="navMenuItemActive" exact>Counter</NavLink></span>
                </span>                
              </div>
            </div>
          </div>
          <br></br>
        </div>
      </header>
    );

    /*
    <Container>
    <NavbarBrand tag={Link} to="/" >Michael Wright  </NavbarBrand>
              <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
              <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                <ul className="navbar-nav flex-grow">              
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/">Blog</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/career">Career</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/skills">Skills</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/games">Games</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/art">Art</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/travel">Travel</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/photos">Photos</NavLink>
                  </NavItem>
                </ul>
              </Collapse>
            </Container>

    */
  }


}
