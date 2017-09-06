import React from 'react';
import ReactDOM from 'react-dom';
import Autocomplete from 'react-autocomplete';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOnChangeContent = this.handleOnChangeContent.bind(this)
    this.handleOnChangeRating = this.handleOnChangeRating.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
        var reviews = data.map((review, index) => {
          return <div className="review" key={index}>
            <p>{review.content}</p>
            <p>Rating: {review.rating } out of 5</p>
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
              <p>Rating: {review.rating } out of 5</p>
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
    return (
      <div>
        <div id="reviews" className="reviews"></div>
        <div className="review-new">
        <hr/><h2>Add a New Review</h2>
      <form onSubmit={this.handleSubmit}>
            <input type="text" name="content" id="content" placeholder="Please enter Name of wine" onChange={this.handleOnChangeContent}/>
            <br />
            <select type="text" name="rating" id="rating" onChange={this.handleOnChangeRating}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            </select>
            <br />
            <input type="submit" value="Add Review"/>   
          </form>
          <form method="get" action="/">
              <button type="submit">Back</button>
          </form>
        </div>
      </div>
      )
  }
}

export default Reviews;