import React from 'react';
import Autocomplete from 'react-autocomplete';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wine: this.props.wine
    };
  }

  render() {
    console.log(this.state.wine);
    return (
      <div className="reviews">
      blsh blah
      </div>
      )
  }
}

export default Reviews;