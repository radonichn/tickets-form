import React, { Component } from "react";
import { connect } from "react-redux";
import SelectClass from "./SelectClass";
import "./inputpassengers.css";
class InputPassengers extends Component {
  state = {
    showSelector: false,
    selected: "economy"
  };
  handleClick = () => {
    this.setState({ showSelector: !this.state.showSelector });
  };
  handleChange = e => {
    this.props.dispatch({
      type: "UPDATE_CLASS",
      payload: e.target.value
    });
    this.setState({ selected: e.target.value });
  };
  componentDidMount = () => {
    window.addEventListener("click", e => {
      if (this.state.showSelector && !this.node.contains(e.target))
        this.setState({ showSelector: false });
    });
  };
  render() {
    return (
      <div
        className="d-flex flex-column align-items-start select_main"
        ref={n => (this.node = n)}
      >
        <span className="fake-select" onClick={this.handleClick}>
          {this.props.common_tickets}, {this.state.selected}
        </span>
        {this.state.showSelector && (
          <div className="select_container">
            <SelectClass label="Adults" action="ADULTS" />
            <SelectClass label="Children" action="CHILDREN" />
            <SelectClass label="Infants" action="INFANTS" />
            <select onChange={this.handleChange} value={this.state.selected}>
              <option value="economy">Economy</option>
              <option value="business">Business</option>
            </select>
          </div>
        )}
      </div>
    );
  }
}

export default connect(state => {
  return {
    common_tickets:
      state.selector.adults + state.selector.children + state.selector.infants
  };
})(InputPassengers);
