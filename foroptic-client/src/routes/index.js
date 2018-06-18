import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  // Link,
  Switch,
  Redirect,
} from 'react-router-dom';

import Home from './home';
import Login from './login';
import Page404 from './page404';

import decode from 'jwt-decode';

import 'semantic-ui-css/semantic.min.css';
import '../css/main.css';

const isAuthenticated = ()=>{
  const token = localStorage.getItem('token')
  let isValid = true
  try{
    isValid = decode(token);
  }catch(e){
    return false;
  }
  return isValid;
};

const MyRoute = (props)=>(
  isAuthenticated()
    ?<Route {...props} />
    :<Redirect to="/" />
)

export default ()=>(
  <Router>
    <Switch>
      <Route path="/" exact component={Login}  />
      <MyRoute path="/Home" exact component={Home} />
      <Route component={Page404}  />
    </Switch>
  </Router>
)