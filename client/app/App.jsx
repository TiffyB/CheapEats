import React from 'react';
import NavBar from './NavBar.jsx';
import DailyDeal from './DailyDeal.jsx';
import MainContent from './mainContent.jsx';

const $ = require("jquery");
const FakeData = require('../../exampleData/exampleData.js')

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	data: FakeData.fakeData,
      queryData: [],
    }
  }

  updateQuery(cuisine, zipCode) {
    $.ajax({
      type: 'GET',
      url: '/items',
      contentType: 'application/json',
      data: JSON.stringify(cuisine, zipCode),
      success: (data) => {
        console.log('data received')
        
      },
      error: (err) => {
        console.log('ERROR', err)
      }
    }).then({})
  }


   render() {
      return (
         <div>
          <NavBar/> 
          <DailyDeal data={this.state.data} />
          <div className="container">
            <MainContent data={this.state.data}/>
          </div>
          <hr />
          <footer>
            <p>&copy; CheapEats 2017</p>
          </footer>
         </div>
      );
   }
}


export default App;