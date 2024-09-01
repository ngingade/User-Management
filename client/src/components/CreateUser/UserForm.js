import React from "react";
import { Form, FormGroup, FormLabel, FormControl } from "react-bootstrap";

const UserForm = ({ onChange, errors, values }) => {
  return (
    <Form>
      <FormGroup className="mt-3" controlId="firstName">
        <FormLabel>Firstname</FormLabel>
        <FormControl
          type="text"
          name="firstName"
          value={values ? values.firstName : ""}
          onChange={onChange}
        />
        {errors.firstName && (
          <div className="text-danger">{errors.firstName}</div>
        )}
      </FormGroup>
      <FormGroup className="mt-3" controlId="lastName">
        <FormLabel>Lastname</FormLabel>
        <FormControl
          type="text"
          name="lastName"
          value={values ? values.lastName : ""}
          onChange={onChange}
        />
        {errors.lastName && (
          <div className="text-danger">{errors.lastName}</div>
        )}
      </FormGroup>
      <FormGroup className="mt-3" controlId="email">
        <FormLabel>Email</FormLabel>
        <FormControl
          type="email"
          name="email"
          value={values ? values.email : ""}
          onChange={onChange}
        />
        {errors.email && <div className="text-danger">{errors.email}</div>}
      </FormGroup>
    </Form>
  );
};

export default UserForm;
