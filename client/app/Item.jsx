import React from 'react';

const Item = (props) => (
     
    <div className="col-6 col-lg-4" >
      <h3>{props.data.restaurantName}</h3>
      <img src="./img/waffle.jpg" id="dealOfDayImg" />
      <p className="lead"> price: ${props.data.price}</p>
      <p className="lead">location: {props.data.location}</p>
      <p className="lead">expiration: {props.data.expirationDate}</p>
      <hr />
    </div>

)


export default Item