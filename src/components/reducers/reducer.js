import { combineReducers } from "redux";
import radio from "./radio";
import checkbox from "./checkbox";
import city from "./city";
import calendar from "./calendar";
import selector from "./selector";

export default combineReducers({
  radio,
  checkbox,
  city,
  calendar,
  selector
});
