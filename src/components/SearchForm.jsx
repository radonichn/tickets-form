import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import InputRadio from "./InputRadio/InputRadio";
import InputCheckbox from "./InputCheckbox/InputCheckbox";
import InputCity from "./InputCity";
import InputCalendar from "./InputCalendar/InputCalendar";
import InputPassengers from "./InputPassengers/InputPassengers";
import reducer from "./reducers/reducer";
const store = createStore(reducer);

class SearchForm extends Component {
  state = {
    flights: {
      Ukraine: ["Kyiv", "Boryspil"],
      Montenegro: ["Golubovci", "Tivat"],
      "United Kingdom": ["Bembridge", "Yateley", "Benson"]
    },
    chooseDate: false,
    isOneWay: "One way",
    showCalendar: true
  };

  handleSubmit = e => {
    e.preventDefault();
    const finalObj = Object.values(store.getState()).reduce(
      (r, c) => Object.assign(r, c),
      {}
    );
    console.log(finalObj);
    // console.log(store.getState());
  };

  render() {
    store.subscribe(() => {
      const chooseDate = store.getState().radio.travelType === "two_way";
      const isOneWay = chooseDate ? "Select date" : "One way";
      this.setState({ chooseDate, isOneWay });
      // console.log(store.getState());
    });
    return (
      <Provider store={store}>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="top_options form-check">
            <InputRadio
              label="Round Trip"
              isDefaultChecked={false}
              name="way"
              travelType="two_way"
            />
            <InputRadio
              label="One Way"
              isDefaultChecked={true}
              name="way"
              travelType="one_way"
            />
            <InputCheckbox
              label="Direct flights only"
              isDefaultChecked={true}
            />
          </div>
          <div className="container d-flex pb-2">
            <InputCity
              flights={this.state.flights}
              direction="FROM_CITY"
              placeHolder="Flight from"
            />
            <InputCity
              flights={this.state.flights}
              direction="TO_CITY"
              placeHolder="Flight to"
            />
            <InputCalendar
              dateType="DATE_TO"
              chooseDate={true}
              placeHolder="Select date"
            />
            <InputCalendar
              dateType="DATE_BACK"
              chooseDate={this.state.chooseDate}
              placeHolder={this.state.isOneWay}
            />
            <InputPassengers />
            <input
              type="submit"
              value="SEARCH"
              className="btn btn-sm btn-primary"
            />
          </div>
        </form>
      </Provider>
    );
  }
}

export default SearchForm;
