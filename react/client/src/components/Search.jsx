import React from 'react';
import Autocomplete from 'react-autocomplete';


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      wines: this.props.wines,
      filtered: this.props.wines
    };
  }

  render() {
    return(
      <div className="search-component">
      <Autocomplete
        inputProps={{ placeholder: 'Please type a name, colour or country of wine...' }}
        getItemValue={(item) => item.name}
        items={this.state.filtered}
        renderItem={(item, isHighlighted) =>
          <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            {item.name}
          </div>
        }
        value={this.state.value}
        onChange={(event, value) => {
          this.setState({ value: event.target.value });

           const filtered = this.state.wines.filter((wine) => wine.name.toUpperCase().indexOf(event.target.value.toUpperCase()) >= 0
            || wine.country.toUpperCase().indexOf(event.target.value.toUpperCase()) >= 0
            || wine.colour.toUpperCase().indexOf(event.target.value.toUpperCase()) >= 0);

             this.setState({filtered: filtered});
             this.props.handleSearch(filtered);
          //call server onchange and pass value to server api method
          //the server returns new items that begin with value of input
        }}
        onSelect={(val) => {
          this.state.value = val;
        }}
      />

      </div>
      );
  }
}


export default Search;


