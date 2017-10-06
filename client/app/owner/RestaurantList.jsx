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
      mName: '',
      mAddress: '',
      mZIP: -1,
      mType: '',
      mImageURL: '',
      mRestaurantURL: '',
      mYelpID: '',
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
      modifyModal: true,
      mName: '',
      mAddress: '',
      mZIP: 0,
      mType: '',
      mImageURL: '',
      mRestaurantURL: '',
      mYelpID: '',
    })
  }

  selectRestaurant (restaurant) {
    console.log(restaurant.name);
    if(this.props.selected === restaurant.name) {
      this.setState({
        modifyModal: true
      })
    } else {
      this.props.select(restaurant.name);
      this.setState({
        mName: restaurant.name,
        mAddress: restaurant.address,
        mZIP: restaurant.ZIP,
        mType: restaurant.type,
        mImageURL: restaurant.imageURL,
        mRestaurantURL: restaurant.restaurantURL,
        mYelpID: restaurant.YelpID,
      })
    }
  }

  updateMName(event) {
    this.setState({
      mName: event.target.value,
    });
  }
  updateMAddress(event) {
    this.setState({
      mAddress: event.target.value,
    })
  }
  updateMZIP(event) {
    this.setState({
      mZIP: event.target.value,
    })
  }
  updateMType(event) {
    this.setState({
      mType: event.target.value,
    })
  }
  updateMImageURL(event) {
    this.setState({
      mImageURL: event.target.value,
    })
  }
  updateMRestaurantURL(event) {
    this.setState({
      mRestaurantURL: event.target.value,
    })
  }
  updateMYelpID(event) {
    this.setState({
      mYelpID: event.target.value,
    })
  }

  updateRestaurant() {
    this.setState({
      modifyModal: false
    });
    axios.post('/owner/restaurants', {
      name: this.state.mName,
      address: this.state.mAddress,
      ZIP: this.state.mZIP,
      type: this.state.mType,
      imageURL: this.state.mImageURL,
      restaurantURL: this.state.mRestaurantURL,
      YelpID: this.state.mYelpID,
    });
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
          isOpen={this.state.modifyModal}
          style={{"content":{"top":"100px","left":"100px","right":"100px","bottom":"100px"}}}>

          <h1>Restaurant Info.</h1>
          Name: <input type="text" value={this.state.mName} onChange={this.updateMName.bind(this)} /> <br />
          Address: <input type="text" value={this.state.mAddress} onChange={this.updateMAddress.bind(this)} /> <br />
          ZIP: <input type="text" value={this.state.mZIP} onChange={this.updateMZIP.bind(this)} /> <br />
          Type: <input type="text" value={this.state.mType} onChange={this.updateMType.bind(this)} /> <br />
          ImageURL: <input type="text" value={this.state.mImageURL} onChange={this.updateMImageURL.bind(this)} /> <br />
          RestaurantURL: <input type="text" value={this.state.mRestaurantURL} onChange={this.updateMRestaurantURL.bind(this)} /> <br />
          Yelp ID: <input type="text" value={this.state.mYelpID} onChange={this.updateMYelpID.bind(this)} /> <br />
          <button onClick={this.updateRestaurant.bind(this)}>Update</button>
          <button onClick={this.closeModal.bind(this)}>Cancel</button>
          <button onClick={this.closeModal.bind(this)}>Delete</button>
        </Modal>
      </div>
    );
  }
}


export default RestaurantList;

