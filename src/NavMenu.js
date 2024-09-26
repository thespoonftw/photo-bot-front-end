import React, { Component } from 'react';
//import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
//import { Link } from 'react-router-dom';
//import './NavMenu.css';
//import { NavLink } from './components/NavLink';
import { NavLink } from 'react-router-dom';
import { User } from 'tools/User';
import './Common.css';
import { Container } from 'reactstrap';
import { UserTag } from './components/UserTag';
import './fonts.css';

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
        <div style={{ backgroundColor: "#F8A582" }}>
          <br></br>
          <Container>

            <div style={{display: "flex", justifyContent: "space-between"}}>

            <div style={{ display: "flex", lineHeight: "1" , letterSpacing: "5px" }}>
              <div><img src={'./bplogo.png'} style={{ width: "20%" }} alt=""/></div>
                <div style={{ marginLeft: "-360px" }}>
                  <div style={{ fontSize: "85px", fontFamily: "kollektifregular" }}><b>brunch</b></div>
                  <div style={{ fontSize: "16px", fontFamily: "kollektifregular", textAlign: "center" }}><b>projects</b></div>
                </div>
            </div>
            <div style={{marginLeft: "-500px", lineHeight: "2.5"}}>
              <div style={{fontFamily: "league-spartan", fontSize: "25px", display: "flex", justifyContent: "space-between", marginLeft: "-500px",}}> 
                <div><NavLink to="" className="" activeClassName="" exact>PHOTOBOT</NavLink></div>
                <div><NavLink to="" className="" activeClassName="" exact>SPEND</NavLink></div>
                <div><NavLink to="" className="" activeClassName="" exact>CALENDAR</NavLink></div>
              </div>
              <div>
                <div style={{ fontFamily: "league-spartan",  display: "flex", justifyContent: "space-between", marginLeft: "-500px",}}>                  
                  <span><NavLink to="/" className="navMenuItem" activeClassName="navMenuItemActive" exact>login</NavLink></span>
                  {
                    User.getUser()
                    ?
                    <>
                      <div><NavLink to="/albums" className="navMenuItem" activeClassName="navMenuItemActive" exact>albums</NavLink></div>
                      <div><NavLink to="/uploads" className="navMenuItem" activeClassName="navMenuItemActive" exact>uploads</NavLink></div>                      
                    </>
                    :
                    null
                  }
                  {
                    User.isAdmin()
                    ?
                    <>
                      <div><NavLink to="/test" className="navMenuItem" activeClassName="navMenuItemActive" exact>test</NavLink></div> 
                      <div><NavLink to="/trash" className="navMenuItem" activeClassName="navMenuItemActive" exact>trash</NavLink></div>
                    </>
                    :
                    null
                  }
                </div>
              </div>
                <div>
                      <div style={{display: "flex", justifyContent: "flex-end" }}>
                      {
                        User.getUser() 
                        ?
                        <UserTag user={User.getUser()} isActive={true} />
                        :
                        <span>&nbsp;</span>
                      }
                    </div>
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
