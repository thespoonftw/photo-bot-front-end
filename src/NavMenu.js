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
                  <span><NavLink to="/login" className="navMenuItem" activeClassName="navMenuItemActive" exact>Login</NavLink></span>
                  <span> • </span>
                  <span><NavLink to="/test" className="navMenuItem" activeClassName="navMenuItemActive" exact>Test</NavLink></span>
                </span>                
              </div>
            </div>
          </div>
          <br></br>
        </div>
      </header>
    );
  }
}
