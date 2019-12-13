import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home/home';
import Layout from './HOC/Layout';
import Allusers from './allusers';
import SignIn from './signin';
import UpdateUser from './admin/update';

const Routes = (props) => {
    
        return(
            <Layout user={props.user}>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/signin" exact component={SignIn}/>
                    <Route path="/Allusers" exact component={Allusers}/>
                    <Route path="/updateUser" exact component={UpdateUser}/>
                </Switch>
            </Layout>
           
        )
}
export default Routes;