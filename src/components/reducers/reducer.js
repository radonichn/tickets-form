import { combineReducers } from "redux";
import radio from "./radio";
import checkbox from "./checkbox";
import city from "./city";

export default combineReducers({
  radio,
  checkbox,
  city
});
