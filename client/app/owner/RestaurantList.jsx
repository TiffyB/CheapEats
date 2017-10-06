import React from 'react';
import Restaurant from './Restaurant.jsx';

class RestaurantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      RestaurantList: [], // RestaurantList
    }
  }

  addRestaurant() {

  }

  render() {
    return (
      <div className="col3">
        <h3>RestaurantList</h3>
        <div className="scroll">
          <Restaurant />
          <Restaurant />
          <Restaurant />
          <Restaurant />
        </div>
        <button type="button" onClick={this.addRestaurant.bind(this)}>add Restaurant</button>        
      </div>
    );
  }
}


export default RestaurantList;