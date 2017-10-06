import React from 'react';
import RestaurantList from './RestaurantList.jsx';
import DealsList from './DealsList.jsx';
import CheapItemList from './CheapItemList.jsx';

class Owner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: 'Roscoe', // ownerId

    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.owner}</h1>
        <RestaurantList />
        <CheapItemList />
        <DealsList />
      </div>
    );
  }
}


export default Owner;