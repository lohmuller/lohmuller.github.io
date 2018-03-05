import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'; 
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap';
import './resource/css/style.css';

class Header extends Component {
  
  render() {
    return (
		<header className="bg-light">
			<div className="container">
				<nav className="navbar navbar-expand-lg /*navbar-light navbar-dark*/ justify-content-between">
					<a className="navbar-brand" href="#home">Ian K3 K3 K3</a>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="nav-pills navbar-nav  ml-md-auto d-md-flex">
						  <li className="nav-item">
							<a className="nav-link active" href="#home">Inicio <span className="sr-only">(current)</span></a>
						  </li>
						  <li className="nav-item">
							<a className="nav-link" href="#about">Sobre</a>
						  </li>
						  <li className="nav-item">
							<a className="nav-link" href="#projects">Projetos</a>
						  </li>
						  <li className="nav-item">
							<a className="nav-link" href="#contact">Contato</a>
						  </li>
						  <li className="nav-item">
							<a className="nav-link" href="#language">Idiomas</a>
						  </li>
						</ul>
					</div>
				</nav>
			</div>
		</header>
    );
  }
}

export default Header;