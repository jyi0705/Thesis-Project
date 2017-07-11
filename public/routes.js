import React from 'react';
import { Route, HashRouter, NavLink } from 'react-router-dom';

import Landing from './src/LandingPage.jsx';
import ApprovalPage from './src/ApprovalPage.jsx';
import Contributing from './src/Contributing.jsx';
import About from './src/About.jsx';
import FAQ from './src/FAQ.jsx';
import TokenDetail from './src/TokenDetail.jsx';
import Admin from './src/Admin/Admin.jsx';


const Routes = () => {
 return (
   <HashRouter>
    <div className="container">

      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Ethereum Token</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li className="active"><NavLink exact to="/about" exact activeClassName="activeNav">About</NavLink></li>
              <li><NavLink to="/contributing" activeClassName="activeNav">Contributing</NavLink></li>
              <li><NavLink to="/tokenDetail" activeClassName="activeNav">Token Details</NavLink></li>
              <li><NavLink to="/approval" activeClassName="activeNav">Get Approved</NavLink></li>
              <li><NavLink to="/faq" activeClassName="activeNav">FAQ</NavLink></li>
              <li className="nav-item">
                <a href="https://twitter.com/" target="_blank" className="nav-link">
                    <i className="fa fa-twitter" aria-hidden="true"></i> Link to our twitter(twitter icon)
                </a>
              </li>
              <li className="nav-item">
                <a href="https://github.com/" target="_blank" className="nav-link"> Link to our github(github icon)
                    <i className="fa fa-github" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        <Route exact path="/" component={Landing}/>
        <Route path="/approval" component={ApprovalPage}/>
        <Route path="/contributing" component={Contributing}/>
        <Route path="/tokenDetail" component={TokenDetail}/>
        <Route path="/faq" component={FAQ}/>
        <Route path="/about" component={About}/>
        <Route path="/admin" component={Admin}/>
    </div> 
   </HashRouter>
 ) 
}

export default Routes;