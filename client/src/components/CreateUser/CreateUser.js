import React, { useReducer } from "react";
import UserForm from "./UserForm";
import UserFormButtons from "./UserFormButtons";
import { Container, Row, Col } from "react-bootstrap";
import userReducer, { initialState } from "./userReducer";
import { handleInputChange, validateForm, createUser } from "./userFormActions";

const CreateUser = ({ onSetShowForm }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { isValid, newErrors } = validateForm(state);
    if (isValid) {
      createUser(state, dispatch, onSetShowForm);
    } else {
      dispatch({ type: "UPDATE_ERRORS", payload: newErrors });
    }
  };

  return (
    <Container className="align-content-center h-100">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2>Create User</h2>
          <UserForm
            onChange={(event) => handleInputChange(dispatch, state, event)}
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
