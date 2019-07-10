const initialState = {
  adults: 1,
  children: 0,
  infants: 0,
  category: "economy"
};

export default function selector(state = initialState, { type, payload }) {
  switch (type) {
    case "UPDATE_ADULTS":
      return {
        ...state,
        adults: payload
      };
    case "UPDATE_CHILDREN":
      return {
        ...state,
        children: payload
      };
    case "UPDATE_INFANTS":
      return {
        ...state,
        infants: payload
      };
    case "UPDATE_CLASS":
      return {
        ...state,
        category: payload
      };
    default:
      return state;
  }
}
