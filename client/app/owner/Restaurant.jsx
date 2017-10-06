import React from 'react';

class Restaurant extends React.Component {
  constructor(props) {
    super(props);

  }

  selectRestaurant() {
    this.props.select(this.props.restaurant.name)
  }

  render() {
    let classname = (this.props.selected === this.props.restaurant.name) ?
      'card selected' : 'card';
    return (
      <div className={classname} 
        onClick={this.selectRestaurant.bind(this)}>
        <h3>{this.props.restaurant.name}</h3>
        <p>Type</p>
        <p>Address</p>
        <p>ZIP</p>
        <p>Image URL</p>
        <p>Yelp ID</p>
      </div>
    );
  }
}


export default Restaurant;