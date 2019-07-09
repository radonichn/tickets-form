import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import InputRadio from "./InputRadio/InputRadio";
import InputCheckbox from "./InputCheckbox/InputCheckbox";
import InputCity from "./InputCity";
import InputCalendar from './InputCalendar/InputCalendar';
import reducer from "./reducers/reducer";
const store = createStore(reducer);
store.subscribe(() => {
  // console.log(store.getState());
});

class SearchForm extends Component {
  state = {
    flights: {
      Ukraine: ["Kyiv", "Boryspil"],
      Montenegro: ["Golubovci", "Tivat"],
      "United Kingdom": ["Bembridge", "Yateley", "Benson"]
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const finalObj = Object.values(store.getState()).reduce(((r,c) => Object.assign(r,c)), {});
    console.log('---------\n', finalObj,'\n------------');
  };

  render() {
    return (
      <Provider store={store}>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="top_options form-check">
            <InputRadio
              label="Round Trip"
              isDefaultChecked={false}
              handleChecked={this.handleRadio}
              handleParam={true}
              name="way"
              travelType="two_way"
            />
            <InputRadio
              label="One Way"
              isDefaultChecked={true}
              handleChecked={this.handleRadio}
              handleParam={false}
              name="way"
              travelType="one_way"
            />
            <InputCheckbox
              label="Direct flights only"
              isDefaultChecked={true}
              handleChange={this.handleCheckbox}
              stateStorage={store}
            />
          </div>
          <div className="container d-flex pb-2">
            <InputCity flights={this.state.flights} direction="FROM_CITY" placeHolder="Flight from"/>
            <InputCity flights={this.state.flights} direction="TO_CITY" placeHolder="Flight to" />
            <InputCalendar/>

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
