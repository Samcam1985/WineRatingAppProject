import React from 'react';
import Autocomplete from 'react-autocomplete';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wine: props.id
    };
  }

  componentDidMount() {
    var url = 'http://localhost:5000/reviews';
    var request = new XMLHttpRequest()
    request.open('GET', url)

    request.setRequestHeader('Content-Type', "application/json");

    request.onload = () => {
      if(request.status === 200){
        console.log("here");
      }
    }
    request.send();
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