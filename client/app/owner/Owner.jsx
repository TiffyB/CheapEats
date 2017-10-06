import React from 'react';
import RestaurantList from './RestaurantList.jsx';
import DealsList from './DealsList.jsx';
import CheapItemList from './CheapItemList.jsx';
import axios from 'axios';

class Owner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: 'Roscoe', // ownerId
      selected: null,
      cheapItems: [],
      deals: [],
    }
  }

  // componentDidMount() {
  //   axios.get('/owner/restaurants', {params: {owner: this.state.owner}})
  //     .then(res => {
  //       this.setState({
  //         restaurants: res.data,
  //       });
  //     });
  // }


  selectRestaurant(name) {
    this.setState({
      selected: name,
    });
    Promise.all([
      axios.get('/owner/deals', 
        {params: {restaurant: this.state.selected}}),
      axios.get('/owner/cheapitems', 
        {params: {restaurant: this.state.selected}}),
    ]).then(data => {
      this.setState({
          deals: data[0].data,
          cheapItems: data[1].data,
        });
    });
  }
  
  logout() {
    axios.get('/owner/logout')
      .then(res => {
        window.location='/login';
      });
  }

  render() {
    return (
      <div>
        <h1>{this.state.owner}</h1>
        <button type="button" onClick={this.logout.bind(this)}>Logout</button> <br/>
        <RestaurantList 
          restaurants={this.state.restaurants} 
          select={this.selectRestaurant.bind(this)}
          selected={this.state.selected} />
        <CheapItemList 
          items={this.state.cheapItems}/>
        <DealsList 
          deals={this.state.deals}/>

      </div>
    );
  }
}


export default Owner;