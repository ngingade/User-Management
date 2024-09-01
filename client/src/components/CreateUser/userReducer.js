export const initialState = {
  newUser: {
    firstName: "",
    lastName: "",
    email: "",
  },
  isLoading: false,
  errors: {
    firstName: "",
    lastName: "",
    email: "",
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_NEW_USER":
      return { ...state, newUser: action.payload };
    case "UPDATE_ERRORS":
      return { ...state, errors: action.payload };
    case "TOGGLE_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default reducer;
