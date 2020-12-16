import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';

function App() {
  return (
      <BrowserRouter>
        <Route path="/login" component={LoginComponent}/>
      </BrowserRouter>
  );
}



export default App;
