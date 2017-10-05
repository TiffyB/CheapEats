import React from 'react';

const NavBar = (props) => (
<div>

<nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">CheapEats</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
  	  </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
      	    <input type="text" name="" placeholder="Cuisine" />
          </li>
      	  <input type="text" name="" placeholder="ZipCode" />
      	  <button id="submitButton">Submit </button>
        </ul>
        <button className="btn btn-outline-success" type="button">Owner's Login</button>
      </div>
    </nav>

</div>
)



export default NavBar;