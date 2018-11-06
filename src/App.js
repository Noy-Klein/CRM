import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Clients from './components/clients';
import Actions from './components/actions';
import Analystics from './components/analystics';
import './App.css';
import Landing from './components/landing';
// import Loader from './components/sub_components/update/loader';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className='nav'>
            <Link to='/clients' className='link'>Clients</Link>
            <Link to='/actions' className='link'>Actions</Link>
            <Link to='/analystics' className='link'>Analystics</Link>
          </div>
          <Route exact path='/' component={Landing}></Route>
          <Route exact path='/clients' component={Clients}></Route>
          <Route exact path='/actions' component={Actions}></Route>
          <Route exact path='/analystics' component={Analystics}></Route>
          {/* <Route exact path='/load' component={Loader}></Route> */}
        </div>
      </Router>
    );
  }
}

export default App;
