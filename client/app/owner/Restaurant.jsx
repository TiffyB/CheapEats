import React from 'react';

class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dealsList: [], // dealsList
    }
  }

  render() {
    return (
      <div className="restaurant card">
        <h3>Restaurant Name</h3>
        <h5>Type</h5>
        <h5>Address</h5>
        <h5>ZIP</h5>
        <h5>Image URL</h5>
        <h5>Yelp ID</h5>
      </div>
    );
  }
}


export default Restaurant;