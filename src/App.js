import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'; 
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap';
import './resource/css/style.css';

import Header from './Header.js';
import Main from './Main.js';

class App extends Component {
  render() {
    return (
		<div className="App">
			<Header />
			<Main />
		</div>
    );
  }
}

export default App;
