import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Container from './containers/Container';
import Reviews from './components/Reviews';

window.onload = function(){
   /*ReactDOM.render(
     <Container />,
     document.getElementById('app')
   );*/

  ReactDOM.render((
    <BrowserRouter>
      <Route exact path='/' component={Container}/>

    </BrowserRouter>
  ), document.getElementById('app'));
}
