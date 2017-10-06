import React from 'react';
import CheapItem from './CheapItem.jsx';

class CheapItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cheapItemList: [], // cheapItemsList
    }
  }

  addItem() {
    // add item to list and send save request to server
  }

  render() {
    return (
      <div className="col3">
        <h3>CheapItemList</h3>
        <div className="scroll">
          <CheapItem />
          <CheapItem />
          <CheapItem />
        </div>
        <button type="button" onClick={this.addItem.bind(this)}>add Item</button>
      </div>
    );
  }
}


export default CheapItemList;