import React, { Component } from "react";
import { connect } from "react-redux";
class InputCity extends Component {
  state = {
    text: "",
    airports: [],
    suggestions: []
  };
  allCities = flights => {
    let airports = [].concat(...Object.values(flights));
    this.setState({ airports });
  };
  handleChange = e => {
    let suggestions = [];
    const value = e.target.value;
    if (value.length > 0) {
      const regex = new RegExp(`${value}`, "i");
      suggestions = this.state.airports.filter(x => regex.test(x));
    }
    this.setState({ text: value, suggestions }, () =>
      this.props.dispatch({
        type: this.props.direction,
        payload: value
      })
    );
  };
  selectSuggestion = value => {
    this.setState({
      text: value,
      suggestions: []
    });
    this.props.dispatch({
      type: this.props.direction,
      payload: value
    });
  };
  componentDidMount = () => {
    this.allCities(this.props.flights);
  };
  render() {
    return (
      <div className="form-group elem city mr-2 mb-0">
        <input
          type="text"
          className="form-control rounded-0 border-0"
          value={this.state.text}
          onChange={this.handleChange}
          placeholder={this.props.placeHolder}
        />
        {this.state.suggestions.length > 0 && (
          <ul>
            {this.state.suggestions.map(city => (
              <li key={city} onClick={() => this.selectSuggestion(city)}>
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default connect(state => ({}))(InputCity);
