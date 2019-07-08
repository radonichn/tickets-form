import React, { Component } from "react";
import { connect } from "react-redux";
import "./checkbox.css";
class InputCheckbox extends Component {
  handleChange = e => {
    this.props.dispatch({ type: "HANDLE_CHECK", payload: e.target.checked });
  };
  render() {
    const { label, isDefaultChecked } = this.props;
    return (
      <div className="form-group">
        <label className="checkbox_container">
          {label}
          <input
            type="checkbox"
            defaultChecked={isDefaultChecked}
            onClick={this.handleChange}
          />
          <span className="checkmark" />
        </label>
      </div>
    );
  }
}
const mapStateToProps = state => ({});
export default connect(mapStateToProps)(InputCheckbox);
