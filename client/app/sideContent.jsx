import React from 'react';

const sideContent = (props) => (

  <div className="col-6 col-md-3 sidebar-offcanvas" id="sidebar">
    <div className="list-group">
  	  <h3>Yesterday's Deal</h3>
      <img src="./img/waffle.jpg" id="dealOfDayImg" />
      <h4>{props.data[5].restaurantName}</h4>
      <p>price: ${props.data[5].price}</p>
      <p>Location: {props.data[5].location}</p>
      <p><span>Expired</span></p>
    </div>
  </div>

)


export default sideContent;
