import React from 'react';

class Deal extends React.Component {
  constructor(props) {
    super(props);
  }

  update() {
    this.props.modifyDeal(this.props.deal);
  }

  render() {
    return (
      <div className="deal card" onClick={this.update.bind(this)}>
        <h3>{this.props.deal.name}</h3>
        <p>{this.props.deal.price}</p>
        <p>{this.props.deal.description}</p>
        <p>{this.props.deal.imageURL}</p>
        <p>{this.props.deal.startDate}</p>
        <p>{this.props.deal.startTime}</p>
        <p>{this.props.deal.endDate}</p>
        <p>{this.props.deal.endTime}</p>
      </div>
    );
  }
}


export default Deal;