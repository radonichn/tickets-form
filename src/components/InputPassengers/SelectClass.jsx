import React, { Component } from "react";
import { connect } from "react-redux";
class SelectClass extends Component {
  handleIncrement = () => {
    this.props.dispatch({
      type: `UPDATE_${this.props.action}`,
      payload: this.props.passenger[this.props.action.toLowerCase()] + 1
    });
  };
  handleSubtract = () => {
    this.props.dispatch({
      type: `UPDATE_${this.props.action}`,
      payload: this.props.passenger[this.props.action.toLowerCase()] - 1
    });
  };
  render() {
    const { label } = this.props;
    return (
      <div className="d-flex align-items-center mb-1">
        <span className="label">{label}</span>
        <span
          onClick={this.handleSubtract}
          className="class_selector disabled"
          href=""
        >
          -
        </span>
        {this.props.passenger[this.props.action.toLowerCase()]}
        <span onClick={this.handleIncrement} className="class_selector">
          +
        </span>
      </div>
    );
  }
}

export default connect(state => {
  return {
    passenger: state.selector
  };
})(SelectClass);
