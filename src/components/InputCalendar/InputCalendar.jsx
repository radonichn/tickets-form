import React, { Component } from "react";
import "./calendar.css";
import { connect } from "react-redux";
class InputCalendar extends Component {
  state = {
    current: new Date(),
    immutable: new Date(),
    showCalendar: false,
    selectedDate: null,
    selectedTimeStamp: null,
    calendarText: this.props.placeHolder
  };
  weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  componentDidMount = () => {
    document.addEventListener("click", e => {
      if (this.state.showCalendar && !this.node.contains(e.target)) {
        this.setState({ showCalendar: false });
      }
    });
  };
  year = () => this.state.current.getFullYear(); //get the year [2019]
  getMonth = () => this.state.current.getMonth(); // get the number of month [5] - June
  month = () => this.months[this.getMonth()]; // get the name of month - June
  daysInMonth = () =>
    new Date(this.year(), this.state.current.getMonth() + 1, 0).getDate(); // get total days in month
  isBeforeToday = day => {
    let date = new Date();
    return (
      day <
      new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
    );
  };

  handleClick = date => {
    const resultDate = `${new Date(date).getDate()}.${new Date(
      date
    ).getMonth() + 1}.${new Date(date).getFullYear()}`;
    this.props.dispatch({
      type: this.props.dateType,
      payload: date
    });
    this.setState({
      showCalendar: !this.state.showCalendar,
      selectedDate: resultDate,
      selectedTimeStamp: date
    });
  };

  triggerDate = () => {
    this.setState({ showCalendar: !this.state.showCalendar });
  };

  firstDay = () =>
    new Date(this.year(), this.state.current.getMonth(), 0).getDay();

  nextMonth = () => {
    let d = new Date(this.state.current.getTime());
    let current = new Date(d.setMonth(d.getMonth() + 1));
    this.setState({ current });
  };
  currentMonth = () => {
    let current = new Date(this.state.immutable.getTime());
    this.setState({ current });
  };
  prevMonth = () => {
    let d = new Date(this.state.current.getTime());
    let current = new Date(d.setMonth(d.getMonth() - 1));
    this.setState({ showPrev: true });
    if (!this.isBeforeToday(current.getTime())) {
      this.setState({ current });
    }
  };
  render() {
    let weekdays = this.weekdays.map(day => {
      return (
        <th key={day} className="week-day">
          {day}
        </th>
      );
    });
    let blanks = [];
    for (let i = 0; i < this.firstDay(); i++) {
      blanks.push(
        <td className="blank" key={i}>
          {""}
        </td>
      );
    }
    let daysInMonth = [];
    for (let i = 1; i <= this.daysInMonth(); i++) {
      const id = new Date(this.year(), this.getMonth(), i).getTime();
      let classes = "day";
      if (
        id < this.props.lessThanDate ||
        this.isBeforeToday(id) ||
        (this.props.moreThanDate && id > this.props.moreThanDate)
      )
        classes += " disabled";
      if (id === this.state.selectedTimeStamp) classes += " selected";
      daysInMonth.push(
        <td
          key={id}
          className={classes}
          onClick={() => {
            classes.indexOf("disabled") === -1 && this.handleClick(id);
          }}
        >
          {i}
        </td>
      );
    }
    let totalDays = [...blanks, ...daysInMonth];
    let rows = [],
      cells = [];
    totalDays.forEach((row, i) => {
      if (i % 7 !== 0) cells.push(row);
      else {
        let insRow = cells.slice();
        rows.push(insRow);
        cells = [];
        cells.push(row);
      }
      if (i === totalDays.length - 1) {
        let insRows = cells.slice();
        rows.push(insRows);
      }
    });
    let trElems = rows.map((d, i) => {
      return <tr key={i * 25}>{d}</tr>;
    });
    return (
      <div className="calendar" ref={n => (this.node = n)}>
        <span
          className={
            this.props.chooseDate ? "fake-select" : "fake-select disabled"
          }
          onClick={this.triggerDate}
        >
          {this.state.selectedDate
            ? this.state.selectedDate
            : this.props.placeHolder}
        </span>
        {this.state.showCalendar && (
          <table className="table table-borderless">
            <thead className="thead-dark">
              <tr>
                <th colSpan="3">{this.month()}</th>
                <th colSpan="1">{this.year()}</th>
                <th className="table-nav" onClick={this.prevMonth}>
                  <span className="arrows">🢐</span>
                </th>
                <th className="table-nav" onClick={this.currentMonth}>
                  today
                </th>
                <th className="table-nav" onClick={this.nextMonth}>
                  <span className="arrows">🢒</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="thead-light">{weekdays}</tr>
              {trElems}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default connect(state => {
  return {
    moreThanDate: state.calendar.secondDate,
    lessThanDate: state.calendar.firstDate
  };
})(InputCalendar);
