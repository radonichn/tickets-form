const initialState = {
  directFlight: true
};

export default function checkbox(state = initialState, { type, payload }) {
  switch (type) {
    case "HANDLE_CHECK":
      return {
        directFlight: payload
      };
    default:
      return state;
  }
}
