//This file contains the code for the user registration page in the client side for testing purposes in standard way.
//Use a simple HTML file with forms to test the user registeration functionality.
//Use Sign in with email and Sign in with google.

//example dummy codd is added below.

import React, { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");

  const API = process.env.REACT_APP_API_URL;

  const registerUser = async () => {
    try {
      const res = await fetch(`${API}/registerUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          method: "email",
          dob,
          username
        })
      });

      const data = await res.json();
      console.log(data);

      if (data.success) {
        alert("User Registered Successfully");
      } else {
        alert(data.error);
      }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register User</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />

      <input
        type="date"
        onChange={(e) => setDob(e.target.value)}
      />
      <br /><br />

      <button onClick={registerUser}>
        Register
      </button>
    </div>
  );
}

export default App;