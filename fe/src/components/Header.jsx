import React from "react";
import { AuthContext } from "../App";

export const Header = () => {
  const { dispatch } = React.useContext(AuthContext);
const onLogout =() =>{
      dispatch({
        type: "LOGOUT",
      });
}
  const getName = () => {
    const rawName = localStorage.getItem("name");
    if (rawName) {
      const name = JSON.parse(rawName);
      return name;
    }
    return "";
  };
  return (
    <nav
      id="navigation"
      style={{
        backgroundColor: "blue",
        color: "yellow",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <h1 href="#" className="logo">
        Welcome Back {getName()}
      </h1>
      <div style={{ marginLeft: "15px" }}>
        <button onClick = {onLogout}>Logout</button>
      </div>
    </nav>
  );
};
export default Header;
