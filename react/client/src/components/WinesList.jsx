import React from 'react';
import { Link } from 'react-router-dom';

class WinesList extends React.Component {
  constructor(props) {
    super(props);
    this.reload = this.reload.bind(this);
    this.reviewItem = this.reviewItem.bind(this);
    this.state = {
      wines: this.props.wines
    };
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

  addItem() {
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
      name: " ",
      colour: " ",
      country: " ",
      year: " ",
      image: " "
    }
    request.send(JSON.stringify(body))
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

        <Link to={{ pathname: '/reviews/' + item.id }}>Reviews</Link>
        <button onClick={() => {this.deleteItem(item.id)}}>Delete</button>
        </div>
        </div>

        )
    );

    return (

      <div className="">
      
      { eachNew }
      </div>
      // <p><button onClick={() => {this.addItem(item.id)}}>Add</button></p>
      )
  }
}

export default WinesList;