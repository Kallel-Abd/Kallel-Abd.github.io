import React from 'react';
import logo from "./logotnp.jpeg";

export default function Navbar() {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <img src={logo} alt="" style={{width:"90px"}}/>
        <a className="navbar-brand" href="/">Accueil</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/minter">Achat de token</a>
            </li>

            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/projectcreate">Createur de projet</a>
            </li>

            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/projects">projets</a>
            </li>

            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/usetoken">Utiliser mon Token</a>
            </li>
            
          </ul>
        </div>
      </div>
      </nav>
    </div>
  )
}
