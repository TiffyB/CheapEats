import React from 'react';
import Restaurant from './Restaurant.jsx';
import axios from 'axios';
import Modal from 'react-modal';


class RestaurantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],      
      modifyModal: false, // RestaurantList
    }
  }

  componentDidMount() {
    axios.get('/owner/restaurants', {params: {owner: this.state.owner}})
      .then(res => {
        this.setState({
          restaurants: res.data,
        });
      });
  }

  closeModal () {
    this.setState({
      modifyModal: false
    });
  }

  addRestaurant () {
    this.setState({
      modifyModal: true
    })
  }

  selectRestaurant (name) {
    if(this.props.selected === name) {
      this.setState({
        modifyModal: true
      })
    } else {
      this.props.select(name);
    }
  }

  render() {
    return (
      <div className="col3">
        <h3>RestaurantList</h3>
        <div className="scroll">
          {this.state.restaurants.map(restaurant => 
            <Restaurant 
              key={restaurant.name} 
              restaurant={restaurant} 
              select={this.selectRestaurant.bind(this)}
              selected={this.props.selected} />
          )}
        </div>
        <button type="button" onClick={this.addRestaurant.bind(this)}>add Restaurant</button>        

        <Modal
          id="modifyRestaurant"
          closeTimeoutMS={150}
          contentLabel="modifyRestaurant"
          isOpen={this.state.modifyModal}>

          <h1>Restaurant Info.</h1>
          Name: <input type="text" />
          Type: <input type="text" />
          ZIP: <input type="text" />
          ImageURL: <input type="text" />
          Yelp ID: <input type="text" /> <br />
          <button onClick={this.closeModal.bind(this)}>Update</button>
          <button onClick={this.closeModal.bind(this)}>Cancel</button>
          <button onClick={this.closeModal.bind(this)}>Delete</button>
        </Modal>
      </div>
    );
  }
}


export default RestaurantList;

