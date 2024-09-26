import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Pagelayout } from 'components/PageLayout';
import { Http } from 'tools/Http';
import { AlbumTag } from '../components/AlbumTag';
import { Vert } from 'components/Vert';
import { User } from 'tools/User';
import './pages.css';

export class DirectoryPage extends Component {
  static displayName = DirectoryPage.name;

  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  async componentDidMount() {

    if (!User.getUser()) { return; }

    const albums = await Http.getAlbumList();

    // sort newest to oldest
    albums.sort((a, b) => {
      if (a.year === b.year) {
        return b.month - a.month;
      }
      return b.year - a.year;
    });

    const years = Array.from(new Set(albums.map(a => a.year))).filter(y => y !== 0);
    
    
    this.setState({ loaded: true, albums: albums, years: years });
  }

  render () {
    return <Pagelayout>
<div style={{display: "flex", justifyContent: "space-between", marginLeft: "150px", marginRight: "150px"}}>
    <div class="dropdown">
      <button onclick="myFunction()" class="dropbtn">Dropdown</button>
      <div id="myDropdown" class="dropdown-content">
       <a href="#">Link 1</a>
       <a href="#">Link 2</a>
       <a href="#">Link 3</a>
       </div>
   </div>
   <div class="dropdown">
   <button onclick="myFunction()" class="dropbtn">Dropdown</button>
   <div id="myDropdown" class="dropdown-content">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
    </div>
</div>
<div class="dropdown">
<button onclick="myFunction()" class="dropbtn">Dropdown</button>
<div id="myDropdown" class="dropdown-content">
 <a href="#">Link 1</a>
 <a href="#">Link 2</a>
 <a href="#">Link 3</a>
 </div>
</div>
</div>
      {
        User.getUser()
        ?
        this.state.loaded && (<>
            <h3>Albums</h3>
            <Vert height='1'></Vert>
            
            { this.state.years.map(y =>
              <>
                <p><b>{y}</b></p>
                { this.state.albums.filter(a => a.year === y).map(a => 
                  <div key={a.id}><Link to={"/album/" + a.imgurId} style={{fontSize: "20px"}} ><AlbumTag name={a.name}/></Link></div>
                )}
                <Vert />
              </>
            )}          
            
            <Vert height='1'></Vert>            
          </>)
          :
          <p>You must be logged in to browse albums.</p>
      }
    </Pagelayout>
  }
}
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}