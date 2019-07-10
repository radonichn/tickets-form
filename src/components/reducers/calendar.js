const initialState = {
  firstDate: null,
  secondDate: ""
};

export default function calendar(state = initialState, { type, payload }) {
  switch (type) {
    case "DATE_TO":
      return {
        ...state,
        firstDate: payload
      };
    case "DATE_BACK":
      return {
        ...state,
        secondDate: payload
      };
    case "DATE_BACK_RESET":
      return {
        ...state,
        secondDate: null
      };
    default:
      return state;
  }
}
