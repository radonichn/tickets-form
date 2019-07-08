const initialState = {
  travelType: "one_way"
};

export default function radio(state = initialState, { type, payload }) {
  switch (type) {
    case "HANDLE_RADIO":
      return {
        travelType: payload
      };
    default:
      return state;
  }
}
