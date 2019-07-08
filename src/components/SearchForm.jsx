import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import InputRadio from "./InputRadio/InputRadio";
import InputCheckbox from "./InputCheckbox/InputCheckbox";
import InputCity from "./InputCity";

import reducer from "./reducers/reducer";
const store = createStore(reducer);
store.subscribe(() => {
  console.log(store.getState());
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
              travelType="two way"
            />
            <InputRadio
              label="One Way"
              isDefaultChecked={true}
              handleChecked={this.handleRadio}
              handleParam={false}
              name="way"
              travelType="one way"
            />
            <InputCheckbox
              label="Direct flights only"
              isDefaultChecked={true}
              handleChange={this.handleCheckbox}
              stateStorage={store}
            />
          </div>
          <div className="container d-flex">
            <InputCity flights={this.state.flights} direction="FROM_CITY" />
            <InputCity flights={this.state.flights} direction="TO_CITY" />
          </div>
          <input
            type="submit"
            value="SEARCH"
            className="btn btn-sm btn-primary"
          />
        </form>
      </Provider>
    );
  }
}

export default SearchForm;
