import React from 'react';
import Deal from './Deal.jsx';

class DealsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dealsList: [], // dealsList
    }
  }

  addDeal() {
    // add to list and send save request to server
  }

  render() {
    return (
      <div className="col3">
        <h3>DealsList</h3>
        <div className="scroll">
          <Deal />
          <Deal />
          <Deal />
        </div>
        <button type="button" onClick={this.addDeal.bind(this)}>add Deal</button>
      </div>
    );
  }
}


export default DealsList;