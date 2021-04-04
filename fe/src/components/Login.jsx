import React from "react";
import { AuthContext } from "../App";
export const Login = () => {
  const { dispatch } = React.useContext(AuthContext);
  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  };

  const [data, setData] = React.useState(initialState);
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const onRegister = (event) => {
    dispatch({
      type: "SIGNUP",
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });

    fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          res.email = data.email;
          res.name = data.name;
          return res.json();
        }
        throw res;
      })
      .then((resJson) => {
        dispatch({
          type: "LOGIN",
          payload: resJson,
        });
      })
      .catch((error) => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText,
        });
      });
  };
  return (
    <div className="login-container">
      <div className="card">
        <div className="container">
          <form
            onSubmit={handleFormSubmit}
            style={{ backgroundColor: "Aquamarine" }}
          >
            <h1>Login</h1>

            <label htmlFor="email">
              <b>Email</b>
              <input
                type="email"
                id="email"
                value={data.email}
                required
                onChange={handleInputChange}
                name="email"
              />
            </label>

            <label htmlFor="password">
              <b> Password</b>
              <input
                required
                type="password"
                value={data.password}
                onChange={handleInputChange}
                name="password"
                id="password"
              />
            </label>
            <br />
            <br />
            <button disabled={data.isSubmitting}>
              {data.isSubmitting ? "Loading..." : "Login"}
            </button>
          </form>
          <br />
          {data.errorMessage && (
            <span className="form-error">{data.errorMessage}</span>
          )}
          <br />
          <hr />
          <button onClick={onRegister}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};
export default Login;
