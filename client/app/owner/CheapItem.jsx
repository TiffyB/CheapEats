import React from 'react';

class CheapItem extends React.Component {
  constructor(props) {
    super(props);
  }

  update() {
    this.props.modifyItem(this.props.item);
  }

  render() {
    return (
      <div className="cheapitem card" onClick={this.update.bind(this)}>
        <h3>{this.props.item.name}</h3>
        <p>{this.props.item.price}</p>
        <p>{this.props.item.description}</p>
        <p>{this.props.item.imageURL}</p>
      </div>
    );
  }
}


export default CheapItem;