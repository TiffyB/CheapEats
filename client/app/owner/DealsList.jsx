import React from 'react';
import Deal from './Deal.jsx';
import axios from 'axios';
import Modal from 'react-modal';

class DealsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyModal: false,
      mDealName: '',
    };
  }

  addDeal() {
    // add to list and send save request to server
    this.setState({
      modifyModal: true,
    })
  }

  closeModal() {
    this.setState({
      modifyModal: false,
    });
  }

  modifyDeal(name) {
    this.setState({
      modifyModal: true,
      mDealName: name,
    });
  }

  render() {
    return (
      <div className="col3">
        <h3>DealsList</h3>
        <div className="scroll">
          {this.props.deals.map(deal => 
            <Deal deal={deal} key={deal.name} 
              modifyDeal={this.modifyDeal.bind(this)}/>)}
        </div>
        <button type="button" onClick={this.addDeal.bind(this)}>add Deal</button>

        <Modal
          id="modifyDeal"
          closeTimeoutMS={150}
          contentLabel="modifyDeal"
          isOpen={this.state.modifyModal}>

          <h1>Deal [ {this.state.mDealName} ] Info.</h1>
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


export default DealsList;