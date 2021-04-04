import React, { useState } from "react";
import { AuthContext } from "../App";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { dispatch } = React.useContext(AuthContext);

const backToLogin=()=>{
    dispatch({
      type: "LOGOUT",
    }); 
}
  const onRegister = async (event) => {
    event.preventDefault();

    const user = { user: { email, password, name } };
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <div className="login-container">
      <div className="card">
        <div className="container"></div>
        <form
          onSubmit={onRegister}
          style={{
            backgroundColor: "Aquamarine",
            justifyContent: "center",
          }}
        >
          <h1>Sign Up</h1>
          <label>
            <b>Email</b>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label>
            <b>Password</b>
            <input
              type="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <label>
            <b>Name</b>
            <input
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <br />
          <br />
          <button type="submit">Sign Up</button>
        </form>
        <br />
        <hr />
        <button type="button" onClick={backToLogin}>
          Login
        </button>
        <div />
      </div>
    </div>
  );
};
export default Register;
