import React from 'react';

class WinesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wines: []
    };
  }

  componentDidMount() {
    this.WinesList();
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

  WinesList() {
    var url = 'http://localhost:5000/wines'
    var request = new XMLHttpRequest()
    request.open('GET', url)

    request.setRequestHeader('Content-Type', "application/Json")
    // request.withCredentials = false

    request.onload = () => {
      if(request.status === 200){
        console.log("request: ", request.responseText)
        var data = JSON.parse(request.responseText)
        this.setState ( { wines: data })
      }
    }
    request.send(null)
  }

  render() {
    console.log('http://localhost:5000/wines')
    console.log(this.state.wines);
    const eachNew = this.state.wines.map((item, index) => {
      return (
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
          <button onClick={() => {this.deleteItem(item.id)}}> Reviews</button>
            <button onClick={() => {this.deleteItem(item.id)}}>Delete</button>
          </div>
        </div>
        )
    });

    return (
      <div className="container">
      <h1>{this.props.name}</h1>
      { eachNew}
      </div>
      // <p><button onClick={() => {this.addItem(item.id)}}>Add</button></p>
      )
  }
}

export default WinesList;