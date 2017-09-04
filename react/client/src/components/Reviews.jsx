import React from 'react';
import Autocomplete from 'react-autocomplete';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wine: props.id
    };
  }




  render() {
    //console.log(this.state.wine);
    return (
      <div className="reviews">
        <form>
          <textarea name="reviewText" />
          <input type="submit" value="Add Review" />
        </form>
      </div>
      )
  }
}

export default Reviews;