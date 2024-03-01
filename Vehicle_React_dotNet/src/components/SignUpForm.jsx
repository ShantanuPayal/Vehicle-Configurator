import React from "react";
import { Alert } from 'react-st-modal';
function SignUpForm() {
    const [state, setState] = React.useState({
        name: "",
        email: "",
        password: ""
    });
    const handleChange = evt => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };

    const handleOnSubmit = evt => {
        evt.preventDefault();
        ///////////////////
        fetch('http://localhost:8080/api/signup', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state)
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('Login failed:', error);
                // Handle login failure
            });
        ////////////////////////
        for (const key in state) {
            setState({
                ...state,
                [key]: ""
            });
        }
        Alert("SIGN UP SUCCESSFUL, Now Login");
    };

    return (
        <div className="form-container sign-up-container">
            <form onSubmit={handleOnSubmit}>
                <h1>Create Account</h1>
                <span>Use your email for registration</span>
                <input
                    type="text"
                    name="name"
                    value={state.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    name="username"
                    value={state.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <input
                    type="text"
                    name="address_line1"
                    value={state.address_line1}
                    onChange={handleChange}
                    placeholder="Address Line 1"
                    required
                />
                <input
                    type="text"
                    name="address_line2"
                    value={state.address_line2}
                    onChange={handleChange}
                    placeholder="Address Line 2"
                    required
                />
                <input
                    type="text"
                    name="city"
                    value={state.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                />
                <input
                    type="text"
                    name="company_name"
                    value={state.company_name}
                    onChange={handleChange}
                    placeholder="Company Name"
                    required
                />
                <input
                    type="text"
                    name="gst_number"
                    value={state.gst_number}
                    onChange={handleChange}
                    placeholder="GST Number"
                    required
                />
                <input
                    type="text"
                    name="pin_code"
                    value={state.pin_code}
                    onChange={handleChange}
                    placeholder="Pin Code"
                    required
                />
                <input
                    type="text"
                    name="state"
                    value={state.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                />
                <input
                    type="text"
                    name="telephone"
                    value={state.telephone}
                    onChange={handleChange}
                    placeholder="Telephone"
                    required
                />
                {/* <input
                    type="text"
                    name="username"
                    value={state.username}
                    onChange={handleChange}
                    placeholder="Username"
                /> */}
                <button className="sign-up-btn">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;