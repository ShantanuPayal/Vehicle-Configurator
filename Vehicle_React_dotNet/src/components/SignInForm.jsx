import React, { useState, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Alert } from 'react-st-modal';


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
    console.log("state==>", state);
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    ////////
    fetch('https://localhost:7232/api/User/login', {
      method: "post",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify(state),

    })
      .then((response) => {
        return response.json();

        // }
      })
      .then((loginSuccess) => {
        console.log("Login success==>:", loginSuccess);
        loginSuccess && setIsLogged(true);
        if (!loginSuccess) Alert('INVALID CREDENTIALS');
        // Handle login success or failure here
      })
      .catch((error) => {
        console.error("Login failed:", error);
        // Handle login failure
      });
    ////////

    const { username, password } = state;
    Alert(`WELCOME ${username}`);
    //setIsLogged(true);
    for (const key in state) {
      setState({
        ...state,
        [key]: "",
      });
    }
    fetch(`https://localhost:7232/api/User/${username}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
        // }
      })
      .then((data) => {
        console.log("ioooooio " + data);
        localStorage.setItem("userId", data);
        console.log("uuuuuuu " + localStorage.getItem("userId"));
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="form-container sign-in-container">
      {/* <button
        onClick={async () => {
           Alert('INVALID CREDENTIALS');
        }}
      >
        Show confirm
      </button> */}
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
