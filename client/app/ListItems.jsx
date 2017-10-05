import React from 'react';
import Item from './Item.jsx'


const ListItems = (props) => (
<div className="row">
{props.data.map( (item, i) => 
  <Item data={item} key={i}/>
)}

</div>
	)


export default ListItems;