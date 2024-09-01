import Users from "../components/UserList";
import CreateUser from "../components/CreateUser/CreateUser";
import React, { useState } from "react";
import "../styles/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const handleSetShowForm = (value) => {
    setShowForm(value);
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      {!showForm && <Users onSetShowForm={handleSetShowForm} />}
      {showForm && <CreateUser onSetShowForm={handleSetShowForm} />}
    </>
  );
}
export default App;
