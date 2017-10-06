import React from 'react';

class Deal extends React.Component {
  constructor(props) {
    super(props);
  }

  update() {
    this.props.modifyDeal(this.props.deal.name);
  }

  render() {
    return (
      <div className="deal card" onClick={this.update.bind(this)}>
        <h3>{this.props.deal.name}</h3>
        <p>Price</p>
        <p>Image URL</p>
        <p>Description</p>
      </div>
    );
  }
}


export default Deal;