import React from 'react';

class Deal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="deal card">
        <h3>{this.props.deal.name}</h3>
        <p>Price</p>
        <p>Image URL</p>
        <p>Description</p>
        <p>Address</p>
      </div>
    );
  }
}


export default Deal;