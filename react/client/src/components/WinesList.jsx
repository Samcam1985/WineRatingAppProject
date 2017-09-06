import React from 'react';
import { Link } from 'react-router-dom';

class WinesList extends React.Component {
  constructor(props) {
    super(props);
    this.reload = this.reload.bind(this);
    this.reviewItem = this.reviewItem.bind(this);
    this.handleOnChangeName = this.handleOnChangeName.bind(this);
    this.handleOnChangeColour = this.handleOnChangeColour.bind(this);
    this.handleOnChangeCountry = this.handleOnChangeCountry.bind(this);
    this.handleOnChangeYear = this.handleOnChangeYear.bind(this);
    this.handleAddWine = this.handleAddWine.bind(this);
    this.state = {
      wines: this.props.wines,
      name: "",
      colour: "",
      country: "",
      year: ""
    };
  }

  handleOnChangeName(event) {
    this.setState({name: event.target.value});
  }

  handleOnChangeColour(event) {
    this.setState({colour: event.target.value});
  }

  handleOnChangeCountry(event) {
    this.setState({country: event.target.value});
  }

  handleOnChangeYear(event) {
    this.setState({year: event.target.value});
  }

  reload(filtered){
    this.setState({wines: filtered});
  }

  componentDidMount() {

  }

  reviewItem(id) {
    console.log(id);
    var url = 'http://localhost:5000/wines/' + id;
    var request = new XMLHttpRequest()
    request.open('GET', url)

    request.setRequestHeader('Content-Type', "application/json");

    request.onload = () => {
      if(request.status === 200){
          //call back to the container to load the reviews for this wine.
          this.props.onReviewsClick(request.responseText);
        }
      }
      request.send();
    }

    deleteItem(id) {
      console.log(id)
      var url = 'http://localhost:5000/wines/' + id
      var request = new XMLHttpRequest()
      request.open('DELETE', url)
      request.setRequestHeader('Content-Type', "application/json")

      request.onload = () => {
        if(request.status === 200){
          for(var i = 0; i< this.state.wines.length; i++) {
            let item = this.state.wines[i]
            if(item.id === id){
              this.state.wines.splice(i, 1)
              this.setState({
                wines: this.state.wines
              })
              return
            }
          }

        }
      }
      request.send()

    }

    handleAddWine() {
      var url = 'http://localhost:5000/wines'
      var request = new XMLHttpRequest()
      request.open('POST', url)

      request.setRequestHeader('Content-Type', "application/json")
    // request.withCredentials = false

    request.onload = () => {
      if(request.status === 200){
        console.log("request: ", request.responseText)
        var data = JSON.parse(request.responseText)
        this.setState( { wines: data })
      }
    }
    const body = {
      name: this.state.name,
      colour: this.state.colour,
      country: this.state.country,
      year: this.state.year,
      image: "placeholder.jpg"
    }
    request.send(JSON.stringify(body));
  }

  render() {


    const eachNew = this.state.wines.map((item, index) => 
     (

      <div className="wine" key={index}>
      <div className="image">
      <img width="100px" height="100px" src={"http://localhost:5000/images/"+item.image}/>
      </div>
      <div className="information">
      <p>{item.name}</p>
      <p>{item.colour}</p>
      <p>{item.country}</p>
      <p>{item.year}</p>
      </div>
      <div className="actions">

      <button><Link to={{ pathname: '/reviews/' + item.id }}>Reviews</Link></button>
      <button onClick={() => {this.deleteItem(item.id)}}>Delete</button>
      </div>
      </div>

      )
     );

    return (

      <div className="">
      
      { eachNew }
  
      <div className="wine-add">
      <hr/><h2>Add a New Wine</h2>
      <form onSubmit={this.handleAddWine}>
      <input type="text" placeholder="Please enter Name of wine" onChange={this.handleOnChangeName}/>
      <br />
      <select type="text" id="colour" onChange={this.handleOnChangeColour}>
      <option placeholder="Please select a colour">Please select a Wine Colour</option>
      <option value="red">Red</option>
      <option value="white">White</option>
      <option value="rose">Rose</option>
      </select>
      <br />
      <input type="text" placeholder="Please enter the country of the wine" onChange={this.handleOnChangeCountry}/>
      <br />
      <input type="text" placeholder="Please enter the year of the wine" onChange={this.handleOnChangeYear}/>
      <br /> 
      <button type="submit">Add a new Wine</button>
      </form>
      </div>
      </div>
      // <p><button onClick={() => {this.addItem(item.id)}}>Add</button></p>
      )
  }
}

export default WinesList;