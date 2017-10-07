import React from 'react';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cuisine: "American",
      zip: 94107
    }
  }

  update() {
    this.props.updateQuery(this.state.cuisine, this.state.zip)
    console.log("update in navbar ran")
  }
  
  updateCuisine(event) {
    this.setState({cuisine: event.target.value});
    console.log("CUISINE", this.state.cuisine)
  }

  updateZip(event) {
    this.setState({zip: event.target.value});
    console.log("ZIP", this.state.zip)
  }

  
  render() {
    return (
<div>

  <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">CheapEats</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
  	  </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
      	    <input type="text" name="" placeholder="Cuisine" onChange={this.updateCuisine.bind(this)} />
          </li>
      	  <input type="text" name="" placeholder="ZipCode" onChange={this.updateZip.bind(this)}/>
      	  <button id="submitButton" onClick={() => this.update()} >Submit </button>
        </ul>
        <a href='/login.html'><button className="btn btn-outline-success" type="button">Owner's Login</button></a>
      </div>
    </nav>

</div>

      )
  }

}




export default NavBar;