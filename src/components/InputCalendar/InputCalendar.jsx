import React, { Component } from "react";
import "./calendar.css";
class InputCalendar extends Component {
  state = {
    current: new Date(),
    immutable: new Date(),
    selectedDay: null
  };
  //arrays of the weekdays and months (could be translated in any languages)
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
  year = () => this.state.current.getFullYear(); //get the year [2019]
  getMonth = () => this.state.current.getMonth(); // get the number of month [5] - June
  month = () => this.months[this.getMonth()]; // get the name of month - June
  daysInMonth = () =>
    new Date(this.year(), this.state.current.getMonth() + 1, 0).getDate(); // get total days in month
  isCurrentDay = day => {
    //check if the day in loop is current; if true - highlight
    let date = new Date();
    return (
      new Date(this.year(), this.getMonth(), day).getTime() ===
      new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
    );
  };
  firstDay = () =>
    new Date(this.year(), this.state.current.getMonth(), 0).getDay(); //number of first day in month

  nextMonth = () => {
    //add one month to current
    let d = new Date(this.state.current.getTime());
    let current = new Date(d.setMonth(d.getMonth() + 1));
    this.setState({ current });
  };
  currentMonth = () => {
    //return to current month
    let current = new Date(this.state.immutable.getTime());
    this.setState({ current });
  };
  prevMonth = () => {
    //subtract one month from current
    let d = new Date(this.state.current.getTime());
    let current = new Date(d.setMonth(d.getMonth() - 1));
    this.setState({ current });
  };
  handleClick = () => {
      console.log('handleClick works!');
  }
  getIndex = id => {
    //find the index of day object by id (searching in the total array of notes)
    return this.state.notes.findIndex(x => x.id === id);
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
      daysInMonth.push(<td key={id} className="day" onClick={this.handleClick}>{i}</td>);
    }
    let totalDays = [...blanks, ...daysInMonth]; //combine blank and normal days
    let rows = [],
      cells = [];
    totalDays.forEach((row, i) => {
      // separate all the days into rows and push them to final array
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
    //map the rows (weeks)
    let trElems = rows.map((d, i) => {
      return <tr key={i * 25}>{d}</tr>;
    });
    return (
      <div className="container col-sm-12 col-md-4 mt-3">
        <table className="table table-bordered">
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
      </div>
    );
  }
}

export default InputCalendar;