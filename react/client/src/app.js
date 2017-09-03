import React from 'react';
import ReactDOM from 'react-dom';

import WinesList from './components/WinesList'

window.onload = function(){
  ReactDOM.render(
    <WinesList/>,
    document.getElementById('app')
  );
}
