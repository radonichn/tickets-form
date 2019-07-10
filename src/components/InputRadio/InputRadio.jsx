import React, { Component } from "react";
import "./radio.css";
import { connect } from "react-redux";
class InputRadio extends Component {
  handleChecked = () => {
    this.props.dispatch({
      type: "HANDLE_RADIO",
      payload: this.props.travelType
    });
    if (this.props.travelType === "one_way")
      this.props.dispatch({ type: "DATE_BACK_RESET" });
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
