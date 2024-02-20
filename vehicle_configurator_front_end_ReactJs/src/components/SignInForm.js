import React, { useState, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

function SignInForm() {
  const [state, setState] = useState({});
  const [signedIn, setSignedIn] = useState(false);
  const { setIsLogged } = useContext(AuthContext);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    ////////
    fetch("http://localhost:8080/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    })
      .then((response) => {
        console.log(response);
        return response.json();
        // }
      })
      .then((loginSuccess) => {
        console.log("Login success==>:", loginSuccess);

        loginSuccess && setIsLogged(true);
        // Handle login success or failure here
      })
      .catch((error) => {
        console.error("Login failed:", error);
        // Handle login failure
      });
    ////////

    const { username, password } = state;
    alert(`You are login with email: ${username} and password: ${password}`);
    //setIsLogged(true);
    for (const key in state) {
      setState({
        ...state,
        [key]: "",
      });
    }
    fetch("http://localhost:8080/api/" + username, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
        // }
      })
      .then((myid) => {
        localStorage.setItem("userid", myid);
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <br />
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
