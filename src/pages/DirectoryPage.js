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
    const featured = albums.filter(a => a.numberOfPhotos >= 10);
    const mini = albums.filter(a => a.numberOfPhotos < 10);

    const f_years = Array.from(new Set(featured.map(a => a.year))).filter(y => y !== 0);
    const m_years = Array.from(new Set(mini.map(a => a.year))).filter(y => y !== 0);
    
    this.setState({ loaded: true, featured: featured, mini: mini, f_years: f_years, m_years: m_years });
  }

  render () {
    return <Pagelayout>
      {
        User.getUser()
        ?
        this.state.loaded && (<>
            <h3>Albums</h3>
            <Vert height='1'></Vert>
            
            { this.state.f_years.map(y =>
              <>
                <p><b>{y}</b></p>
                { this.state.featured.filter(a => a.year === y).map(a => 
                  <div key={a.id}><Link to={"/album/" + a.id} style={{fontSize: "20px"}} ><AlbumTag name={a.name}/></Link></div>
                )}
                <Vert />
              </>
            )}          
            
            <Vert height='5'></Vert>
            <h3>Mini Albums</h3>
            <Vert height='1'></Vert>

            { this.state.m_years.map(y =>
              <>
                <p><b>{y}</b></p>
                { this.state.mini.filter(a => a.year === y).map(a => 
                  <div key={a.id}><Link to={"/album/" + a.id} style={{fontSize: "20px"}} ><AlbumTag name={a.name}/></Link></div>
                )}
                <Vert />
              </>
            )}
          </>)
          :
          <p>You must be logged in to browse albums.</p>
      }
    </Pagelayout>
  }
}
