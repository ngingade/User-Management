import { toast } from "react-toastify";

const handleInputChange = (dispatch, state, event) => {
  dispatch({
    type: "UPDATE_NEW_USER",
    payload: { ...state.newUser, [event.target.name]: event.target.value },
  });
  dispatch({
    type: "UPDATE_ERRORS",
    payload: { ...state.errors, [event.target.name]: "" },
  });
};

const validateForm = (state) => {
  let isValid = true;
  const newErrors = { ...state.errors };

  if (state.newUser.firstName.trim() === "") {
    newErrors.firstName = "Firstname is required field";
    isValid = false;
  }

  if (state.newUser.firstName.length > 100) {
    newErrors.firstName = "Maximum length is 100 characters";
    isValid = false;
  }

  if (state.newUser.lastName.trim() === "") {
    newErrors.lastName = "Lastname is required field";
    isValid = false;
  }

  if (state.newUser.lastName.length > 100) {
    newErrors.lastName = "Maximum length is 100 characters";
    isValid = false;
  }

  if (state.newUser.email.trim() === "") {
    newErrors.email = "Email is required field";
    isValid = false;
  }

  if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      state.newUser.email
    )
  ) {
    newErrors.email = "Invalid email address";
    isValid = false;
  }

  return { isValid, newErrors };
};

const createUser = async (state, dispatch, onSetShowForm) => {
  try {
    dispatch({ type: "TOGGLE_LOADING", payload: true });
    const response = await fetch("http://localhost:3002/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state.newUser),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    const data = await response.json();
    toast.success(`User "${data.firstName}" created successfully`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    dispatch({ type: "TOGGLE_LOADING", payload: false });
    onSetShowForm(false);
  } catch (error) {
    dispatch({ type: "TOGGLE_LOADING", payload: false });
    console.log(JSON.stringify(error));

    toast.error(`Error in creating user: ${error.errors[0].msg}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export { handleInputChange, validateForm, createUser };
