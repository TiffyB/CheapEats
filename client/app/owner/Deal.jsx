import React from 'react';

class Deal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dealsList: [], // dealsList
    }
  }

  render() {
    return (
      <div className="deal card">
        <h3>Deal Name</h3>
        <h5>Price</h5>
        <h5>Image URL</h5>
        <h5>Description</h5>
        <h5>Address</h5>
      </div>
    );
  }
}


export default Deal;