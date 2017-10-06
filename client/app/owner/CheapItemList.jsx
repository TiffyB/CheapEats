import React from 'react';
import CheapItem from './CheapItem.jsx';

class CheapItemList extends React.Component {
  constructor(props) {
    super(props);

  }

  addItem() {
    // add item to list and send save request to server
  }

  render() {
    return (
      <div className="col3">
        <h3>CheapItemList</h3>
        <div className="scroll">
          {this.props.items.map(item => 
            <CheapItem item={item} key={item.name} />)}
        </div>
        <button type="button" onClick={this.addItem.bind(this)}>add Item</button>
      </div>
    );
  }
}


export default CheapItemList;