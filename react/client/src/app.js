import React from 'react';
import ReactDOM from 'react-dom';
import Container from './containers/Container'


window.onload = function(){
  ReactDOM.render(
    <Container />,
    document.getElementById('app')
  );
}
