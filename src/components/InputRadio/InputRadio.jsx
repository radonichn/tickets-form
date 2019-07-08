import React, { Component } from "react";
import "./radio.css";
import { connect } from "react-redux";
class InputRadio extends Component {
  state = {};
  handleChecked = () => {
    this.props.dispatch({
      type: "HANDLE_RADIO",
      payload: this.props.travelType
    });
  };
  render() {
    const { label, isDefaultChecked, name } = this.props;
    return (
      <div className="form-group">
        <label className="radio_container">
          {label}
          <input
            type="radio"
            name={name}
            defaultChecked={isDefaultChecked}
            onClick={this.handleChecked}
          />
          <span className="radio" />
        </label>
      </div>
    );
  }
}
export default connect(state => ({}))(InputRadio);
