import React from 'react';
import CheapItem from './CheapItem.jsx';
import Modal from 'react-modal';

class CheapItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyModal: false,
      mItemName: '',
    }
  }

  addItem() {
    // add item to list and send save request to server
    this.setState({
      modifyModal: true,
    });
  }

  closeModal() {
    this.setState({
      modifyModal: false,
    });
  }

  modifyItem (name) {
    this.setState({
      mItemName: name,
      modifyModal: true,
    })
  }

  render() {
    return (
      <div className="col3">
        <h3>CheapItemList</h3>
        <div className="scroll">
          {this.props.items.map(item => 
            <CheapItem item={item} key={item.name} 
              modifyItem={this.modifyItem.bind(this)}/>)}
        </div>
        <button type="button" onClick={this.addItem.bind(this)}>add Item</button>

        <Modal
          id="modifyDeal"
          closeTimeoutMS={150}
          contentLabel="modifyItem"
          isOpen={this.state.modifyModal}>

          <h1>Cheap Item [ {this.state.mItemName} ] Info.</h1>
          Name: <input type="text" /> <br />
          Price: <input type="text" /> <br />
          Description: <input type="text" /> <br />
          Image URL: <input type="text" />
          <br />
          <button onClick={this.closeModal.bind(this)}>Update</button>
          <button onClick={this.closeModal.bind(this)}>Cancel</button>
          <button onClick={this.closeModal.bind(this)}>Delete</button>
        </Modal>
      </div>
    );
  }
}


export default CheapItemList;