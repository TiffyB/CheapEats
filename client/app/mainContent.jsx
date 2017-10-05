import React from 'react';
import SideContent from './sideContent.jsx';
import ListItems from './ListItems.jsx';

const MainContent = (props) => (
<div>
      <div className="row row-offcanvas row-offcanvas-right">

        <div className="col-12 col-md-9">
          <p className="float-right d-md-none">
            <button type="button" className="btn btn-primary btn-sm" data-toggle="offcanvas">Toggle nav</button>
          </p>
          <div className="jumbotron" id="secondImg">
            <h3 className="secondHeader">Other Amazing Deals</h3>
          </div>
          <ListItems data={props.data}/>
        </div>
        <SideContent data={props.data}/>
      </div>
</div>
)


export default MainContent;