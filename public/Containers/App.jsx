import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import reducers from '../Reducers/RootReducer';
import Landing from '../Components/LandingPage.jsx';
import ApprovalPage from '../Containers/ApprovalPage.jsx';
import Contributing from '../Components/Contributing';
import About from '../Components/About.jsx';
import FAQ from '../Components/FAQ.jsx';
import TokenDetail from '../Components/TokenDetail.jsx';
// import Admin from '../Containers/Admin/Admin';
import NavBar from '../Components/NavBar';

const store = createStore(reducers, applyMiddleware(ReduxThunk, ReduxPromise));

// import { Route, HashRouter, NavLink } from 'react-router-dom';



const App = () => {
 return (
   <HashRouter>
    <Provider store={store}>
      <Switch>
        <Route path="/" component={NavBar}/>
        <Route exact path="/" component={Landing}/>
        <Route path="/approval" component={ApprovalPage}/>
        <Route path="/contributing" component={Contributing}/>
        <Route path="/tokenDetail" component={TokenDetail}/>
        <Route path="/faq" component={FAQ}/>
        <Route path="/about" component={About}/>
        {/* <Route path="/admin" component={Admin}/> */}
      </Switch>
    </Provider>
   </HashRouter>
 ) 
}

export default App;