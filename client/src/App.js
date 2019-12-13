import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/Header/header'
import Allusers from './components/allusers';
import Signin from './components/admin/signin';
import Register from './components/admin/register';
import Logout from './components/admin/logout';


class App extends Component {


    render() {
      let user = this.props.user;
      return (
        <BrowserRouter>
          <div className="App">
            <Header {...this.props}/>
            <Switch>
              <Route path="/" exact {...this.props} component={Allusers}/>
              <Route path="/signin" exact component={Signin}/>
              <Route path="/register" exact component={Register}/>
              <Route path="/logout" exact component={Logout}/>
            </Switch>
          </div>
        </BrowserRouter>
      );
    }
  }
  function mapStateToProps(state){
    return {
        user:state.user
    }
}
  export default connect(mapStateToProps)(App)