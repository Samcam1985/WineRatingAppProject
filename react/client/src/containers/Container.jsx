import React from 'react';
import ReactDOM from 'react-dom';
import Search from '../components/Search';
import WinesList from '../components/WinesList';
import Reviews from '../components/Reviews';
import {BrowserRouter, Switch, Route} from 'react-router-dom';


class Container extends React.Component {
  constructor(props){
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.reviewItem = this.reviewItem.bind(this);
    this.state = { wines: [] };
  };

  handleSearch(filtered){
      this.setState({wines: filtered}, function(){
        this.winesList.reload(filtered);
      });
  }

  reviewItem(wine){
      ReactDOM.render(
          <Reviews wine={wine} />, 
          document.getElementById('reviews')
      );
  }

  componentDidMount() {

    var url = 'http://localhost:5000/wines'
    var request = new XMLHttpRequest()
    request.open('GET', url)

    request.setRequestHeader('Content-Type', "application/Json")

    request.onload = () => {
      if(request.status === 200){
        var data = JSON.parse(request.responseText);
        this.setState({ wines: data});

        ReactDOM.render(
          <Search wines={this.state.wines} handleSearch={this.handleSearch}/>, 
          document.getElementById('search')
          );

        ReactDOM.render(

            <BrowserRouter>
            <Switch>
                <Route exact path='/' render={(props) => (
                  <WinesList ref={winesList => this.winesList = winesList} wines={this.state.wines} onReviewsClick={this.reviewItem} />
                  )} />
                <Route path='/reviews/:id' render={(props) => (
                  <Reviews wine={props.match.params.id} />
                )}/>
              </Switch>
            </BrowserRouter>

          , 
          document.getElementById('winesList')
          );
      }
    }
    request.send(null);
  }

  render() {

    return (
      <div className='container'>
        <div className='search' id='search'>
        </div>
        <div className='winesList' id='winesList'> 
        </div>
        <div className='reviews' id='reviews'>
        </div>
      </div> 
    );
  }
  }

  export default Container;