import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import TodoComponent from './components/TodoComponent';
import UpdatePasswordComponent from './components/UpdatePasswordComponent';

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginComponent}/>
          <Redirect exact from="/" to="/login"/>
          <Route path="/todo" component={TodoComponent}/>
          <Route path="/change_password" component={UpdatePasswordComponent}/>
        </Switch>
      </BrowserRouter>
  );
}



export default App;
