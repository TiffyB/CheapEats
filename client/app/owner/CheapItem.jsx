import React from 'react';

class CheapItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="cheapitem card">
        <h3>{this.props.item.name}</h3>
        <p>Price</p>
        <p>Image URL</p>
        <p>Description</p>
        <p>Address</p>
      </div>
    );
  }
}


export default CheapItem;