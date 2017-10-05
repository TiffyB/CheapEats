import React from 'react';
import NavBar from './NavBar.jsx';
import DailyDeal from './DailyDeal.jsx';
import MainContent from './mainContent.jsx';
const FakeData = require('../../exampleData/exampleData.js')

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	data: FakeData.fakeData,
    }
  }


   render() {
      return (
         <div>
          <NavBar /> 
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