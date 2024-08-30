import React, { useReducer } from "react";
import UserForm from "./UserForm";
import UserFormButtons from "./UserFormButtons";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
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

const CreateUser = ({ onSetShowForm }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const createUser = async () => {
    try {
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

  const handleInputChange = (event) => {
    dispatch({
      type: "UPDATE_NEW_USER",
      payload: { ...state.newUser, [event.target.name]: event.target.value },
    });
    dispatch({
      type: "UPDATE_ERRORS",
      payload: { ...state.errors, [event.target.name]: "" },
    });
  };

  const validateForm = () => {
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

    dispatch({ type: "UPDATE_ERRORS", payload: newErrors });
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      dispatch({ type: "TOGGLE_LOADING", payload: true });
      createUser();
    }
  };

  return (
    <Container className="align-content-center h-100">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2>Create User</h2>
          <UserForm
            onChange={handleInputChange}
            errors={state.errors}
            values={state.newUser}
          />
          <UserFormButtons
            onCancel={() => onSetShowForm(false)}
            loadingStatus={state.isLoading}
            onCreate={handleSubmit}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CreateUser;
