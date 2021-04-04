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
    <form
      onSubmit={onRegister}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <input
        placeholder="Enter Email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <br />
      <input
        palceholder="Enter Password"
        type="password"
        value={password}
        required
        onChange={(event) => setPassword(event.target.value)}
      />
      <br />
      <label>
        Name:
        <input
          type="text"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Sign Up</button>
      <button type="button" onClick={backToLogin}>Login</button>
    </form>
  );
};
export default Register;
