import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import LoginComponent from './components/LoginComponent';

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginComponent}/>
          <Redirect to="/login"/>
        </Switch>
      </BrowserRouter>
  );
}



export default App;
