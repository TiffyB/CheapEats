import React from 'react';

class Restaurant extends React.Component {
  constructor(props) {
    super(props);

  }

  selectRestaurant() {
    this.props.select(this.props.restaurant)
  }

  render() {
    let classname = (this.props.selected === this.props.restaurant.name) ?
      'card selected' : 'card';
    return (
      <div className={classname} 
        onClick={this.selectRestaurant.bind(this)}>
        <h3>{this.props.restaurant.name}</h3>
        <p>{this.props.restaurant.address}</p>
        <p>{this.props.restaurant.type}</p>
        <p>{this.props.restaurant.ZIP}</p>
        <p>{this.props.restaurant.imageURL}</p>
        <p>{this.props.restaurant.restaurantURL}</p>
        <p>{this.props.restaurant.YelpID}</p>
      </div>
    );
  }
}


export default Restaurant;