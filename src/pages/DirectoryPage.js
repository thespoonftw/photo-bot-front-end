import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Pagelayout } from 'components/PageLayout';
import { Http } from 'tools/Http';
import { AlbumTag } from '../components/AlbumTag';
import { Vert } from 'components/Vert';
import { User } from 'tools/User';

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
                  <div key={a.id}><Link to={"/album/" + a.id} style={{fontSize: "20px"}} ><AlbumTag name={a.name}/></Link></div>
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
