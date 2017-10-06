import React from 'react';
import CheapItem from './CheapItem.jsx';
import Modal from 'react-modal';
import axios from 'axios';

class CheapItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyModal: false,
      mName: '',
      mPrice: 0,
      mDescription: '',
      mImageURL: '',
    }
  }

  addItem() {
    // add item to list and send save request to server
    this.setState({
      modifyModal: true,
      mName: '',
      mPrice: 0,
      mDescription: '',
      mImageURL: '',
    });
  }

  closeModal() {
    this.setState({
      modifyModal: false,
    });
  }

  modifyItem (item) {
    this.setState({
      mName: item.name,
      mPrice: item.price,
      mDescription: item.description,
      mImageURL: item.imageURL,
      modifyModal: true,
    });
  }

  updateName(event) {
    this.setState({
      mName: event.target.value,
    });
  }

  updatePrice(event) {
    this.setState({
      mPrice: event.target.value,
    });
  }

  updateDescription(event) {
    this.setState({
      mDescription: event.target.value,
    });
  }

  updateImageURL(event) {
    this.setState({
      mImageURL: event.target.value,
    });
  }

  updateItem() {
    this.setState({
      modifyModal:false,
    })
    axios.post('/owner/cheapItems', {
      name:this.state.mName,
      price:this.state.mPrice,
      description:this.state.mDescription,
      imageURL:this.state.mImageURL,
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

          <h1>Cheap Item Info.</h1>
          Name: <input type="text" value={this.state.mName} onChange={this.updateName.bind(this)} /> <br />
          Price: <input type="number" step="0.01" min="0" value={this.state.mPrice} onChange={this.updatePrice.bind(this)} /> <br />
          Description: <input type="text" value={this.state.mDescription} onChange={this.updateDescription.bind(this)} /> <br />
          Image URL: <input type="text" value={this.state.mImageURL} onChange={this.updateImageURL.bind(this)} /> <br />
          <button onClick={this.updateItem.bind(this)}>Update</button>
          <button onClick={this.closeModal.bind(this)}>Cancel</button>
          <button onClick={this.closeModal.bind(this)}>Delete</button>
        </Modal>
      </div>
    );
  }
}


export default CheapItemList;