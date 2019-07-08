import { createStore, combineReducers } from "redux";

const productsReducer = (state = [], action) => state;
const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "updateUserName":
      const users = [...state];
      users.push(action.payload);
      return users;
    default:
      return state;
  }
};

const allReducers = combineReducers({
  products: productsReducer,
  users: usersReducer
});

const store = createStore(allReducers, {
  products: [{ name: "Xiaomi" }],
  users: [{ user: "Julia" }]
});

const updateUserName = {
  type: "updateUserName",
  payload: {
    user: "Nick"
  }
};

store.dispatch(updateUserName);
console.log(store.getState());
