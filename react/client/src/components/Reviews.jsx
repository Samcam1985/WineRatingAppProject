import React from 'react';
import ReactDOM from 'react-dom';
import Autocomplete from 'react-autocomplete';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOnChangeContent = this.handleOnChangeContent.bind(this)
    this.handleOnChangeRating = this.handleOnChangeRating.bind(this)
    this.state = {
      wine: props.wine,
      content:"",
      rating:""
    };
  }


  handleOnChangeContent(event) {
    this.setState({content: event.target.value});
  }

  handleOnChangeRating(event) {
    this.setState({rating: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const url = 'http://localhost:5000/reviews/';
    const request = new XMLHttpRequest()
    request.open('POST', url)

    request.setRequestHeader('Content-Type', "application/json");


    request.onload = () => {
      if(request.status === 201){
        var data = JSON.parse(request.responseText);
        console.log(data[0]);
      }
    }

    const body = {
        content: this.state.content,
        rating: this.state.rating,
        wine_id: this.state.wine
    };

    request.send(JSON.stringify(body));
  }

  componentDidMount() {
    var url = 'http://localhost:5000/reviews/' + this.state.wine;
    var request = new XMLHttpRequest()
    request.open('GET', url)

    request.setRequestHeader('Content-Type', "application/json");

    request.onload = () => {
      if(request.status === 200){

        var data = JSON.parse(request.responseText);
        if(data != null){
          var reviews = data.map((review, index) => {
            return <div className="review" key={index}>
              <p>{review.content}</p>
              <p>Rating: {review.rating } out of 10</p>
            </div>;
          });
          ReactDOM.render(
            <div>
            {reviews}
            </div>,
            document.getElementById('reviews')
            );
        }
      }
    }
    request.send();
  }


  render() {
    //console.log(this.state.wine);
    var ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    var options = ratings.map((rating, index) => {
      return <option value={rating} key={index}>{rating}</option>;
    });
    return (
      <div>
        <div id="reviews" className="reviews"></div>
        <div className="review-new">
      <form onSubmit={this.handleSubmit}>
            <input type="text" name="content" placeholder="Please enter your review" id="content" onChange={this.handleOnChangeContent}/>
            <br />
            <select id="rating" onChange={this.handleOnChangeRating}>
            <option value=''>Select Rating</option>
              { options }
            </select>
            
            <br />
            <input type="submit" value="Add Review"/>
          </form>
        </div>
      </div>
      )
  }
}

export default Reviews;