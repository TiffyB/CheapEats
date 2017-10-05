import React from 'react';

const DailyDeal = (props) => (
<div>

<div className="jumbotron jumbotron-fluid" id="mainImg">
  <div className="container">
      <h1 className="display-3">Deal Of the Day!</h1>
  	<div id="mainBorder">
      <h2>{props.data[0].restaurantName}</h2>
      <img src="./img/waffle.jpg" id="dealOfDayImg" />
      <p className="lead"> price: ${props.data[0].price}</p>
      <p className="lead">location: {props.data[0].location}</p>
      <p className="lead">expiration: {props.data[0].expirationDate}</p>
    </div>
  </div>
</div>

</div>
)


export default DailyDeal;