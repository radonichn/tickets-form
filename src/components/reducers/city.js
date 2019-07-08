const InitialState = {
  fromCity: "",
  toCity: ""
};

export default function city(state = InitialState, { type, payload }) {
  switch (type) {
    case "FROM_CITY":
      return {
        fromCity: payload,
        toCity: state.toCity
      };
    case "TO_CITY":
      return {
        fromCity: state.fromCity,
        toCity: payload
      };
    default:
      return state;
  }
}
