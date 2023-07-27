import React, { Component } from 'react';
//import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
//import { Link } from 'react-router-dom';
//import './NavMenu.css';
//import { NavLink } from './components/NavLink';
import { NavLink } from 'react-router-dom';
import { Users } from 'tools/Users';
import './Common.css';
import { Container } from 'reactstrap';
import { UserTag } from './components/UserTag';

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
          <Container>

            <div style={{display: "flex", justifyContent: "space-between"}}>

              <div style={{ fontSize: "32px" }}><b>Discord PhotoBot</b></div>
            
              <div>
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                  {
                    Users.getUser() 
                    ?
                    <UserTag user={Users.getUser()} isActive={true} />
                    :
                    <span>&nbsp;</span>
                  }
                </div>
                <div>
                  <span><NavLink to="/" className="navMenuItem" activeClassName="navMenuItemActive" exact>Home</NavLink></span>
                  <span> • </span>
                  <span><NavLink to="/login" className="navMenuItem" activeClassName="navMenuItemActive" exact>Login</NavLink></span>
                  {
                    Users.isAdmin()
                    ?
                    <>
                      <span> • </span>
                      <span><NavLink to="/test" className="navMenuItem" activeClassName="navMenuItemActive" exact>Test</NavLink></span> 
                    </>
                    :
                    null
                  }
                </div>
                
              </div>
            </div>

            <br></br>
            
          </Container>
          <br></br>
        </div>
      </header>
    );
  }
}
